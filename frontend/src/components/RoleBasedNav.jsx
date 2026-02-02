import React from 'react';
import { FiHome, FiUsers, FiUser, FiCalendar, FiActivity, FiSettings, FiFileText, FiClock, FiTrendingUp } from 'react-icons/fi';

const RoleBasedNav = ({ currentRole, currentPage, setCurrentPage }) => {
  // Define menu items for different roles
  const roleMenus = {
    admin: [
      { id: 'dashboard', label: 'Dashboard', icon: FiHome, description: 'System overview' },
      { id: 'patients', label: 'Patients', icon: FiUsers, description: 'Patient management' },
      { id: 'doctors', label: 'Doctors', icon: FiUser, description: 'Doctor management' },
      { id: 'appointments', label: 'Appointments', icon: FiCalendar, description: 'Appointment scheduling' },
      { id: 'analytics', label: 'Analytics', icon: FiActivity, description: 'Reports & insights' },
      { id: 'settings', label: 'Settings', icon: FiSettings, description: 'System configuration' }
    ],
    doctor: [
      { id: 'dashboard', label: 'Dashboard', icon: FiHome, description: 'My overview' },
      { id: 'patients', label: 'My Patients', icon: FiUsers, description: 'Patient records' },
      { id: 'appointments', label: 'Schedule', icon: FiCalendar, description: 'My appointments' },
      { id: 'analytics', label: 'Performance', icon: FiTrendingUp, description: 'My statistics' }
    ],
    patient: [
      { id: 'dashboard', label: 'Dashboard', icon: FiHome, description: 'My health' },
      { id: 'appointments', label: 'Appointments', icon: FiCalendar, description: 'My appointments' },
      { id: 'patients', label: 'Medical Records', icon: FiFileText, description: 'My records' },
      { id: 'settings', label: 'Profile', icon: FiSettings, description: 'My settings' }
    ]
  };

  const menuItems = roleMenus[currentRole] || roleMenus.admin;

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'from-purple-500 to-purple-600';
      case 'doctor': return 'from-blue-500 to-blue-600';
      case 'patient': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRoleBgColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'doctor': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'patient': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div>
      {/* Role Badge */}
      <div className={`px-4 py-3 mb-4 rounded-lg border-2 ${getRoleBgColor(currentRole)}`}>
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 bg-gradient-to-r ${getRoleColor(currentRole)} rounded-full flex items-center justify-center`}>
            <FiUser className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold capitalize">{currentRole} View</p>
            <p className="text-xs opacity-75">
              {currentRole === 'admin' && 'Full system access'}
              {currentRole === 'doctor' && 'Medical professional access'}
              {currentRole === 'patient' && 'Personal health access'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? `${getRoleBgColor(currentRole)} border-l-4`
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? '' : 'text-gray-400'}`} />
              <div className="flex-1 text-left">
                <p className="font-medium">{item.label}</p>
                <p className={`text-xs ${isActive ? 'opacity-75' : 'text-gray-500'}`}>
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="px-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </p>
          
          {currentRole === 'admin' && (
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
                <FiUsers className="w-4 h-4" />
                <span>Add New User</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                <FiCalendar className="w-4 h-4" />
                <span>Schedule Appointment</span>
              </button>
            </div>
          )}

          {currentRole === 'doctor' && (
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                <FiCalendar className="w-4 h-4" />
                <span>Quick Schedule</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                <FiFileText className="w-4 h-4" />
                <span>New Prescription</span>
              </button>
            </div>
          )}

          {currentRole === 'patient' && (
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                <FiCalendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                <FiFileText className="w-4 h-4" />
                <span>View Records</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Role-specific Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <FiClock className="w-4 h-4 text-gray-500" />
          <p className="text-sm font-medium text-gray-700">Session Info</p>
        </div>
        <div className="space-y-1 text-xs text-gray-600">
          <p>Role: <span className="font-medium capitalize">{currentRole}</span></p>
          <p>Access: <span className="font-medium">Level {currentRole === 'admin' ? '3' : currentRole === 'doctor' ? '2' : '1'}</span></p>
          <p>Permissions: <span className="font-medium">{currentRole === 'admin' ? 'Full' : currentRole === 'doctor' ? 'Medical' : 'Personal'}</span></p>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedNav;
