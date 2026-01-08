from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import uuid
from datetime import datetime

from database import get_db
from models import Incident, User, IncidentStatus
from services.vlm_service import vlm_service
from services.vector_service import vector_service
from services.ward_service import ward_service

router = APIRouter()

@router.post("/report")
async def create_incident_report(
    image: UploadFile = File(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    user_id: int = Form(...),
    db: Session = Depends(get_db)
):
    """
    Create a new incident report with AI triage
    
    This is the "Magic Camera" endpoint - receives image + GPS, returns AI analysis
    """
    try:
        # Validate image
        if not image.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Save image
        file_extension = image.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        upload_path = os.path.join("uploads", unique_filename)
        
        os.makedirs("uploads", exist_ok=True)
        
        with open(upload_path, "wb") as f:
            content = await image.read()
            f.write(content)
        
        # Generate CLIP embedding
        embedding = vector_service.generate_embedding(upload_path)
        
        # Check for duplicates
        duplicates = vector_service.find_duplicates(embedding, latitude, longitude)
        
        if duplicates:
            # Attach to existing incident
            existing_incident_id = duplicates[0]["incident_id"]
            print(f"Duplicate detected. Attaching to incident #{existing_incident_id}")
            
            return {
                "status": "duplicate",
                "incident_id": existing_incident_id,
                "similarity": duplicates[0]["similarity"],
                "message": "This issue has already been reported nearby"
            }
        
        # Run AI triage (async in production, sync for demo)
        ai_analysis = await vlm_service.analyze_incident(upload_path, (latitude, longitude))
        
        # Get ward from GPS
        ward_info = ward_service.get_ward_from_coordinates(latitude, longitude)
        
        # Get or create ward in database
        from models import Ward
        ward = db.query(Ward).filter_by(ward_number=ward_info["ward_number"]).first()
        
        if not ward:
            # Create ward if doesn't exist
            ward = Ward(
                name=ward_info["name"],
                name_gujarati=ward_info.get("name_gujarati", ward_info["name"]),
                ward_number=ward_info["ward_number"],
                boundary=f"POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))"  # Placeholder
            )
            db.add(ward)
            db.commit()
            db.refresh(ward)
        
        # Create incident
        incident = Incident(
            user_id=user_id,
            location=f"POINT({longitude} {latitude})",
            ward_id=ward.id,
            category=ai_analysis["category"],
            severity=ai_analysis["severity"],
            description=ai_analysis["description"],
            estimated_materials=ai_analysis["estimated_materials"],
            image_url=f"/uploads/{unique_filename}",
            image_embedding=str(embedding),
            status=IncidentStatus.PENDING
        )
        
        db.add(incident)
        db.commit()
        db.refresh(incident)
        
        # Add to vector database
        vector_service.add_incident(
            incident.id,
            embedding,
            latitude,
            longitude,
            {
                "category": ai_analysis["category"],
                "ward": ward_info["name"]
            }
        )
        
        # Award Banyan Points
        user = db.query(User).filter_by(id=user_id).first()
        if user:
            points_earned = int(os.getenv("BANYAN_POINTS_PER_REPORT", "10"))
            user.banyan_points += points_earned
            user.total_reports += 1
            db.commit()
        
        return {
            "status": "success",
            "incident_id": incident.id,
            "ai_analysis": ai_analysis,
            "ward": ward_info,
            "banyan_points_earned": points_earned,
            "message": "Report submitted successfully"
        }
        
    except Exception as e:
        print(f"ERROR: Error creating incident: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/feed")
async def get_community_feed(
    ward_id: Optional[int] = None,
    status: Optional[str] = "verified",
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """
    Get community feed of resolved incidents
    
    Used for the "Community Feed" in Citizen App
    """
    query = db.query(Incident)
    
    if ward_id:
        query = query.filter(Incident.ward_id == ward_id)
    
    if status:
        query = query.filter(Incident.status == status)
    
    incidents = query.order_by(Incident.verified_at.desc()).offset(offset).limit(limit).all()
    
    return {
        "incidents": [
            {
                "id": inc.id,
                "category": inc.category,
                "description": inc.description,
                "image_url": inc.image_url,
                "after_image_url": inc.after_image_url,
                "ward_name": inc.ward.name,
                "high_five_count": inc.high_five_count,
                "created_at": inc.created_at.isoformat(),
                "verified_at": inc.verified_at.isoformat() if inc.verified_at else None
            }
            for inc in incidents
        ],
        "total": query.count()
    }

@router.post("/{incident_id}/high-five")
async def high_five_incident(
    incident_id: int,
    user_id: int,
    db: Session = Depends(get_db)
):
    """
    Give a 'High-Five' (like) to a resolved incident
    """
    incident = db.query(Incident).filter_by(id=incident_id).first()
    
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    # Increment high-five count
    incident.high_five_count += 1
    
    # Award points to user who gave high-five
    user = db.query(User).filter_by(id=user_id).first()
    if user:
        points = int(os.getenv("BANYAN_POINTS_PER_HIGHFIVE", "1"))
        user.banyan_points += points
        user.total_high_fives += 1
    
    db.commit()
    
    return {
        "status": "success",
        "high_five_count": incident.high_five_count,
        "banyan_points_earned": points
    }

@router.get("/{incident_id}")
async def get_incident_details(
    incident_id: int,
    db: Session = Depends(get_db)
):
    """Get detailed information about a specific incident"""
    incident = db.query(Incident).filter_by(id=incident_id).first()
    
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    return {
        "id": incident.id,
        "category": incident.category,
        "severity": incident.severity,
        "description": incident.description,
        "estimated_materials": incident.estimated_materials,
        "image_url": incident.image_url,
        "after_image_url": incident.after_image_url,
        "status": incident.status,
        "ward": {
            "id": incident.ward.id,
            "name": incident.ward.name,
            "name_gujarati": incident.ward.name_gujarati
        },
        "assigned_worker": {
            "id": incident.assigned_worker.id,
            "name": incident.assigned_worker.name
        } if incident.assigned_worker else None,
        "ai_verification_score": incident.ai_verification_score,
        "citizen_rating": incident.citizen_rating,
        "high_five_count": incident.high_five_count,
        "created_at": incident.created_at.isoformat(),
        "completed_at": incident.completed_at.isoformat() if incident.completed_at else None
    }
