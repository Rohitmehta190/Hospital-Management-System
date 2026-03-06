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
    
    // Check if Firebase auth is initialized
    if (!auth) {
      throw new Error('Firebase auth not initialized');
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('Registration successful, user:', user);
    
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
    console.error("Registration error details:", {
      code: error.code,
      message: error.message,
      email: email
    });
    
    // Provide more specific error messages
    let errorMessage = "Registration failed";
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = "An account with this email already exists.";
        break;
      case 'auth/invalid-email':
        errorMessage = "Invalid email address format.";
        break;
      case 'auth/operation-not-allowed':
        errorMessage = "Email/password accounts are not enabled. Please contact support.";
        break;
      case 'auth/weak-password':
        errorMessage = "Password is too weak. Please choose a stronger password.";
        break;
      case 'auth/too-many-requests':
        errorMessage = "Too many attempts. Please try again later.";
        break;
      default:
        errorMessage = error.message || "Registration failed";
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    console.log('Attempting login with:', { email });
    
    // Check if Firebase auth is initialized
    if (!auth) {
      throw new Error('Firebase auth not initialized');
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('Login successful, user:', user);
    
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
    console.error("Login error details:", {
      code: error.code,
      message: error.message,
      email: email
    });
    
    // Provide more specific error messages
    let errorMessage = "Login failed";
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = "No account found with this email address.";
        break;
      case 'auth/wrong-password':
        errorMessage = "Incorrect password. Please try again.";
        break;
      case 'auth/invalid-email':
        errorMessage = "Invalid email address format.";
        break;
      case 'auth/user-disabled':
        errorMessage = "This account has been disabled.";
        break;
      case 'auth/too-many-requests':
        errorMessage = "Too many failed attempts. Please try again later.";
        break;
      case 'auth/invalid-credential':
        errorMessage = "Invalid credentials. Please check your email and password.";
        break;
      default:
        errorMessage = error.message || "Login failed";
    }
    
    return {
      success: false,
      error: errorMessage
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
