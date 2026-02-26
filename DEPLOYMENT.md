# Hospital Management System - Deployment Guide

## Requirements Files Created

### 1. Backend Requirements
- **File**: `backend/requirements.txt`
- **Installation**: `pip install -r backend/requirements.txt`

### 2. Frontend Requirements  
- **File**: `frontend/package.json` (primary)
- **File**: `frontend/requirements.txt` (reference)
- **Installation**: `cd frontend && npm install`

### 3. Root Requirements
- **File**: `requirements.txt` (overview)

## Deployment Steps

### Backend Deployment
1. Install Python dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

2. Set environment variables:
   ```bash
   export SECRET_KEY="your-production-secret-key"
   export DATABASE_URL="your-production-database-url"
   ```

3. Initialize database:
   ```bash
   python -c "from app import create_app, db; app = create_app(); app.app_context().push(); db.create_all()"
   ```

4. Run the application:
   ```bash
   python backend/app.py
   ```

### Frontend Deployment
1. Install Node.js dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Build for production:
   ```bash
   npm run build
   ```

3. Deploy the `build/` directory to your web server

### Environment Variables Required
- `SECRET_KEY`: Flask secret key
- `DATABASE_URL`: Database connection string (if not using SQLite)
- Firebase credentials for authentication (optional)

## Notes
- The backend runs on port 5000 by default
- The frontend build outputs to `frontend/build/`
- Firebase service account key should be placed at `backend/firebase_service_account.json`
- SQLite database will be created automatically at `backend/database.db`
