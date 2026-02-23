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

// Initialize Firebase
let app = null;
let auth = null;

try {
  console.log('Firebase config:', firebaseConfig);
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
  // Don't create mock auth - let it fail so we know the real issue
  throw error;
}

// Authentication functions
export const registerUser = async (email, password, displayName, role) => {
  try {
    console.log('Attempting registration with:', { email, displayName, role });
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
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
    console.error("Registration error:", error);
    return {
      success: false,
      error: error.message || "Registration failed"
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    console.log('Attempting login with:', { email });
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Parse display name to get name and role
    const [displayName, role] = (user.displayName || '').split('|');
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: displayName || 'User',
        role: role || 'patient'
      }
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error.message || "Login failed"
    };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
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
