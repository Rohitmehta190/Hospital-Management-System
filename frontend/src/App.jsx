import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import AdminDashboard from './pages/AdminDashboard';
import DoctorPatients from './pages/DoctorPatients';
import PatientAppointments from './pages/PatientAppointments';
import Layout from './components/Layout';
import api from './services/api';
import { onAuthStateChange, logoutUser } from './services/firebaseAuth';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      if (firebaseUser) {
        // Convert Firebase user to app user format
        const appUser = {
          id: firebaseUser.uid,
          username: firebaseUser.displayName,
          email: firebaseUser.email,
          role: firebaseUser.role,
          uid: firebaseUser.uid
        };
        setUser(appUser);
        localStorage.setItem('token', 'firebase-token');
        localStorage.setItem('user', JSON.stringify(appUser));
      } else {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setCurrentPage('dashboard');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if Firebase logout fails
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setCurrentPage('dashboard');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', border: '4px solid #3b82f6', borderTop: '4px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <div style={{ fontSize: '20px', fontWeight: '600', color: '#374151' }}>Loading Hospital Management System...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

    const renderPage = () => {
    const userRole = user?.role || 'admin';
    
    switch (currentPage) {
      case 'dashboard':
        // Return role-specific dashboard
        if (userRole === 'admin') return <AdminDashboard user={user} />;
        if (userRole === 'doctor') return <Dashboard user={user} />;
        if (userRole === 'patient') return <Dashboard user={user} />;
        return <Dashboard user={user} />;
      
      case 'patients':
        // Return role-specific patients page
        if (userRole === 'doctor') return <DoctorPatients user={user} />;
        return <Patients user={user} />;
      
      case 'appointments':
        // Return role-specific appointments page
        if (userRole === 'patient') return <PatientAppointments user={user} />;
        return <Appointments user={user} />;
      
      case 'doctors':
        return <Doctors user={user} />;
      
      case 'analytics':
        return <Analytics user={user} />;
      
      case 'settings':
        return <Settings user={user} onLogout={handleLogout} />;
      
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <Layout 
      user={user} 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage} 
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;
