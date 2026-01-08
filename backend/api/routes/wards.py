from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from services.ward_service import ward_service

router = APIRouter()

@router.get("/list")
async def get_wards_list():
    """Get list of all Vadodara wards"""
    wards = ward_service.get_all_wards()
    return {
        "total": len(wards),
        "wards": wards
    }

@router.get("/geojson")
async def get_wards_geojson():
    """Get complete GeoJSON with ward boundaries"""
    return ward_service.get_ward_geojson()

@router.get("/lookup")
async def lookup_ward(latitude: float, longitude: float):
    """
    Find ward for given GPS coordinates
    
    Example: /api/wards/lookup?latitude=22.3072&longitude=73.1812
    """
    ward = ward_service.get_ward_from_coordinates(latitude, longitude)
    
    if ward:
        return {
            "status": "success",
            "ward": ward
        }
    else:
        return {
            "status": "not_found",
            "message": "No ward found for these coordinates"
        }
