from app import create_app, db
from models import User, Patient, Doctor, Appointment
from datetime import datetime, timedelta
import random

def add_sample_data():
    app = create_app()
    
    with app.app_context():
        # Clear existing data (optional)
        # Appointment.query.delete()
        # Patient.query.delete()
        # Doctor.query.delete()
        # User.query.delete()
        # db.session.commit()
        
        # Check if we already have data
        if Appointment.query.first():
            print("Sample data already exists!")
            return
        
        # Create sample users if they don't exist
        users = User.query.all()
        if len(users) < 5:
            # Create sample users
            sample_users = [
                User(username='john_doe', email='john@example.com', password_hash='hashed_password', role='patient'),
                User(username='jane_smith', email='jane@example.com', password_hash='hashed_password', role='patient'),
                User(username='bob_wilson', email='bob@example.com', password_hash='hashed_password', role='patient'),
                User(username='dr_brown', email='brown@example.com', password_hash='hashed_password', role='doctor'),
                User(username='dr_davis', email='davis@example.com', password_hash='hashed_password', role='doctor'),
            ]
            
            for user in sample_users:
                db.session.add(user)
            db.session.commit()
            users = User.query.all()
        
        # Create sample patients if they don't exist
        patients = Patient.query.all()
        if len(patients) < 3:
            patient_users = users[:3]
            for i, user in enumerate(patient_users):
                patient = Patient(
                    user_id=user.id,
                    first_name=['John', 'Jane', 'Bob'][i],
                    last_name=['Doe', 'Smith', 'Wilson'][i],
                    date_of_birth=datetime(1990, 1, 1) + timedelta(days=i*365),
                    gender=['Male', 'Female', 'Male'][i],
                    phone=f'555-010{i+1}',
                    address=f'{i+100} Main St, City, State',
                    emergency_contact=f'Emergency Contact {i+1}: 555-999{i+1}'
                )
                db.session.add(patient)
            db.session.commit()
            patients = Patient.query.all()
        
        # Create sample doctors if they don't exist
        doctors = Doctor.query.all()
        if len(doctors) < 2:
            doctor_users = users[3:5]
            specializations = ['Cardiology', 'General Medicine']
            for i, user in enumerate(doctor_users):
                doctor = Doctor(
                    user_id=user.id,
                    first_name=['Michael', 'Sarah'][i],
                    last_name=['Brown', 'Davis'][i],
                    specialization=specializations[i],
                    license_number=f'LICENSE-{1000+i}',
                    phone=f'555-020{i+1}',
                    email=f'dr.{["brown", "davis"][i]}@hospital.com'
                )
                db.session.add(doctor)
            db.session.commit()
            doctors = Doctor.query.all()
        
        # Create sample appointments
        if not Appointment.query.first():
            statuses = ['scheduled', 'completed', 'cancelled']
            reasons = [
                'Regular checkup',
                'Chest pain',
                'Headache',
                'Fever',
                'Back pain',
                'Annual physical',
                'Follow-up visit',
                'Urgent consultation'
            ]
            
            # Create appointments for the next 30 days
            for i in range(20):
                appointment_date = datetime.now() + timedelta(days=random.randint(-5, 30))
                appointment_date = appointment_date.replace(
                    hour=random.randint(9, 17),
                    minute=random.choice([0, 30])
                )
                
                appointment = Appointment(
                    patient_id=random.choice(patients).id,
                    doctor_id=random.choice(doctors).id,
                    appointment_date=appointment_date,
                    reason=random.choice(reasons),
                    status=random.choice(statuses),
                    notes=f'Patient notes for appointment {i+1}'
                )
                db.session.add(appointment)
            
            db.session.commit()
        
        print("Sample data added successfully!")
        print(f"Created {Patient.query.count()} patients")
        print(f"Created {Doctor.query.count()} doctors")
        print(f"Created {Appointment.query.count()} appointments")

if __name__ == '__main__':
    add_sample_data()
