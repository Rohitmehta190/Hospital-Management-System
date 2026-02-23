# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication for your Hospital Management System.

## 📋 Prerequisites
- A Google account
- Firebase project (free tier is sufficient)

## 🔧 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter your project name (e.g., "hospital-management-system")
4. Follow the setup wizard
5. Enable Google Analytics (optional)

## 🔧 Step 2: Enable Authentication

1. In your Firebase project, go to "Authentication" from the left menu
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Click "Save"

## 🔧 Step 3: Get Firebase Configuration

1. Go to Project Settings (gear icon ⚙️)
2. Under "Your apps", click the web app icon (</>)
3. Copy the Firebase configuration object
4. Update `frontend/src/firebase/firebaseConfig.js` with your config:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 🔧 Step 4: Set Up Service Account (Backend)

1. In Firebase Console, go to Project Settings
2. Click "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Rename it to `firebase_service_account.json`
6. Place it in the `backend/` directory

## 🔧 Step 5: Update Database Schema

The backend has been updated to support Firebase authentication. The User model now includes:
- `firebase_uid`: Stores the Firebase user ID
- `password_hash`: Made nullable (Firebase users don't need local passwords)

## 🔧 Step 6: Test the Integration

1. Restart both frontend and backend servers
2. Try registering a new user
3. Check if the user appears in Firebase Console → Authentication
4. Verify the user is also created in your local database

## 🚀 How It Works

### Frontend (Firebase Client SDK)
- Users register/login through Firebase Authentication
- Firebase returns ID tokens
- Tokens are stored in localStorage
- Auth state changes are automatically handled

### Backend (Firebase Admin SDK)
- Receives Firebase ID tokens from frontend
- Verifies tokens using Firebase Admin SDK
- Creates/updates users in local database
- Links Firebase UID with local user records

### Authentication Flow
1. User registers/logs in via Firebase
2. Firebase returns user data and ID token
3. Frontend stores token and user data
4. Frontend sends token to backend for verification
5. Backend verifies token and creates/updates local user
6. User is authenticated in the system

## 🔒 Security Features

- **Token Verification**: Backend verifies every Firebase token
- **Automatic Token Refresh**: Firebase SDK handles token refresh
- **Role Management**: User roles are stored in Firebase user profile
- **Session Management**: Firebase handles session state

## 🐛 Troubleshooting

### Common Issues

1. **"Firebase not initialized" error**
   - Make sure `firebase_service_account.json` is in the backend folder
   - Check that the service account key is valid

2. **"Invalid token" error**
   - Check that Firebase configuration is correct
   - Ensure user is logged in via Firebase

3. **"Email already exists" error**
   - User might already exist in Firebase
   - Check Firebase Console → Authentication

4. **CORS issues**
   - Backend should handle CORS properly
   - Ensure frontend URL is allowed

### Debug Mode
Enable debug mode in Firebase console to see detailed authentication logs.

## 📱 Testing

Test the following scenarios:
- ✅ New user registration
- ✅ User login with correct credentials
- ✅ User login with incorrect credentials
- ✅ User logout
- ✅ Token verification
- ✅ Role-based access

## 🔄 Migration from Local Auth

If you have existing users with local authentication:
1. They can continue using the legacy login system
2. New users will use Firebase authentication
3. You can migrate existing users to Firebase by:
   - Creating Firebase accounts for them
   - Updating their records with Firebase UID

## 🎯 Next Steps

Once Firebase authentication is working:
1. Add social login providers (Google, Facebook, etc.)
2. Implement multi-factor authentication
3. Add email verification
4. Set up password reset functionality
5. Add custom claims for advanced role management

## 📞 Support

If you encounter issues:
1. Check Firebase Console for error messages
2. Review browser console for JavaScript errors
3. Check backend logs for authentication errors
4. Verify all configuration files are correct
