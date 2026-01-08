from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from services.analytics_service import analytics_service

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_analytics(db: Session = Depends(get_db)):
    """Get comprehensive dashboard analytics"""
    return {
        "stats": analytics_service.get_dashboard_stats(db),
        "trends": analytics_service.get_incident_trends(db, days=30),
        "categories": analytics_service.get_category_distribution(db),
        "ward_performance": analytics_service.get_ward_performance(db),
        "top_workers": analytics_service.get_worker_efficiency(db, limit=10),
        "resolution_time": analytics_service.get_resolution_time_stats(db)
    }

@router.get("/trends")
async def get_trends(days: int = 30, db: Session = Depends(get_db)):
    """Get incident trends for specified days"""
    return analytics_service.get_incident_trends(db, days)

@router.get("/categories")
async def get_category_stats(db: Session = Depends(get_db)):
    """Get incident distribution by category"""
    return analytics_service.get_category_distribution(db)

@router.get("/wards")
async def get_ward_stats(db: Session = Depends(get_db)):
    """Get ward-wise performance metrics"""
    return analytics_service.get_ward_performance(db)

@router.get("/workers/top")
async def get_top_workers(limit: int = 10, db: Session = Depends(get_db)):
    """Get top performing workers"""
    return analytics_service.get_worker_efficiency(db, limit)

@router.get("/resolution-time")
async def get_resolution_stats(db: Session = Depends(get_db)):
    """Get resolution time statistics"""
    return analytics_service.get_resolution_time_stats(db)
