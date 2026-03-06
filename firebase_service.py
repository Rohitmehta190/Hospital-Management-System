import firebase_admin
from firebase_admin import credentials, auth
from functools import wraps
from flask import jsonify, request
import os

# Initialize Firebase Admin SDK
# You'll need to download your service account key from Firebase console
# and place it in backend/firebase_service_account.json

firebase_app = None

def initialize_firebase():
    """Initialize Firebase Admin SDK"""
    global firebase_app
    try:
        if not firebase_app:
            # Check if service account key exists
            service_account_path = os.path.join(os.path.dirname(__file__), 'firebase_service_account.json')
            if os.path.exists(service_account_path):
                cred = credentials.Certificate(service_account_path)
                firebase_app = firebase_admin.initialize_app(cred)
                print("Firebase Admin SDK initialized successfully")
            else:
                print("Warning: Firebase service account key not found. Firebase auth verification will be disabled.")
                print("Please download your service account key from Firebase console and save it as 'firebase_service_account.json'")
    except Exception as e:
        print(f"Error initializing Firebase: {e}")

def verify_firebase_token(token):
    """Verify Firebase ID token and return user data"""
    try:
        if not firebase_app:
            return None, "Firebase not initialized"
        
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']
        user = auth.get_user(uid)
        
        # Parse custom claims or display name for role
        role = decoded_token.get('role', 'patient')
        display_name = user.display_name or ''
        
        if '|' in display_name:
            name, user_role = display_name.split('|', 1)
            role = user_role or role
        
        return {
            'uid': uid,
            'email': user.email,
            'display_name': display_name,
            'role': role,
            'email_verified': user.email_verified
        }, None
    except auth.ExpiredIdTokenError:
        return None, "Token has expired"
    except auth.InvalidIdTokenError:
        return None, "Invalid token"
    except Exception as e:
        return None, str(e)

def firebase_auth_required(f):
    """Decorator to require Firebase authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return jsonify({'error': 'No authorization header provided'}), 401
        
        try:
            # Extract token from "Bearer <token>"
            token = auth_header.split(' ')[1] if len(auth_header.split(' ')) > 1 else auth_header
            
            user_data, error = verify_firebase_token(token)
            
            if error:
                return jsonify({'error': f'Authentication failed: {error}'}), 401
            
            # Add user data to request context
            request.current_user = user_data
            return f(*args, **kwargs)
            
        except Exception as e:
            return jsonify({'error': f'Authentication error: {str(e)}'}), 401
    
    return decorated_function

# Initialize Firebase when the module is imported
initialize_firebase()
