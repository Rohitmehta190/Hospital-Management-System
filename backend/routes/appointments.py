from flask import Blueprint, request, jsonify
from models import Appointment, db
from datetime import datetime

appointments_bp = Blueprint('appointments', __name__)

@appointments_bp.route('/', methods=['GET'])
def get_appointments():
    appointments = Appointment.query.all()
    return jsonify([{
        'id': a.id,
        'patient_id': a.patient_id,
        'doctor_id': a.doctor_id,
        'patient_name': f"{a.patient.first_name} {a.patient.last_name}",
        'doctor_name': f"{a.doctor.first_name} {a.doctor.last_name}",
        'appointment_date': a.appointment_date.isoformat(),
        'reason': a.reason,
        'status': a.status,
        'notes': a.notes
    } for a in appointments])

@appointments_bp.route('/', methods=['POST'])
def create_appointment():
    data = request.get_json()
    
    appointment = Appointment(
        patient_id=data['patient_id'],
        doctor_id=data['doctor_id'],
        appointment_date=datetime.strptime(data['appointment_date'], '%Y-%m-%d %H:%M'),
        reason=data.get('reason'),
        status=data.get('status', 'scheduled'),
        notes=data.get('notes')
    )
    
    db.session.add(appointment)
    db.session.commit()
    
    return jsonify({'message': 'Appointment created successfully', 'appointment_id': appointment.id}), 201

@appointments_bp.route('/<int:appointment_id>', methods=['GET'])
def get_appointment(appointment_id):
    appointment = Appointment.query.get_or_404(appointment_id)
    return jsonify({
        'id': appointment.id,
        'patient_id': appointment.patient_id,
        'doctor_id': appointment.doctor_id,
        'patient_name': f"{appointment.patient.first_name} {appointment.patient.last_name}",
        'doctor_name': f"{appointment.doctor.first_name} {appointment.doctor.last_name}",
        'appointment_date': appointment.appointment_date.isoformat(),
        'reason': appointment.reason,
        'status': appointment.status,
        'notes': appointment.notes
    })

@appointments_bp.route('/<int:appointment_id>', methods=['PUT'])
def update_appointment(appointment_id):
    appointment = Appointment.query.get_or_404(appointment_id)
    data = request.get_json()
    
    if 'appointment_date' in data:
        appointment.appointment_date = datetime.strptime(data['appointment_date'], '%Y-%m-%d %H:%M')
    
    appointment.reason = data.get('reason', appointment.reason)
    appointment.status = data.get('status', appointment.status)
    appointment.notes = data.get('notes', appointment.notes)
    
    db.session.commit()
    
    return jsonify({'message': 'Appointment updated successfully'})

@appointments_bp.route('/<int:appointment_id>', methods=['DELETE'])
def delete_appointment(appointment_id):
    appointment = Appointment.query.get_or_404(appointment_id)
    db.session.delete(appointment)
    db.session.commit()
    
    return jsonify({'message': 'Appointment deleted successfully'})

@appointments_bp.route('/patient/<int:patient_id>', methods=['GET'])
def get_patient_appointments(patient_id):
    appointments = Appointment.query.filter_by(patient_id=patient_id).all()
    return jsonify([{
        'id': a.id,
        'doctor_id': a.doctor_id,
        'doctor_name': f"{a.doctor.first_name} {a.doctor.last_name}",
        'appointment_date': a.appointment_date.isoformat(),
        'reason': a.reason,
        'status': a.status,
        'notes': a.notes
    } for a in appointments])

@appointments_bp.route('/doctor/<int:doctor_id>', methods=['GET'])
def get_doctor_appointments(doctor_id):
    appointments = Appointment.query.filter_by(doctor_id=doctor_id).all()
    return jsonify([{
        'id': a.id,
        'patient_id': a.patient_id,
        'patient_name': f"{a.patient.first_name} {a.patient.last_name}",
        'appointment_date': a.appointment_date.isoformat(),
        'reason': a.reason,
        'status': a.status,
        'notes': a.notes
    } for a in appointments])
