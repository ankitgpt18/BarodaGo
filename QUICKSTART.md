# 🚀 BarodaGo - Quick Start Guide

This guide will help you get BarodaGo up and running on your local machine.

## Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Docker** and Docker Compose
- **Flutter** SDK 3.16+ (for mobile apps)
- **Git**

## Step 1: Clone and Setup

```bash
# Clone the repository
cd BarodaGo

# Copy environment variables
cp .env.example .env
```

## Step 2: Configure API Keys

Edit `.env` and add your API keys:

```env
# Required API Keys
GOOGLE_API_KEY=your_google_gemini_api_key
MAPBOX_ACCESS_TOKEN=your_mapbox_token
RAZORPAY_KEY_ID=your_razorpay_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### Getting API Keys:

1. **Google Gemini API**: https://makersuite.google.com/app/apikey
2. **Mapbox**: https://account.mapbox.com/access-tokens/
3. **Razorpay**: https://dashboard.razorpay.com/app/keys
4. **Google Maps**: https://console.cloud.google.com/apis/credentials

## Step 3: Start Infrastructure Services

```bash
# Start PostgreSQL, Redis, RabbitMQ, ChromaDB
docker-compose up -d

# Verify services are running
docker-compose ps
```

## Step 4: Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create database tables
python -c "from database import Base, engine; Base.metadata.create_all(bind=engine)"

# Start FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: http://localhost:8000
API Documentation: http://localhost:8000/docs

## Step 5: Setup Admin Panel

```bash
# Open new terminal
cd apps/admin

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your Mapbox token to .env
# VITE_MAPBOX_TOKEN=your_token_here

# Start development server
npm run dev
```

Admin Panel will be available at: http://localhost:3000

## Step 6: Test the System

### Test 1: Health Check
```bash
curl http://localhost:8000/health
```

Expected response: `{"status":"healthy","service":"BarodaGo API"}`

### Test 2: View Admin Dashboard
1. Open http://localhost:3000 in your browser
2. You should see the 3D Digital Twin map of Vadodara
3. Stats cards showing incident metrics

### Test 3: Submit Test Incident (using API docs)
1. Go to http://localhost:8000/docs
2. Find `POST /api/incidents/report`
3. Click "Try it out"
4. Upload a test image and provide GPS coordinates
5. Check the response for AI analysis

## Step 7: Setup Mobile Apps (Optional)

### Citizen App
```bash
cd apps/citizen
flutter pub get
flutter run
```

### Worker App
```bash
cd apps/worker
flutter pub get
flutter run
```

## Common Issues

### Issue: Docker containers won't start
**Solution**: Make sure Docker Desktop is running and ports 5432, 6379, 5672, 8001 are not in use.

### Issue: Backend fails with "GOOGLE_API_KEY not found"
**Solution**: Make sure you've added your Google Gemini API key to `.env` file.

### Issue: Admin Panel shows blank map
**Solution**: Add your Mapbox access token to `apps/admin/.env`

### Issue: ChromaDB connection error
**Solution**: Wait 10-15 seconds after `docker-compose up` for ChromaDB to initialize.

## Next Steps

1. **Populate Ward Data**: The system includes sample GeoJSON for 19 Vadodara wards
2. **Create Test Users**: Use `/api/auth/register/citizen` endpoint
3. **Add Workers**: Use `/api/auth/register/worker` endpoint
4. **Test AI Features**: Upload images to test Gemini Vision triage
5. **Explore Admin Panel**: View 3D map, assign tasks, monitor incidents

## Development Workflow

```bash
# Terminal 1: Infrastructure
docker-compose up

# Terminal 2: Backend
cd backend && uvicorn main:app --reload

# Terminal 3: Admin Panel
cd apps/admin && npm run dev

# Terminal 4: Citizen App (optional)
cd apps/citizen && flutter run
```

## Production Deployment

For production deployment to GCP/AWS:

```bash
# Build backend Docker image
docker build -t barodago-backend ./backend

# Build admin panel
cd apps/admin && npm run build

# Deploy to Kubernetes
kubectl apply -f k8s/
```

## Support

For issues or questions:
- Check the main README.md
- Review API documentation at http://localhost:8000/docs
- Check Docker logs: `docker-compose logs -f`

---

**Built with ❤️ for Vadodara** | BarodaGo v1.0.0
