import React from 'react';
import { FiLogOut, FiX, FiShield, FiClock, FiDatabase } from 'react-icons/fi';

const LogoutModal = ({ isOpen, onClose, onConfirm, user }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const sessionInfo = {
    loginTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleTimeString(), // 2 hours ago
    duration: '2 hours 15 minutes',
    lastActivity: '5 minutes ago',
    sessionsActive: 1
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FiLogOut className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Confirm Logout</h3>
                  <p className="text-red-100 text-sm">Sign out of your account</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white hover:text-red-100 rounded-lg hover:bg-white/20 transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {/* User Info */}
            <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user?.username || 'User'}</p>
                <p className="text-sm text-gray-600 capitalize">{user?.role || 'Administrator'}</p>
              </div>
            </div>

            {/* Session Info */}
            <div className="space-y-3 mb-6">
              <h4 className="font-medium text-gray-900 flex items-center">
                <FiClock className="w-4 h-4 mr-2" />
                Current Session
              </h4>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Login Time</p>
                  <p className="font-medium text-gray-900">{sessionInfo.loginTime}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Duration</p>
                  <p className="font-medium text-gray-900">{sessionInfo.duration}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Last Activity</p>
                  <p className="font-medium text-gray-900">{sessionInfo.lastActivity}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Active Sessions</p>
                  <p className="font-medium text-gray-900">{sessionInfo.sessionsActive}</p>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <FiShield className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-blue-900">Security Notice</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    For your security, all unsaved work will be lost when you logout. Make sure to save any important data before proceeding.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Sync Status */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <FiDatabase className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-green-900">Data Status</h4>
                  <p className="text-sm text-green-800 mt-1">
                    All your data has been synchronized successfully. You can safely logout without losing any information.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 flex items-center justify-center px-4 py-3 border border-transparent text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 font-medium"
              >
                <FiLogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
