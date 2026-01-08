from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import os

from database import get_db
from models import Incident, SocialProject, Vote, User, Contribution

router = APIRouter()

@router.post("/vote/{incident_id}")
async def vote_for_social_project(
    incident_id: int,
    user_id: int,
    db: Session = Depends(get_db)
):
    """
    Vote for an incident to become a social project (Sanskari Sanchay)
    """
    incident = db.query(Incident).filter_by(id=incident_id).first()
    
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    # Check if user already voted
    existing_vote = db.query(Vote).filter_by(
        incident_id=incident_id,
        user_id=user_id
    ).first()
    
    if existing_vote:
        raise HTTPException(status_code=400, detail="You have already voted for this project")
    
    # Create vote
    vote = Vote(incident_id=incident_id, user_id=user_id)
    db.add(vote)
    
    # Get vote count
    vote_count = db.query(Vote).filter_by(incident_id=incident_id).count() + 1
    
    # Check if threshold reached
    threshold = int(os.getenv("SANSKARI_SANCHAY_VOTE_THRESHOLD", "100"))
    
    if vote_count >= threshold:
        # Create social project
        existing_project = db.query(SocialProject).filter_by(incident_id=incident_id).first()
        
        if not existing_project:
            # Calculate target amount based on severity
            base_amount = 5000  # Base INR
            target_amount = base_amount * (incident.severity / 5)
            
            project = SocialProject(
                incident_id=incident_id,
                title=f"Beautify {incident.ward.name} - {incident.description[:50]}",
                description=f"Community project to transform this eyesore into a beautiful space. {incident.description}",
                target_amount=target_amount
            )
            
            db.add(project)
            incident.is_social_project = True
            
            db.commit()
            db.refresh(project)
            
            return {
                "status": "project_created",
                "vote_count": vote_count,
                "project_id": project.id,
                "target_amount": target_amount,
                "message": "Campaign launched successfully. Contributions are now open."
            }
    
    db.commit()
    
    return {
        "status": "vote_recorded",
        "vote_count": vote_count,
        "votes_needed": max(0, threshold - vote_count)
    }

@router.get("/projects")
async def get_active_projects(
    status: str = "active",
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Get list of active social projects"""
    projects = db.query(SocialProject).filter_by(status=status).limit(limit).all()
    
    return {
        "projects": [
            {
                "id": proj.id,
                "title": proj.title,
                "description": proj.description,
                "target_amount": proj.target_amount,
                "raised_amount": proj.raised_amount,
                "progress_percentage": (proj.raised_amount / proj.target_amount * 100) if proj.target_amount > 0 else 0,
                "incident": {
                    "id": proj.incident_id,
                    "image_url": db.query(Incident).filter_by(id=proj.incident_id).first().image_url,
                    "ward_name": db.query(Incident).filter_by(id=proj.incident_id).first().ward.name
                },
                "created_at": proj.created_at.isoformat()
            }
            for proj in projects
        ]
    }

@router.post("/contribute/{project_id}")
async def contribute_to_project(
    project_id: int,
    user_id: int,
    amount: float,
    razorpay_payment_id: str,
    razorpay_order_id: str,
    db: Session = Depends(get_db)
):
    """
    Record a contribution to a social project
    
    Note: Razorpay integration should be done on frontend
    This endpoint records the successful payment
    """
    project = db.query(SocialProject).filter_by(id=project_id).first()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Validate amount
    min_amount = float(os.getenv("MIN_CONTRIBUTION_INR", "10"))
    max_amount = float(os.getenv("MAX_CONTRIBUTION_INR", "10000"))
    
    if amount < min_amount or amount > max_amount:
        raise HTTPException(
            status_code=400,
            detail=f"Amount must be between ₹{min_amount} and ₹{max_amount}"
        )
    
    # Create contribution
    contribution = Contribution(
        social_project_id=project_id,
        user_id=user_id,
        amount=amount,
        razorpay_payment_id=razorpay_payment_id,
        razorpay_order_id=razorpay_order_id,
        status="success"
    )
    
    db.add(contribution)
    
    # Update project raised amount
    project.raised_amount += amount
    
    # Check if fully funded
    if project.raised_amount >= project.target_amount:
        project.status = "funded"
        from datetime import datetime
        project.funded_at = datetime.utcnow()
    
    db.commit()
    
    return {
        "status": "success",
        "contribution_id": contribution.id,
        "project_raised": project.raised_amount,
        "project_target": project.target_amount,
        "is_fully_funded": project.status == "funded",
        "message": "Contribution recorded successfully"
    }
