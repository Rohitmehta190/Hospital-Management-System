// Mock Authentication for testing
export const mockAuth = {
  // Simulate user registration
  registerUser: async (email, password, displayName, role) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store user in localStorage
    const user = {
      uid: 'mock_' + Date.now(),
      email: email,
      displayName: displayName,
      role: role,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('mockUser', JSON.stringify(user));
    localStorage.setItem('mockToken', 'mock_token_' + Date.now());
    
    return {
      success: true,
      user: user
    };
  },
  
  // Simulate user login
  loginUser: async (email, password) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email) {
        localStorage.setItem('mockToken', 'mock_token_' + Date.now());
        return {
          success: true,
          user: user
        };
      }
    }
    
    // If no user found, create a default one for testing
    const defaultUser = {
      uid: 'mock_default',
      email: email,
      displayName: email.split('@')[0],
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('mockUser', JSON.stringify(defaultUser));
    localStorage.setItem('mockToken', 'mock_token_' + Date.now());
    
    return {
      success: true,
      user: defaultUser
    };
  },
  
  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('mockUser');
    const token = localStorage.getItem('mockToken');
    
    if (user && token) {
      return JSON.parse(user);
    }
    return null;
  },
  
  // Logout
  logoutUser: async () => {
    localStorage.removeItem('mockUser');
    localStorage.removeItem('mockToken');
    return { success: true };
  },
  
  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('mockToken');
  }
};

export default mockAuth;
