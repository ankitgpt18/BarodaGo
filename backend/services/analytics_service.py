from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from datetime import datetime, timedelta
from typing import Dict, List
from models import Incident, Worker, User, Ward, IncidentStatus
from services.cache_service import cache_service

class AnalyticsService:
    
    @staticmethod
    def get_dashboard_stats(db: Session) -> Dict:
        """Get overall dashboard statistics with caching"""
        cache_key = "dashboard:stats"
        cached = cache_service.get(cache_key)
        if cached:
            return cached

        stats = {
            "total_incidents": db.query(Incident).count(),
            "pending_incidents": db.query(Incident).filter(
                Incident.status == IncidentStatus.PENDING
            ).count(),
            "completed_today": db.query(Incident).filter(
                and_(
                    Incident.status == IncidentStatus.COMPLETED,
                    Incident.completed_at >= datetime.utcnow().date()
                )
            ).count(),
            "active_workers": db.query(Worker).filter(Worker.is_active == True).count(),
            "total_citizens": db.query(User).count(),
        }

        cache_service.set(cache_key, stats, ttl=60)  # Cache for 1 minute
        return stats

    @staticmethod
    def get_incident_trends(db: Session, days: int = 30) -> List[Dict]:
        """Get incident trends over time"""
        cache_key = f"analytics:trends:{days}"
        cached = cache_service.get(cache_key)
        if cached:
            return cached

        start_date = datetime.utcnow() - timedelta(days=days)
        
        results = db.query(
            func.date(Incident.created_at).label('date'),
            func.count(Incident.id).label('count')
        ).filter(
            Incident.created_at >= start_date
        ).group_by(
            func.date(Incident.created_at)
        ).all()

        trends = [{"date": str(r.date), "count": r.count} for r in results]
        cache_service.set(cache_key, trends, ttl=300)
        return trends

    @staticmethod
    def get_category_distribution(db: Session) -> List[Dict]:
        """Get incident distribution by category"""
        cache_key = "analytics:categories"
        cached = cache_service.get(cache_key)
        if cached:
            return cached

        results = db.query(
            Incident.category,
            func.count(Incident.id).label('count')
        ).group_by(Incident.category).all()

        distribution = [
            {"category": r.category, "count": r.count} 
            for r in results
        ]
        
        cache_service.set(cache_key, distribution, ttl=300)
        return distribution

    @staticmethod
    def get_ward_performance(db: Session) -> List[Dict]:
        """Get performance metrics by ward"""
        cache_key = "analytics:ward_performance"
        cached = cache_service.get(cache_key)
        if cached:
            return cached

        results = db.query(
            Ward.name,
            func.count(Incident.id).label('total'),
            func.sum(
                func.case((Incident.status == IncidentStatus.COMPLETED, 1), else_=0)
            ).label('completed')
        ).join(Incident).group_by(Ward.name).all()

        performance = [
            {
                "ward": r.name,
                "total": r.total,
                "completed": r.completed or 0,
                "completion_rate": round((r.completed or 0) / r.total * 100, 2) if r.total > 0 else 0
            }
            for r in results
        ]

        cache_service.set(cache_key, performance, ttl=300)
        return performance

    @staticmethod
    def get_worker_efficiency(db: Session, limit: int = 10) -> List[Dict]:
        """Get top performing workers"""
        cache_key = f"analytics:worker_efficiency:{limit}"
        cached = cache_service.get(cache_key)
        if cached:
            return cached

        workers = db.query(Worker).order_by(
            Worker.banyan_points.desc()
        ).limit(limit).all()

        efficiency = [
            {
                "id": w.id,
                "name": w.name,
                "banyan_points": w.banyan_points,
                "total_completed": w.total_completed,
                "average_rating": round(w.average_rating, 2),
                "average_verification_score": round(w.average_verification_score, 2)
            }
            for w in workers
        ]

        cache_service.set(cache_key, efficiency, ttl=60)
        return efficiency

    @staticmethod
    def get_resolution_time_stats(db: Session) -> Dict:
        """Calculate average resolution times"""
        cache_key = "analytics:resolution_time"
        cached = cache_service.get(cache_key)
        if cached:
            return cached

        completed = db.query(Incident).filter(
            and_(
                Incident.status == IncidentStatus.COMPLETED,
                Incident.completed_at.isnot(None)
            )
        ).all()

        if not completed:
            return {"average_hours": 0, "median_hours": 0}

        resolution_times = [
            (inc.completed_at - inc.created_at).total_seconds() / 3600
            for inc in completed
        ]

        stats = {
            "average_hours": round(sum(resolution_times) / len(resolution_times), 2),
            "median_hours": round(sorted(resolution_times)[len(resolution_times) // 2], 2),
            "min_hours": round(min(resolution_times), 2),
            "max_hours": round(max(resolution_times), 2)
        }

        cache_service.set(cache_key, stats, ttl=300)
        return stats

analytics_service = AnalyticsService()
