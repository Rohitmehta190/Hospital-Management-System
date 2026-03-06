from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from models import db
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)
    CORS(app)
    
    # Health check endpoint
    @app.route('/')
    def health_check():
        return jsonify({
            'status': 'healthy',
            'message': 'Hospital Management System API is running'
        })
    
    # Import and register blueprints (with error handling)
    try:
        from routes.auth import auth_bp
        app.register_blueprint(auth_bp, url_prefix='/api/auth')
        print("Auth routes registered")
    except ImportError as e:
        print(f"Auth routes not available: {e}")
    
    try:
        from routes.patients import patients_bp
        app.register_blueprint(patients_bp, url_prefix='/api/patients')
        print("Patients routes registered")
    except ImportError as e:
        print(f"Patients routes not available: {e}")
    
    try:
        from routes.doctors import doctors_bp
        app.register_blueprint(doctors_bp, url_prefix='/api/doctors')
        print("Doctors routes registered")
    except ImportError as e:
        print(f"Doctors routes not available: {e}")
    
    try:
        from routes.appointments import appointments_bp
        app.register_blueprint(appointments_bp, url_prefix='/api/appointments')
        print("Appointments routes registered")
    except ImportError as e:
        print(f"Appointments routes not available: {e}")
    
    # Initialize database
    with app.app_context():
        try:
            db.create_all()
            print("Database tables created successfully")
        except Exception as e:
            print(f"Database creation error: {e}")
    
    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
