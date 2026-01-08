import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
from PIL import Image
import numpy as np
import os
from typing import List, Dict, Any, Optional

class VectorService:
    """CLIP embeddings and ChromaDB for duplicate detection"""
    
    def __init__(self):
        # Initialize ChromaDB client
        chroma_host = os.getenv("CHROMADB_HOST", "localhost")
        chroma_port = int(os.getenv("CHROMADB_PORT", "8001"))
        
        self.client = chromadb.HttpClient(
            host=chroma_host,
            port=chroma_port,
            settings=Settings(anonymized_telemetry=False)
        )
        
        # Get or create collection
        self.collection = self.client.get_or_create_collection(
            name="incident_images",
            metadata={"description": "CLIP embeddings of incident images"}
        )
        
        # Load CLIP model
        model_name = os.getenv("CLIP_MODEL", "clip-ViT-B-32")
        self.model = SentenceTransformer(model_name)
        
        self.similarity_threshold = float(os.getenv("SIMILARITY_THRESHOLD", "0.85"))
    
    def generate_embedding(self, image_path: str) -> List[float]:
        """Generate CLIP embedding for an image"""
        try:
            image = Image.open(image_path).convert("RGB")
            embedding = self.model.encode(image, convert_to_numpy=True)
            return embedding.tolist()
        except Exception as e:
            print(f"ERROR: Embedding generation error: {e}")
            raise
    
    def find_duplicates(
        self, 
        embedding: List[float], 
        latitude: float, 
        longitude: float,
        radius_meters: float = None
    ) -> List[Dict[str, Any]]:
        """
        Find similar incidents within a geographic radius
        
        Args:
            embedding: CLIP embedding of the new image
            latitude: GPS latitude
            longitude: GPS longitude
            radius_meters: Search radius (default from env)
            
        Returns:
            List of similar incidents with similarity scores
        """
        if radius_meters is None:
            radius_meters = float(os.getenv("DUPLICATE_DETECTION_RADIUS_METERS", "50"))
        
        try:
            # Query ChromaDB for similar embeddings
            results = self.collection.query(
                query_embeddings=[embedding],
                n_results=10,  # Get top 10 similar images
                include=["metadatas", "distances"]
            )
            
            if not results["ids"][0]:
                return []
            
            duplicates = []
            
            for i, incident_id in enumerate(results["ids"][0]):
                metadata = results["metadatas"][0][i]
                distance = results["distances"][0][i]
                
                # Convert distance to similarity (0-1 scale)
                similarity = 1 - (distance / 2)  # Cosine distance to similarity
                
                if similarity < self.similarity_threshold:
                    continue
                
                # Check geographic proximity
                incident_lat = metadata.get("latitude")
                incident_lon = metadata.get("longitude")
                
                if incident_lat and incident_lon:
                    geo_distance = self._haversine_distance(
                        latitude, longitude,
                        float(incident_lat), float(incident_lon)
                    )
                    
                    if geo_distance <= radius_meters:
                        duplicates.append({
                            "incident_id": int(incident_id),
                            "similarity": similarity,
                            "distance_meters": geo_distance,
                            "metadata": metadata
                        })
            
            return sorted(duplicates, key=lambda x: x["similarity"], reverse=True)
            
        except Exception as e:
            print(f"ERROR: Duplicate search error: {e}")
            return []
    
    def add_incident(
        self, 
        incident_id: int, 
        embedding: List[float],
        latitude: float,
        longitude: float,
        metadata: Dict[str, Any] = None
    ):
        """Add incident embedding to ChromaDB"""
        try:
            meta = metadata or {}
            meta.update({
                "latitude": str(latitude),
                "longitude": str(longitude)
            })
            
            self.collection.add(
                ids=[str(incident_id)],
                embeddings=[embedding],
                metadatas=[meta]
            )
            
        except Exception as e:
            print(f"ERROR: Error adding incident to vector DB: {e}")
            raise
    
    def _haversine_distance(self, lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """Calculate distance between two GPS coordinates in meters"""
        from math import radians, sin, cos, sqrt, atan2
        
        R = 6371000  # Earth radius in meters
        
        lat1_rad = radians(lat1)
        lat2_rad = radians(lat2)
        delta_lat = radians(lat2 - lat1)
        delta_lon = radians(lon2 - lon1)
        
        a = sin(delta_lat / 2) ** 2 + cos(lat1_rad) * cos(lat2_rad) * sin(delta_lon / 2) ** 2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        
        return R * c

# Singleton instance
vector_service = VectorService()
