import React, { useState } from 'react';
import { FiUser, FiShield, FiActivity, FiLogOut, FiChevronDown, FiCheck } from 'react-icons/fi';

const RoleSwitcher = ({ user, currentRole, onRoleSwitch, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [switchingRole, setSwitchingRole] = useState(false);

  const availableRoles = [
    {
      id: 'admin',
      name: 'Administrator',
      icon: FiShield,
      description: 'Full system access and management',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      id: 'doctor',
      name: 'Doctor',
      icon: FiUser,
      description: 'Medical professional access',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      id: 'patient',
      name: 'Patient',
      icon: FiActivity,
      description: 'Personal health records',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    }
  ];

  const currentRoleData = availableRoles.find(role => role.id === currentRole) || availableRoles[0];
  const CurrentIcon = currentRoleData.icon;

  const handleRoleSwitch = async (newRole) => {
    if (newRole === currentRole) {
      setIsOpen(false);
      return;
    }

    setSwitchingRole(true);
    
    try {
      // Simulate role switching API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onRoleSwitch(newRole);
      setIsOpen(false);
    } catch (error) {
      console.error('Error switching role:', error);
    } finally {
      setSwitchingRole(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <div className="relative">
      {/* Role Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
      >
        <div className={`w-8 h-8 bg-gradient-to-r ${currentRoleData.color} rounded-full flex items-center justify-center`}>
          <CurrentIcon className="w-4 h-4 text-white" />
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-gray-900">{currentRoleData.name}</p>
          <p className="text-xs text-gray-500">Switch Role</p>
        </div>
        <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FiUser className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">{user?.username || 'User'}</p>
                  <p className="text-sm text-indigo-100">Currently: {currentRoleData.name}</p>
                </div>
              </div>
            </div>

            {/* Role Options */}
            <div className="p-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
                Switch Role
              </p>
              
              {availableRoles.map((role) => {
                const RoleIcon = role.icon;
                const isActive = role.id === currentRole;
                
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSwitch(role.id)}
                    disabled={switchingRole}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                      isActive
                        ? `${role.bgColor} ${role.textColor} border-2 border-transparent`
                        : 'hover:bg-gray-50 text-gray-700 border-2 border-transparent'
                    }`}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r ${role.color} rounded-full flex items-center justify-center`}>
                      <RoleIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{role.name}</p>
                        {isActive && (
                          <FiCheck className="w-4 h-4" />
                        )}
                      </div>
                      <p className="text-xs opacity-75">{role.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Logout Button */}
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <FiLogOut className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">Logout</p>
                  <p className="text-xs opacity-75">Sign out of your account</p>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Last login: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Loading Overlay */}
      {switchingRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-900 font-medium">Switching role...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSwitcher;
