from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
from datetime import datetime

from database import get_db
from models import Worker, Incident, IncidentStatus

router = APIRouter()

@router.get("/missions")
async def get_worker_missions(
    worker_id: int,
    status: str = "assigned",
    db: Session = Depends(get_db)
):
    """
    Get list of missions (tasks) for a worker
    """
    worker = db.query(Worker).filter_by(id=worker_id).first()
    
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    
    query = db.query(Incident).filter(Incident.assigned_worker_id == worker_id)
    
    if status:
        query = query.filter(Incident.status == status)
    
    missions = query.order_by(Incident.severity.desc()).all()
    
    return {
        "missions": [
            {
                "id": mission.id,
                "category": mission.category,
                "severity": mission.severity,
                "description": mission.description,
                "estimated_materials": mission.estimated_materials,
                "image_url": mission.image_url,
                "location": {
                    "latitude": mission.location.y if hasattr(mission.location, 'y') else None,
                    "longitude": mission.location.x if hasattr(mission.location, 'x') else None
                },
                "ward_name": mission.ward.name,
                "status": mission.status,
                "assigned_at": mission.assigned_at.isoformat() if mission.assigned_at else None
            }
            for mission in missions
        ],
        "total": len(missions)
    }

@router.post("/missions/{mission_id}/complete")
async def complete_mission(
    mission_id: int,
    worker_id: int,
    after_image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Mark a mission as complete with before/after verification
    """
    import uuid
    from services.vector_service import vector_service
    
    mission = db.query(Incident).filter_by(id=mission_id).first()
    
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    
    if mission.assigned_worker_id != worker_id:
        raise HTTPException(status_code=403, detail="This mission is not assigned to you")
    
    # Save after image
    file_extension = after_image.filename.split(".")[-1]
    unique_filename = f"after_{uuid.uuid4()}.{file_extension}"
    upload_path = os.path.join("uploads", unique_filename)
    
    with open(upload_path, "wb") as f:
        content = await after_image.read()
        f.write(content)
    
    # AI Verification: Compare before and after images
    before_embedding = vector_service.generate_embedding(mission.image_url.replace("/uploads/", "uploads/"))
    after_embedding = vector_service.generate_embedding(upload_path)
    
    # Calculate similarity (higher = more similar = less change)
    # For verification, we want LOW similarity (significant change)
    import numpy as np
    similarity = np.dot(before_embedding, after_embedding) / (
        np.linalg.norm(before_embedding) * np.linalg.norm(after_embedding)
    )
    
    # Verification score: 1 - similarity (higher = better work done)
    verification_score = 1 - similarity
    
    # Update mission
    mission.after_image_url = f"/uploads/{unique_filename}"
    mission.ai_verification_score = verification_score
    mission.status = IncidentStatus.COMPLETED
    mission.completed_at = datetime.utcnow()
    
    # Award Banyan Points to worker
    worker = db.query(Worker).filter_by(id=worker_id).first()
    if worker:
        base_points = int(os.getenv("BANYAN_POINTS_PER_VERIFICATION", "50"))
        # Bonus points for high verification score
        bonus_multiplier = verification_score
        points_earned = int(base_points * bonus_multiplier)
        
        worker.banyan_points += points_earned
        worker.total_completed += 1
        
        # Update average verification score
        worker.average_verification_score = (
            (worker.average_verification_score * (worker.total_completed - 1) + verification_score)
            / worker.total_completed
        )
        
        # Level up logic
        if worker.banyan_points >= worker.level * 1000:
            worker.level += 1
    
    db.commit()
    
    return {
        "status": "completed",
        "verification_score": verification_score,
        "banyan_points_earned": points_earned,
        "worker_level": worker.level,
        "message": "Mission completed successfully" if verification_score > 0.5 else "Mission completed. Please review verification score."
    }

@router.get("/leaderboard")
async def get_worker_leaderboard(
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Get top workers by Banyan Points"""
    workers = db.query(Worker).order_by(Worker.banyan_points.desc()).limit(limit).all()
    
    return {
        "leaderboard": [
            {
                "rank": idx + 1,
                "id": worker.id,
                "name": worker.name,
                "banyan_points": worker.banyan_points,
                "level": worker.level,
                "total_completed": worker.total_completed,
                "average_verification_score": round(worker.average_verification_score, 2),
                "average_rating": round(worker.average_rating, 2)
            }
            for idx, worker in enumerate(workers)
        ]
    }

@router.get("/{worker_id}/profile")
async def get_worker_profile(
    worker_id: int,
    db: Session = Depends(get_db)
):
    """Get worker profile with stats"""
    worker = db.query(Worker).filter_by(id=worker_id).first()
    
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    
    return {
        "id": worker.id,
        "name": worker.name,
        "phone_number": worker.phone_number,
        "level": worker.level,
        "banyan_points": worker.banyan_points,
        "total_completed": worker.total_completed,
        "average_verification_score": round(worker.average_verification_score, 2),
        "average_rating": round(worker.average_rating, 2),
        "skills": worker.skills,
        "vehicle_type": worker.vehicle_type,
        "is_active": worker.is_active
    }
