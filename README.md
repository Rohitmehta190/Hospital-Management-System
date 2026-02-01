# Hospital Management System

A comprehensive hospital management system built with Flask (backend) and React (frontend).

## Project Structure

```
hospital-management-system/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── config.py           # Configuration settings
│   ├── models.py           # Database models
│   ├── database.db         # SQLite database (created automatically)
│   ├── requirements.txt   # Python dependencies
│   └── routes/
│       ├── auth.py        # Authentication routes
│       ├── patients.py    # Patient management routes
│       ├── doctors.py     # Doctor management routes
│       └── appointments.py # Appointment management routes
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Patients.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html         # Legacy vanilla JS version
    ├── style.css          # Legacy vanilla JS version
    └── script.js          # Legacy vanilla JS version
```

## Features

- **User Authentication**: Register and login system with role-based access
- **Patient Management**: Add, view, edit, and delete patient records
- **Doctor Management**: Manage doctor profiles and specializations
- **Appointment Scheduling**: Schedule, view, and manage appointments
- **Dashboard**: Overview of key metrics and statistics

## Installation and Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the Flask application:
   ```bash
   python app.py
   ```

The backend will start running on `http://localhost:5000`

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The React frontend will be available at `http://localhost:3000`

**Note**: The CSS lint warnings about `@tailwind` and `@apply` are expected and will be resolved once Tailwind CSS is properly configured with the build process.

#### Alternative: Legacy Vanilla JS Frontend

If you prefer to use the vanilla JavaScript version:

1. Navigate to the frontend directory
2. Open `index.html` in your web browser or serve it with a simple HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (if you have http-server installed)
   npx http-server -p 8000
   ```

The legacy frontend will be available at `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Patients
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create a new patient
- `GET /api/patients/<id>` - Get a specific patient
- `PUT /api/patients/<id>` - Update a patient
- `DELETE /api/patients/<id>` - Delete a patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create a new doctor
- `GET /api/doctors/<id>` - Get a specific doctor
- `PUT /api/doctors/<id>` - Update a doctor
- `DELETE /api/doctors/<id>` - Delete a doctor

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create a new appointment
- `GET /api/appointments/<id>` - Get a specific appointment
- `PUT /api/appointments/<id>` - Update an appointment
- `DELETE /api/appointments/<id>` - Delete an appointment
- `GET /api/appointments/patient/<patient_id>` - Get appointments for a specific patient
- `GET /api/appointments/doctor/<doctor_id>` - Get appointments for a specific doctor

## Database Schema

The system uses SQLite with the following main tables:
- `users` - User authentication and roles
- `patients` - Patient information
- `doctors` - Doctor information
- `appointments` - Appointment scheduling

## Usage

### React Frontend (Recommended)
1. Start the backend server (`python app.py`)
2. Start the React frontend (`npm start`)
3. Register a new user account
4. Login and start managing patients, doctors, and appointments

### Legacy Frontend
1. Start the backend server
2. Open the legacy frontend in your browser
3. Register a new user account
4. Login and start managing patients, doctors, and appointments

## Technologies Used

- **Backend**: Flask, SQLAlchemy, Flask-CORS
- **Frontend**: React, Tailwind CSS, Axios (Primary), HTML5, CSS3, JavaScript, Bootstrap 5 (Legacy)
- **Database**: SQLite
- **Authentication**: Werkzeug security functions

## Future Enhancements

- Real-time notifications
- Medical records management
- Billing and invoicing
- Advanced reporting and analytics
- Mobile app compatibility
- Integration with medical devices
