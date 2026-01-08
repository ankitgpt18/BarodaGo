from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

from api.routes import incidents, social, workers, auth, wards
from database import engine, Base

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Create tables
    Base.metadata.create_all(bind=engine)
    print("Database tables created")
    yield
    print("Shutting down BarodaGo API")

app = FastAPI(
    title="BarodaGo API",
    description="AI-Powered Municipal Infrastructure Platform for Vadodara",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for uploads
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(incidents.router, prefix="/api/incidents", tags=["Incidents"])
app.include_router(social.router, prefix="/api/social", tags=["Sanskari Sanchay"])
app.include_router(workers.router, prefix="/api/workers", tags=["Workers"])
app.include_router(wards.router, prefix="/api/wards", tags=["Wards"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to BarodaGo API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "operational"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "BarodaGo API"}
