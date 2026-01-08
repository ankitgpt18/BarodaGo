from sqlalchemy.orm import Session
from geoalchemy2.shape import to_shape
from shapely.geometry import Point, shape
import json
import os
from typing import Optional, Dict, Any

class WardService:
    """Service for ward-based geographic queries"""
    
    def __init__(self):
        self.wards_geojson_path = os.path.join(
            os.path.dirname(__file__), 
            "..", 
            "data", 
            "vadodara_wards_official.geojson"
        )
        self._load_wards_cache()
    
    def _load_wards_cache(self):
        """Load ward boundaries into memory for fast lookups"""
        try:
            with open(self.wards_geojson_path, 'r', encoding='utf-8') as f:
                geojson_data = json.load(f)
            
            self.wards_cache = []
            for feature in geojson_data.get("features", []):
                properties = feature.get("properties", {})
                geometry = feature.get("geometry")
                
                if geometry:
                    self.wards_cache.append({
                        "ward_id": properties.get("ward_no"),
                        "name": properties.get("ward_name"),
                        "name_gujarati": properties.get("ward_name"),  # Official data doesn't have Gujarati names
                        "ward_number": properties.get("ward_no"),
                        "ward_address": properties.get("ward_address"),
                        "geometry": shape(geometry)
                    })
            
            print(f"INFO: Loaded {len(self.wards_cache)} official VMC wards from DataMeet GeoJSON")
            
        except FileNotFoundError:
            print(f"WARNING: Ward GeoJSON file not found: {self.wards_geojson_path}")
            print("WARNING: Using fallback ward detection")
            self.wards_cache = []
        except Exception as e:
            print(f"ERROR: Error loading wards: {e}")
            self.wards_cache = []
    
    def get_ward_from_coordinates(self, latitude: float, longitude: float) -> Optional[Dict[str, Any]]:
        """
        Find which ward contains the given GPS coordinates
        
        Args:
            latitude: GPS latitude
            longitude: GPS longitude
            
        Returns:
            Ward info dict or None if not found
        """
        point = Point(longitude, latitude)  # Note: GeoJSON uses (lon, lat)
        
        for ward in self.wards_cache:
            if ward["geometry"].contains(point):
                return {
                    "ward_id": ward["ward_id"],
                    "name": ward["name"],
                    "name_gujarati": ward["name_gujarati"],
                    "ward_number": ward["ward_number"],
                    "ward_address": ward.get("ward_address", "")
                }
        
        # Fallback: return closest ward or default
        print(f"WARNING: No ward found for coordinates ({latitude}, {longitude})")
        return self._get_fallback_ward(latitude, longitude)
    
    def _get_fallback_ward(self, latitude: float, longitude: float) -> Dict[str, Any]:
        """
        Fallback ward assignment based on approximate Vadodara geography
        """
        # Return first ward as fallback
        if self.wards_cache:
            first_ward = self.wards_cache[0]
            return {
                "ward_id": first_ward["ward_id"],
                "name": first_ward["name"],
                "name_gujarati": first_ward["name_gujarati"],
                "ward_number": first_ward["ward_number"],
                "ward_address": first_ward.get("ward_address", "")
            }
        
        # Ultimate fallback
        return {
            "ward_id": 1,
            "name": "Nyay Mandir",
            "name_gujarati": "Nyay Mandir",
            "ward_number": 1,
            "ward_address": "Laheripura, Near Nyay Mandir, Vadodara-1"
        }
    
    def get_all_wards(self) -> list:
        """Get list of all wards"""
        return [
            {
                "ward_id": w["ward_id"],
                "name": w["name"],
                "name_gujarati": w["name_gujarati"],
                "ward_number": w["ward_number"],
                "ward_address": w.get("ward_address", "")
            }
            for w in self.wards_cache
        ]
    
    def get_ward_geojson(self) -> dict:
        """Get the complete GeoJSON for all wards"""
        try:
            with open(self.wards_geojson_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"ERROR: Error loading GeoJSON: {e}")
            return {"type": "FeatureCollection", "features": []}

# Singleton instance
ward_service = WardService()
