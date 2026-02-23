import React, { useState } from 'react';
import SettingsProfile from '../components/SettingsProfile';
import SettingsSecurity from '../components/SettingsSecurity';
import SettingsPreferences from '../components/SettingsPreferences';
import SettingsSystem from '../components/SettingsSystem';
import { FiUser, FiShield, FiSliders, FiDatabase, FiLogOut } from 'react-icons/fi';

const Settings = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleUserUpdate = (userData) => {
    setUpdatedUser(userData);
    // Update localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const settingsTabs = [
    {
      id: 'profile',
      name: 'Profile',
      icon: FiUser,
      description: 'Manage your personal information',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'security',
      name: 'Security',
      icon: FiShield,
      description: 'Password and authentication settings',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'preferences',
      name: 'Preferences',
      icon: FiSliders,
      description: 'Customize your experience',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'system',
      name: 'System',
      icon: FiDatabase,
      description: 'Backup and system management',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      onLogout();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-indigo-100 text-lg">Manage your account and system preferences</p>
            <div className="mt-4 flex items-center space-x-6">
              <div>
                <p className="text-indigo-200 text-sm">User</p>
                <p className="text-xl font-semibold">{updatedUser?.username || 'Admin User'}</p>
              </div>
              <div>
                <p className="text-indigo-200 text-sm">Role</p>
                <p className="text-xl font-semibold capitalize">{updatedUser?.role || 'Administrator'}</p>
              </div>
              <div>
                <p className="text-indigo-200 text-sm">Status</p>
                <p className="text-xl font-semibold">Active</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <FiSliders className="w-20 h-20 text-indigo-200 opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <nav className="space-y-2">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${tab.color} flex items-center justify-center mr-3`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{tab.name}</p>
                      <p className="text-xs text-gray-500">{tab.description}</p>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
              >
                <FiLogOut className="w-4 h-4 mr-3" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <SettingsProfile user={updatedUser} onUpdate={handleUserUpdate} />
          )}
          
          {activeTab === 'security' && (
            <SettingsSecurity user={updatedUser} />
          )}
          
          {activeTab === 'preferences' && (
            <SettingsPreferences user={updatedUser} />
          )}
          
          {activeTab === 'system' && (
            <SettingsSystem user={updatedUser} />
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Profile Completion</p>
              <p className="text-2xl font-bold text-blue-900">85%</p>
            </div>
            <FiUser className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Security Score</p>
              <p className="text-2xl font-bold text-green-900">92%</p>
            </div>
            <FiShield className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Preferences Set</p>
              <p className="text-2xl font-bold text-purple-900">12/15</p>
            </div>
            <FiSliders className="w-8 h-8 text-purple-500 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Last Backup</p>
              <p className="text-2xl font-bold text-orange-900">2d</p>
            </div>
            <FiDatabase className="w-8 h-8 text-orange-500 opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
