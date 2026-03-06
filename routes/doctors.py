from flask import Blueprint, request, jsonify
from models import Doctor, db
from datetime import datetime

doctors_bp = Blueprint('doctors', __name__)

@doctors_bp.route('', methods=['GET'])
def get_doctors():
    doctors = Doctor.query.all()
    return jsonify([{
        'id': d.id,
        'user_id': d.user_id,
        'first_name': d.first_name,
        'last_name': d.last_name,
        'specialization': d.specialization,
        'license_number': d.license_number,
        'phone': d.phone,
        'email': d.email,
        'experience': d.experience,
        'education': d.education,
        'availability': d.availability,
        'created_at': d.created_at.isoformat() if d.created_at else None
    } for d in doctors])

@doctors_bp.route('', methods=['POST'])
def create_doctor():
    data = request.get_json()
    
    doctor = Doctor(
        user_id=data['user_id'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        specialization=data['specialization'],
        license_number=data['license_number'],
        phone=data.get('phone'),
        email=data.get('email'),
        experience=data.get('experience'),
        education=data.get('education'),
        availability=data.get('availability', 'full-time')
    )
    
    db.session.add(doctor)
    db.session.commit()
    
    return jsonify({'message': 'Doctor created successfully', 'doctor_id': doctor.id}), 201

@doctors_bp.route('/<int:doctor_id>', methods=['GET'])
def get_doctor(doctor_id):
    doctor = Doctor.query.get_or_404(doctor_id)
    return jsonify({
        'id': doctor.id,
        'user_id': doctor.user_id,
        'first_name': doctor.first_name,
        'last_name': doctor.last_name,
        'specialization': doctor.specialization,
        'license_number': doctor.license_number,
        'phone': doctor.phone,
        'email': doctor.email,
        'experience': doctor.experience,
        'education': doctor.education,
        'availability': doctor.availability,
        'created_at': doctor.created_at.isoformat() if doctor.created_at else None
    })

@doctors_bp.route('/<int:doctor_id>', methods=['PUT'])
def update_doctor(doctor_id):
    doctor = Doctor.query.get_or_404(doctor_id)
    data = request.get_json()
    
    doctor.first_name = data.get('first_name', doctor.first_name)
    doctor.last_name = data.get('last_name', doctor.last_name)
    doctor.specialization = data.get('specialization', doctor.specialization)
    doctor.license_number = data.get('license_number', doctor.license_number)
    doctor.phone = data.get('phone', doctor.phone)
    doctor.email = data.get('email', doctor.email)
    doctor.experience = data.get('experience', doctor.experience)
    doctor.education = data.get('education', doctor.education)
    doctor.availability = data.get('availability', doctor.availability)
    
    db.session.commit()
    
    return jsonify({'message': 'Doctor updated successfully'})

@doctors_bp.route('/<int:doctor_id>', methods=['DELETE'])
def delete_doctor(doctor_id):
    doctor = Doctor.query.get_or_404(doctor_id)
    db.session.delete(doctor)
    db.session.commit()
    
    return jsonify({'message': 'Doctor deleted successfully'})

@doctors_bp.route('/<int:doctor_id>/appointments', methods=['GET'])
def get_doctor_appointments(doctor_id):
    from models import Appointment
    appointments = Appointment.query.filter_by(doctor_id=doctor_id).all()
    return jsonify([{
        'id': apt.id,
        'patient_id': apt.patient_id,
        'doctor_id': apt.doctor_id,
        'appointment_date': apt.appointment_date.isoformat() if apt.appointment_date else None,
        'status': apt.status,
        'notes': apt.notes
    } for apt in appointments])

@doctors_bp.route('/<int:doctor_id>/appointments', methods=['POST'])
def create_appointment(doctor_id):
    from models import Appointment, Patient
    data = request.get_json()
    
    # Verify patient exists
    patient = Patient.query.get(data['patient_id'])
    if not patient:
        return jsonify({'error': 'Patient not found'}), 404
    
    # Create appointment
    appointment_date = datetime.strptime(f"{data['date']} {data['time']}", "%Y-%m-%d %H:%M")
    
    appointment = Appointment(
        patient_id=data['patient_id'],
        doctor_id=doctor_id,
        appointment_date=appointment_date,
        status='scheduled',
        notes=data.get('notes', '')
    )
    
    db.session.add(appointment)
    db.session.commit()
    
    return jsonify({'message': 'Appointment created successfully', 'appointment_id': appointment.id}), 201
