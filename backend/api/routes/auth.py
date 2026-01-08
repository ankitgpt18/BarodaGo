from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from database import get_db
from models import User, Worker

router = APIRouter()

class UserCreate(BaseModel):
    firebase_uid: str
    phone_number: Optional[str] = None
    email: Optional[str] = None
    name: Optional[str] = None

class WorkerCreate(BaseModel):
    firebase_uid: str
    name: str
    phone_number: str
    skills: Optional[str] = None
    vehicle_type: Optional[str] = None

@router.post("/register/citizen")
async def register_citizen(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    """Register a new citizen user"""
    # Check if user already exists
    existing_user = db.query(User).filter_by(firebase_uid=user_data.firebase_uid).first()
    
    if existing_user:
        return {
            "status": "existing_user",
            "user_id": existing_user.id,
            "message": "User already registered"
        }
    
    # Create new user
    user = User(
        firebase_uid=user_data.firebase_uid,
        phone_number=user_data.phone_number,
        email=user_data.email,
        name=user_data.name
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return {
        "status": "success",
        "user_id": user.id,
        "message": "User registered successfully"
    }

@router.post("/register/worker")
async def register_worker(
    worker_data: WorkerCreate,
    db: Session = Depends(get_db)
):
    """Register a new worker"""
    # Check if worker already exists
    existing_worker = db.query(Worker).filter_by(firebase_uid=worker_data.firebase_uid).first()
    
    if existing_worker:
        return {
            "status": "existing_worker",
            "worker_id": existing_worker.id,
            "message": "Worker already registered"
        }
    
    # Create new worker
    worker = Worker(
        firebase_uid=worker_data.firebase_uid,
        name=worker_data.name,
        phone_number=worker_data.phone_number,
        skills=worker_data.skills,
        vehicle_type=worker_data.vehicle_type
    )
    
    db.add(worker)
    db.commit()
    db.refresh(worker)
    
    return {
        "status": "success",
        "worker_id": worker.id,
        "message": "Worker registered successfully"
    }

@router.get("/user/{firebase_uid}")
async def get_user_by_firebase_uid(
    firebase_uid: str,
    db: Session = Depends(get_db)
):
    """Get user details by Firebase UID"""
    user = db.query(User).filter_by(firebase_uid=firebase_uid).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": user.id,
        "firebase_uid": user.firebase_uid,
        "name": user.name,
        "email": user.email,
        "phone_number": user.phone_number,
        "banyan_points": user.banyan_points,
        "total_reports": user.total_reports,
        "total_high_fives": user.total_high_fives
    }
