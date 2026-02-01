from flask import Blueprint, request, jsonify
from models import Doctor, db
from datetime import datetime

doctors_bp = Blueprint('doctors', __name__)

@doctors_bp.route('/', methods=['GET'])
def get_doctors():
    doctors = Doctor.query.all()
    return jsonify([{
        'id': d.id,
        'first_name': d.first_name,
        'last_name': d.last_name,
        'specialization': d.specialization,
        'license_number': d.license_number,
        'phone': d.phone,
        'email': d.email
    } for d in doctors])

@doctors_bp.route('/', methods=['POST'])
def create_doctor():
    data = request.get_json()
    
    doctor = Doctor(
        user_id=data['user_id'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        specialization=data['specialization'],
        license_number=data['license_number'],
        phone=data.get('phone'),
        email=data.get('email')
    )
    
    db.session.add(doctor)
    db.session.commit()
    
    return jsonify({'message': 'Doctor created successfully', 'doctor_id': doctor.id}), 201

@doctors_bp.route('/<int:doctor_id>', methods=['GET'])
def get_doctor(doctor_id):
    doctor = Doctor.query.get_or_404(doctor_id)
    return jsonify({
        'id': doctor.id,
        'first_name': doctor.first_name,
        'last_name': doctor.last_name,
        'specialization': doctor.specialization,
        'license_number': doctor.license_number,
        'phone': doctor.phone,
        'email': doctor.email
    })

@doctors_bp.route('/<int:doctor_id>', methods=['PUT'])
def update_doctor(doctor_id):
    doctor = Doctor.query.get_or_404(doctor_id)
    data = request.get_json()
    
    doctor.first_name = data.get('first_name', doctor.first_name)
    doctor.last_name = data.get('last_name', doctor.last_name)
    doctor.specialization = data.get('specialization', doctor.specialization)
    doctor.phone = data.get('phone', doctor.phone)
    doctor.email = data.get('email', doctor.email)
    
    db.session.commit()
    
    return jsonify({'message': 'Doctor updated successfully'})

@doctors_bp.route('/<int:doctor_id>', methods=['DELETE'])
def delete_doctor(doctor_id):
    doctor = Doctor.query.get_or_404(doctor_id)
    db.session.delete(doctor)
    db.session.commit()
    
    return jsonify({'message': 'Doctor deleted successfully'})
