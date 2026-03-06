from flask import Blueprint, request, jsonify
from models import User, db
from werkzeug.security import generate_password_hash, check_password_hash
from firebase_service import verify_firebase_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/verify-token', methods=['POST'])
def verify_token():
    """Verify Firebase ID token and create/update user in local database"""
    data = request.get_json()
    token = data.get('token')
    
    if not token:
        return jsonify({'error': 'No token provided'}), 400
    
    try:
        # Verify Firebase token
        user_data, error = verify_firebase_token(token)
        
        if error:
            return jsonify({'error': f'Token verification failed: {error}'}), 401
        
        # Check if user exists in local database
        user = User.query.filter_by(email=user_data['email']).first()
        
        if not user:
            # Create new user in local database
            user = User(
                username=user_data['display_name'].split('|')[0] if '|' in user_data['display_name'] else user_data['display_name'],
                email=user_data['email'],
                firebase_uid=user_data['uid'],
                role=user_data['role']
            )
            db.session.add(user)
            db.session.commit()
        else:
            # Update existing user with Firebase UID if not set
            if not user.firebase_uid:
                user.firebase_uid = user_data['uid']
                user.role = user_data['role']
                db.session.commit()
        
        return jsonify({
            'message': 'Token verified successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': user.role,
                'firebase_uid': user.firebase_uid
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@auth_bp.route('/register', methods=['POST'])
def register():
    """Legacy register endpoint - kept for compatibility"""
    data = request.get_json()
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    user = User(
        username=data['username'],
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        role=data['role']
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'User created successfully', 'user_id': user.id}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    """Legacy login endpoint - kept for compatibility"""
    data = request.get_json()
    
    user = User.query.filter_by(username=data['username']).first()
    
    if user and check_password_hash(user.password_hash, data['password']):
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': user.role
            }
        }), 200
    
    return jsonify({'error': 'Invalid credentials'}), 401
