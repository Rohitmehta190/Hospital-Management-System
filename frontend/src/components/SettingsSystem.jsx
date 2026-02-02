import React, { useState } from 'react';
import { FiDatabase, FiDownload, FiUpload, FiTrash2, FiSettings, FiHardDrive, FiWifi, FiShield } from 'react-icons/fi';

const SettingsSystem = ({ user }) => {
  const [activeTab, setActiveTab] = useState('backup');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const storageInfo = {
    used: 2.3,
    total: 10,
    patients: 450,
    appointments: 1250,
    doctors: 25
  };

  const systemInfo = {
    version: '2.1.0',
    lastBackup: '2024-01-15 14:30:00',
    uptime: '15 days, 8 hours',
    database: 'SQLite v3.39.0',
    server: 'Flask v2.3.0'
  };

  const handleBackup = async (type) => {
    setLoading(true);
    setMessage('');
    
    try {
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage(`${type === 'full' ? 'Full' : 'Partial'} backup completed successfully!`);
      setMessageType('success');
      
      // Simulate download
      if (type === 'full') {
        const data = {
          timestamp: new Date().toISOString(),
          type: 'full_backup',
          data: {
            patients: storageInfo.patients,
            appointments: storageInfo.appointments,
            doctors: storageInfo.doctors
          }
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hospital-backup-${Date.now()}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      setMessage('Backup failed. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setMessage('');
    
    try {
      // Simulate restore process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage('Data restored successfully! System will restart.');
      setMessageType('success');
    } catch (error) {
      setMessage('Restore failed. Please check the backup file.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Cache cleared successfully!');
      setMessageType('success');
    } catch (error) {
      setMessage('Failed to clear cache.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async (type) => {
    setLoading(true);
    setMessage('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate data export
      const data = {
        exportType: type,
        timestamp: new Date().toISOString(),
        data: `Sample ${type} data...`
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-export-${Date.now()}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      setMessage(`${type} data exported successfully!`);
      setMessageType('success');
    } catch (error) {
      setMessage(`Failed to export ${type} data.`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <FiSettings className="w-5 h-5 mr-2 text-indigo-600" />
          System Settings
        </h3>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('backup')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'backup'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FiDatabase className="w-4 h-4 inline mr-2" />
            Backup & Restore
          </button>
          <button
            onClick={() => setActiveTab('storage')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'storage'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FiHardDrive className="w-4 h-4 inline mr-2" />
            Storage
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'system'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FiWifi className="w-4 h-4 inline mr-2" />
            System Info
          </button>
        </nav>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center ${
          messageType === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {messageType === 'success' ? (
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          {message}
        </div>
      )}

      {/* Backup & Restore Tab */}
      {activeTab === 'backup' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Backup Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <FiDownload className="w-5 h-5 mr-2" />
                Backup Data
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    Create a backup of your hospital data for safekeeping.
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleBackup('full')}
                      disabled={loading}
                      className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                      <FiDownload className="w-4 h-4 mr-2" />
                      {loading ? 'Creating Backup...' : 'Full Backup'}
                    </button>
                    <button
                      onClick={() => handleBackup('partial')}
                      disabled={loading}
                      className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                      <FiDownload className="w-4 h-4 mr-2" />
                      Partial Backup
                    </button>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Last Backup:</strong> {systemInfo.lastBackup}
                  </p>
                </div>
              </div>
            </div>

            {/* Restore Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <FiUpload className="w-5 h-5 mr-2" />
                Restore Data
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    Restore your hospital data from a previous backup.
                  </p>
                  <label className="block">
                    <input
                      type="file"
                      accept=".json,.backup"
                      onChange={handleRestore}
                      disabled={loading}
                      className="hidden"
                    />
                    <div className="w-full flex items-center justify-center px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 cursor-pointer transition-colors">
                      <div className="text-center">
                        <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {loading ? 'Restoring...' : 'Click to upload backup file'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">JSON or BACKUP files</p>
                      </div>
                    </div>
                  </label>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Warning:</strong> Restoring will overwrite current data.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Export */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Export Data</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['patients', 'appointments', 'doctors'].map((type) => (
                <button
                  key={type}
                  onClick={() => handleExportData(type)}
                  disabled={loading}
                  className="flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <FiDownload className="w-4 h-4 mr-2" />
                  Export {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Storage Tab */}
      {activeTab === 'storage' && (
        <div className="space-y-6">
          {/* Storage Overview */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Storage Overview</h4>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Used: {storageInfo.used} GB</span>
                <span>Total: {storageInfo.total} GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full"
                  style={{ width: `${(storageInfo.used / storageInfo.total) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">{storageInfo.patients}</p>
                <p className="text-sm text-gray-600">Patients</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">{storageInfo.appointments}</p>
                <p className="text-sm text-gray-600">Appointments</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">{storageInfo.doctors}</p>
                <p className="text-sm text-gray-600">Doctors</p>
              </div>
            </div>
          </div>

          {/* Storage Actions */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Storage Management</h4>
            <div className="space-y-4">
              <button
                onClick={handleClearCache}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
              >
                <FiTrash2 className="w-4 h-4 mr-2" />
                {loading ? 'Clearing...' : 'Clear Cache'}
              </button>
              
              <div className="text-sm text-gray-600">
                <p>• Clear cache to free up temporary storage space</p>
                <p>• Old backups are automatically deleted after 30 days</p>
                <p>• Compress old records to save space</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Info Tab */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <FiWifi className="w-5 h-5 mr-2" />
              System Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Version</span>
                  <span className="text-sm font-medium text-gray-900">{systemInfo.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="text-sm font-medium text-gray-900">{systemInfo.database}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Server</span>
                  <span className="text-sm font-medium text-gray-900">{systemInfo.server}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Backup</span>
                  <span className="text-sm font-medium text-gray-900">{systemInfo.lastBackup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className="text-sm font-medium text-gray-900">{systemInfo.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="text-sm font-medium text-green-600">● Online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-5 h-5 mr-2" />
              Security Status
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-sm text-green-800">SSL Certificate</span>
                <span className="text-sm font-medium text-green-900">Valid</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-sm text-green-800">Database Encryption</span>
                <span className="text-sm font-medium text-green-900">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-sm text-green-800">Firewall</span>
                <span className="text-sm font-medium text-green-900">Active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsSystem;
