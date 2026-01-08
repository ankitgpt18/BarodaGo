from sqlalchemy import Column, Integer, String, Float, DateTime, Enum, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from datetime import datetime
import enum

from database import Base

class IncidentCategory(str, enum.Enum):
    POTHOLE = "pothole"
    GARBAGE = "garbage"
    STRAY_CATTLE = "stray_cattle"
    STREETLIGHT = "streetlight"
    SEWER = "sewer"
    WATER_SUPPLY = "water_supply"
    ROAD_DAMAGE = "road_damage"
    ILLEGAL_DUMPING = "illegal_dumping"
    OTHER = "other"

class IncidentStatus(str, enum.Enum):
    PENDING = "pending"
    ASSIGNED = "assigned"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    VERIFIED = "verified"
    REJECTED = "rejected"

class IncidentSeverity(int, enum.Enum):
    LOW = 1
    MEDIUM = 5
    HIGH = 8
    CRITICAL = 10

class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    
    # User and location
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    location = Column(Geometry('POINT', srid=4326), nullable=False)  # PostGIS geometry
    ward_id = Column(Integer, ForeignKey("wards.id"), nullable=False)
    address = Column(String(500))
    
    # Incident metadata
    category = Column(Enum(IncidentCategory), nullable=False)
    severity = Column(Integer, default=5)  # 1-10 scale
    description = Column(Text)  # Incident description
    estimated_materials = Column(Text)  # Required materials
    
    # Images
    image_url = Column(String(500), nullable=False)
    image_embedding = Column(Text)  # CLIP embedding as JSON
    after_image_url = Column(String(500))
    
    # Status tracking
    status = Column(Enum(IncidentStatus), default=IncidentStatus.PENDING)
    assigned_worker_id = Column(Integer, ForeignKey("workers.id"))
    
    # Verification
    ai_verification_score = Column(Float)  # 0-1 score from Siamese network
    citizen_rating = Column(Integer)  # 1-5 stars
    
    # Social features
    is_social_project = Column(Boolean, default=False)
    high_five_count = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    assigned_at = Column(DateTime)
    completed_at = Column(DateTime)
    verified_at = Column(DateTime)
    
    # Relationships
    user = relationship("User", back_populates="incidents")
    ward = relationship("Ward", back_populates="incidents")
    assigned_worker = relationship("Worker", back_populates="assigned_incidents")
    votes = relationship("Vote", back_populates="incident")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String(128), unique=True, nullable=False, index=True)
    phone_number = Column(String(15), unique=True)
    email = Column(String(255), unique=True)
    name = Column(String(255))
    
    # Gamification
    banyan_points = Column(Integer, default=0)
    total_reports = Column(Integer, default=0)
    total_high_fives = Column(Integer, default=0)
    
    # Location preference
    preferred_ward_id = Column(Integer, ForeignKey("wards.id"))
    
    created_at = Column(DateTime, default=datetime.utcnow)
    last_active = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    incidents = relationship("Incident", back_populates="user")
    preferred_ward = relationship("Ward")
    votes = relationship("Vote", back_populates="user")
    contributions = relationship("Contribution", back_populates="user")

class Worker(Base):
    __tablename__ = "workers"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String(128), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    phone_number = Column(String(15), unique=True)
    
    # Skills and equipment
    skills = Column(Text)  # JSON array of categories
    vehicle_type = Column(String(100))
    has_asphalt = Column(Boolean, default=False)
    has_tools = Column(Boolean, default=False)
    
    # Performance
    level = Column(Integer, default=1)
    banyan_points = Column(Integer, default=0)
    total_completed = Column(Integer, default=0)
    average_rating = Column(Float, default=0.0)
    average_verification_score = Column(Float, default=0.0)
    
    # Current location (updated via mobile app)
    current_location = Column(Geometry('POINT', srid=4326))
    last_location_update = Column(DateTime)
    
    # Availability
    is_active = Column(Boolean, default=True)
    assigned_wards = Column(Text)  # JSON array of ward IDs
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    assigned_incidents = relationship("Incident", back_populates="assigned_worker")

class Ward(Base):
    __tablename__ = "wards"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    name_gujarati = Column(String(100))
    ward_number = Column(Integer, unique=True)
    
    # GeoJSON boundary
    boundary = Column(Geometry('POLYGON', srid=4326), nullable=False)
    
    # Statistics
    total_incidents = Column(Integer, default=0)
    resolved_incidents = Column(Integer, default=0)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    incidents = relationship("Incident", back_populates="ward")

class Vote(Base):
    __tablename__ = "votes"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    incident = relationship("Incident", back_populates="votes")
    user = relationship("User", back_populates="votes")

class SocialProject(Base):
    __tablename__ = "social_projects"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id"), unique=True, nullable=False)
    
    title = Column(String(255), nullable=False)
    description = Column(Text)
    target_amount = Column(Float, nullable=False)  # in INR
    raised_amount = Column(Float, default=0.0)
    
    status = Column(String(50), default="active")  # active, funded, completed
    
    created_at = Column(DateTime, default=datetime.utcnow)
    funded_at = Column(DateTime)
    completed_at = Column(DateTime)

class Contribution(Base):
    __tablename__ = "contributions"

    id = Column(Integer, primary_key=True, index=True)
    social_project_id = Column(Integer, ForeignKey("social_projects.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    amount = Column(Float, nullable=False)
    razorpay_payment_id = Column(String(255))
    razorpay_order_id = Column(String(255))
    
    status = Column(String(50), default="pending")  # pending, success, failed, refunded
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="contributions")
