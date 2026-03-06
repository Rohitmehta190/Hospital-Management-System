import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import firebaseConfig from '../firebase/firebaseConfig';
import mockAuth from './mockAuth';

// Initialize Firebase
let app = null;
let auth = null;
let useMockAuth = false;

try {
  console.log('Firebase config:', firebaseConfig);
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
  console.log("Switching to mock authentication");
  useMockAuth = true;
}

// Authentication functions
export const registerUser = async (email, password, displayName, role) => {
  if (useMockAuth) {
    console.log('Using mock auth for registration');
    return mockAuth.registerUser(email, password, displayName, role);
  }
  
  try {
    console.log('Attempting Firebase registration with:', { email, displayName, role });
    
    // Check if Firebase auth is initialized
    if (!auth) {
      console.log('Firebase auth not initialized, switching to mock auth');
      useMockAuth = true;
      return mockAuth.registerUser(email, password, displayName, role);
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('Firebase registration successful, user:', user);
    
    // Update user profile with display name and role
    await updateProfile(user, {
      displayName: `${displayName}|${role}`
    });
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        role: role
      }
    };
  } catch (error) {
    console.error("Firebase registration error, switching to mock auth:", error.message);
    useMockAuth = true;
    return mockAuth.registerUser(email, password, displayName, role);
  }
};

export const loginUser = async (email, password) => {
  if (useMockAuth) {
    console.log('Using mock auth for login');
    return mockAuth.loginUser(email, password);
  }
  
  try {
    console.log('Attempting Firebase login with:', { email });
    
    // Check if Firebase auth is initialized
    if (!auth) {
      console.log('Firebase auth not initialized, switching to mock auth');
      useMockAuth = true;
      return mockAuth.loginUser(email, password);
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('Firebase login successful, user:', user);
    
    // Parse display name to get name and role
    const [displayName, role] = (user.displayName || '').split('|');
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: displayName || email.split('@')[0], // Fallback to email username
        role: role || 'patient'
      }
    };
  } catch (error) {
    console.error("Firebase login error, switching to mock auth:", error.message);
    useMockAuth = true;
    return mockAuth.loginUser(email, password);
  }
};

export const logoutUser = async () => {
  if (useMockAuth) {
    console.log('Using mock auth for logout');
    return mockAuth.logoutUser();
  }
  
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Firebase logout error, switching to mock auth:", error.message);
    useMockAuth = true;
    return mockAuth.logoutUser();
  }
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const [displayName, role] = (user.displayName || '').split('|');
      callback({
        uid: user.uid,
        email: user.email,
        displayName: displayName || 'User',
        role: role || 'patient'
      });
    } else {
      callback(null);
    }
  });
};

export const getCurrentUser = () => {
  const user = auth.currentUser;
  if (user) {
    const [displayName, role] = (user.displayName || '').split('|');
    return {
      uid: user.uid,
      email: user.email,
      displayName: displayName || 'User',
      role: role || 'patient'
    };
  }
  return null;
};

export { auth };
