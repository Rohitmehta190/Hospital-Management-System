from app import create_app, db
from models import User, Patient, Doctor, Appointment
from datetime import datetime, timedelta
import random

def add_sample_data():
    app = create_app()
    
    with app.app_context():
        # Clear existing data to add Indian names
        Appointment.query.delete()
        Patient.query.delete()
        Doctor.query.delete()
        User.query.delete()
        db.session.commit()
        
        # Check if we already have data
        if Appointment.query.first():
            print("Sample data already exists!")
            return
        
        # Create sample users if they don't exist
        users = User.query.all()
        if len(users) < 5:
            # Create sample users with Indian names
            sample_users = [
                User(username='rahul_sharma', email='rahul.sharma@email.com', password_hash='hashed_password', role='patient'),
                User(username='priya_patel', email='priya.patel@email.com', password_hash='hashed_password', role='patient'),
                User(username='amit_kumar', email='amit.kumar@email.com', password_hash='hashed_password', role='patient'),
                User(username='dr_ashok_reddy', email='ashok.reddy@hospital.com', password_hash='hashed_password', role='doctor'),
                User(username='dr_anjali_gupta', email='anjali.gupta@hospital.com', password_hash='hashed_password', role='doctor'),
            ]
            
            for user in sample_users:
                db.session.add(user)
            db.session.commit()
            users = User.query.all()
        
        # Create sample patients if they don't exist
        patients = Patient.query.all()
        if len(patients) < 3:
            patient_users = users[:3]
            indian_first_names = ['Rahul', 'Priya', 'Amit']
            indian_last_names = ['Sharma', 'Patel', 'Kumar']
            indian_addresses = [
                '123, MG Road, Bangalore, Karnataka - 560001',
                '456, Nehru Street, Chennai, Tamil Nadu - 600001',
                '789, Park Avenue, Mumbai, Maharashtra - 400001'
            ]
            indian_phones = ['+91-9876543210', '+91-9876543211', '+91-9876543212']
            indian_emergency_contacts = [
                'Suresh Sharma (Father): +91-9876543213',
                'Ramesh Patel (Husband): +91-9876543214',
                'Sunita Kumar (Wife): +91-9876543215'
            ]
            
            for i, user in enumerate(patient_users):
                patient = Patient(
                    user_id=user.id,
                    first_name=indian_first_names[i],
                    last_name=indian_last_names[i],
                    date_of_birth=datetime(1990, 1, 1) + timedelta(days=i*365),
                    gender=['Male', 'Female', 'Male'][i],
                    phone=indian_phones[i],
                    address=indian_addresses[i],
                    emergency_contact=indian_emergency_contacts[i]
                )
                db.session.add(patient)
            db.session.commit()
            patients = Patient.query.all()
        
        # Create sample doctors if they don't exist
        doctors = Doctor.query.all()
        if len(doctors) < 2:
            doctor_users = users[3:5]
            specializations = ['Cardiology', 'General Medicine']
            indian_doctor_names = ['Ashok', 'Anjali']
            indian_doctor_surnames = ['Reddy', 'Gupta']
            indian_doctor_addresses = [
                'Apollo Hospital, Hyderabad, Telangana - 500001',
                'Fortis Hospital, Delhi, Delhi - 110001'
            ]
            indian_doctor_phones = ['+91-9812345678', '+91-9812345679']
            
            for i, user in enumerate(doctor_users):
                doctor = Doctor(
                    user_id=user.id,
                    first_name=indian_doctor_names[i],
                    last_name=indian_doctor_surnames[i],
                    specialization=specializations[i],
                    license_number=f'IN-MED-{2000+i}',
                    phone=indian_doctor_phones[i],
                    email=f'dr.{["ashok.reddy", "anjali.gupta"][i]}@hospital.com'
                )
                db.session.add(doctor)
            db.session.commit()
            doctors = Doctor.query.all()
        
        # Create sample appointments
        if not Appointment.query.first():
            statuses = ['scheduled', 'completed', 'cancelled']
            reasons = [
                'Regular health checkup',
                'Chest pain consultation',
                'Headache and migraine',
                'Fever and body pain',
                'Back pain treatment',
                'Annual physical examination',
                'Diabetes follow-up visit',
                'Urgent consultation',
                'Blood pressure check',
                'Heart condition review',
                'Stomach pain evaluation',
                'Eye examination',
                'Dental checkup',
                'Skin allergy treatment',
                'Joint pain consultation'
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
                    notes=f'Patient notes for appointment {i+1} - {random.choice(reasons)}'
                )
                db.session.add(appointment)
            
            db.session.commit()
        
        print("Sample data added successfully!")
        print(f"Created {Patient.query.count()} patients")
        print(f"Created {Doctor.query.count()} doctors")
        print(f"Created {Appointment.query.count()} appointments")

if __name__ == '__main__':
    add_sample_data()
