from flask import Blueprint, request, jsonify
from models import Patient, db
from datetime import datetime

patients_bp = Blueprint('patients', __name__)

@patients_bp.route('/', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    return jsonify([{
        'id': p.id,
        'first_name': p.first_name,
        'last_name': p.last_name,
        'date_of_birth': p.date_of_birth.isoformat(),
        'gender': p.gender,
        'phone': p.phone,
        'email': p.user.email if p.user else None
    } for p in patients])

@patients_bp.route('/', methods=['POST'])
def create_patient():
    data = request.get_json()
    
    patient = Patient(
        user_id=data['user_id'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        date_of_birth=datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date(),
        gender=data['gender'],
        phone=data.get('phone'),
        address=data.get('address'),
        emergency_contact=data.get('emergency_contact')
    )
    
    db.session.add(patient)
    db.session.commit()
    
    return jsonify({'message': 'Patient created successfully', 'patient_id': patient.id}), 201

@patients_bp.route('/<int:patient_id>', methods=['GET'])
def get_patient(patient_id):
    patient = Patient.query.get_or_404(patient_id)
    return jsonify({
        'id': patient.id,
        'first_name': patient.first_name,
        'last_name': patient.last_name,
        'date_of_birth': patient.date_of_birth.isoformat(),
        'gender': patient.gender,
        'phone': patient.phone,
        'address': patient.address,
        'emergency_contact': patient.emergency_contact,
        'email': patient.user.email if patient.user else None
    })

@patients_bp.route('/<int:patient_id>', methods=['PUT'])
def update_patient(patient_id):
    patient = Patient.query.get_or_404(patient_id)
    data = request.get_json()
    
    patient.first_name = data.get('first_name', patient.first_name)
    patient.last_name = data.get('last_name', patient.last_name)
    patient.phone = data.get('phone', patient.phone)
    patient.address = data.get('address', patient.address)
    patient.emergency_contact = data.get('emergency_contact', patient.emergency_contact)
    
    if 'date_of_birth' in data:
        patient.date_of_birth = datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date()
    
    db.session.commit()
    
    return jsonify({'message': 'Patient updated successfully'})

@patients_bp.route('/<int:patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    patient = Patient.query.get_or_404(patient_id)
    db.session.delete(patient)
    db.session.commit()
    
    return jsonify({'message': 'Patient deleted successfully'})
