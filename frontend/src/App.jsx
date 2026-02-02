import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import DoctorPatients from './pages/DoctorPatients';
import PatientAppointments from './pages/PatientAppointments';
import Layout from './components/Layout';
import api from './services/api';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentPage('dashboard');
  };

    const renderPage = () => {
    const userRole = user?.role || 'admin';
    
    switch (currentPage) {
      case 'dashboard':
        // Return role-specific dashboard
        if (userRole === 'admin') return <AdminDashboard user={user} />;
        if (userRole === 'doctor') return <DoctorDashboard user={user} />;
        if (userRole === 'patient') return <PatientDashboard user={user} />;
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading Hospital Management System...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

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
