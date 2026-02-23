// Firebase Test Utility
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../firebase/firebaseConfig';

export const testFirebaseConnection = () => {
  console.log('Testing Firebase connection...');
  console.log('Firebase Config:', firebaseConfig);
  
  try {
    // Test app initialization
    const app = initializeApp(firebaseConfig);
    console.log('✅ Firebase app initialized successfully');
    
    // Test auth initialization
    const auth = getAuth(app);
    console.log('✅ Firebase auth initialized successfully');
    
    // Test auth object
    console.log('Auth object:', auth);
    console.log('Auth current user:', auth.currentUser);
    
    return { success: true, message: 'Firebase connection successful' };
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return { success: false, error: error.message };
  }
};

export const checkFirebaseConfig = () => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const missing = requiredFields.filter(field => !firebaseConfig[field]);
  
  if (missing.length > 0) {
    console.error('❌ Missing Firebase config fields:', missing);
    return { success: false, missing };
  }
  
  if (firebaseConfig.apiKey === 'YOUR_API_KEY') {
    console.error('❌ Firebase config still has placeholder values');
    return { success: false, error: 'Placeholder config values detected' };
  }
  
  console.log('✅ Firebase configuration is valid');
  return { success: true };
};
