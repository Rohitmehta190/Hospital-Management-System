import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import { api } from './services/api';
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
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'patients':
        return <Patients user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Hospital Management System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentPage('patients')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'patients' ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              >
                Patients
              </button>
              <button
                onClick={() => setCurrentPage('doctors')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'doctors' ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              >
                Doctors
              </button>
              <button
                onClick={() => setCurrentPage('appointments')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'appointments' ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              >
                Appointments
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Welcome, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
