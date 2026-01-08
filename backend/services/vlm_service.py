import google.generativeai as genai
import os
from PIL import Image
import json
from typing import Dict, Any

class VLMService:
    """Vision Language Model service using Google Gemini"""
    
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            print("WARNING: GOOGLE_API_KEY not found - AI features will be disabled")
            self.model = None
        else:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel(os.getenv("GEMINI_MODEL", "gemini-1.5-flash"))
    
    async def analyze_incident(self, image_path: str, gps_coords: tuple = None) -> Dict[str, Any]:
        """
        Analyze an incident image and return structured data
        
        Args:
            image_path: Path to the incident image
            gps_coords: Optional (latitude, longitude) tuple
            
        Returns:
            Dict with category, severity, description, estimated_materials
        """
        try:
            # Load image
            image = Image.open(image_path)
            
            # Craft prompt for structured output
            prompt = """Analyze this civic infrastructure image and provide a JSON response with the following fields:

1. category: Choose ONE from [pothole, garbage, stray_cattle, streetlight, sewer, water_supply, road_damage, illegal_dumping, other]
2. severity: Rate from 1-10 (1=minor, 10=critical emergency)
3. description: Brief description in 1-2 sentences (in English)
4. estimated_materials: List of materials/equipment needed (e.g., "Asphalt, Road Roller" or "Garbage Truck, 2 Workers")

Respond ONLY with valid JSON, no additional text.

Example:
{
  "category": "pothole",
  "severity": 7,
  "description": "Large pothole on main road causing traffic disruption",
  "estimated_materials": "Asphalt, Road Roller, Safety Cones"
}"""

            # Generate response
            response = self.model.generate_content([prompt, image])
            
            # Parse JSON from response
            response_text = response.text.strip()
            
            # Remove markdown code blocks if present
            if response_text.startswith("```json"):
                response_text = response_text.replace("```json", "").replace("```", "").strip()
            elif response_text.startswith("```"):
                response_text = response_text.replace("```", "").strip()
            
            result = json.loads(response_text)
            
            # Validate required fields
            required_fields = ["category", "severity", "description", "estimated_materials"]
            for field in required_fields:
                if field not in result:
                    raise ValueError(f"Missing required field: {field}")
            
            # Ensure severity is in range
            result["severity"] = max(1, min(10, int(result["severity"])))
            
            return result
            
        except json.JSONDecodeError as e:
            print(f"ERROR: JSON parsing error: {e}")
            print(f"Raw response: {response_text}")
            # Fallback response
            return {
                "category": "other",
                "severity": 5,
                "description": "Unable to analyze image automatically. Manual review required.",
                "estimated_materials": "To be determined"
            }
        except Exception as e:
            print(f"ERROR: VLM analysis error: {e}")
            raise

# Singleton instance
vlm_service = VLMService()
