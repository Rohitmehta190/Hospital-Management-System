import React, { useState, useEffect } from 'react';
import { FiUsers, FiCalendar, FiActivity, FiTrendingUp, FiAlertCircle, FiDatabase, FiServer, FiHardDrive, FiWifi, FiCpu, FiCheckCircle, FiPlus, FiDownload, FiSettings, FiUserPlus, FiRefreshCw, FiFileText, FiShield, FiClock } from 'react-icons/fi';

const AdminDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    systemHealth: 95,
    activeUsers: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [systemPerformance, setSystemPerformance] = useState({
    cpu: 45,
    memory: 62,
    storage: 78,
    network: 89
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Button handlers
  const handleAddUser = () => {
    setModalType('addUser');
    setShowModal(true);
  };

  const handleSystemBackup = async () => {
    setLoading(true);
    try {
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('System backup completed successfully!');
      setRecentActivities(prev => [
        { id: Date.now(), type: 'system', message: 'System backup completed successfully', time: 'Just now', icon: FiCheckCircle, color: 'text-emerald-600' },
        ...prev.slice(0, 3)
      ]);
    } catch (error) {
      alert('Backup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReports = () => {
    setModalType('generateReports');
    setShowModal(true);
  };

  const handleSystemSettings = () => {
    setModalType('systemSettings');
    setShowModal(true);
  };

  const handleRefreshData = async () => {
    setLoading(true);
    try {
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats(prev => ({
        ...prev,
        totalPatients: prev.totalPatients + Math.floor(Math.random() * 5),
        totalAppointments: prev.totalAppointments + Math.floor(Math.random() * 10),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3)
      }));
      setRecentActivities(prev => [
        { id: Date.now(), type: 'system', message: 'Dashboard data refreshed', time: 'Just now', icon: FiRefreshCw, color: 'text-blue-600' },
        ...prev.slice(0, 3)
      ]);
    } catch (error) {
      alert('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };

  const handleViewUsers = () => {
    alert('Navigating to user management...');
  };

  const handleViewAppointments = () => {
    alert('Navigating to appointments...');
  };

  const handleViewDoctors = () => {
    alert('Navigating to doctors...');
  };

  const handleViewAnalytics = () => {
    alert('Navigating to analytics...');
  };

  const handleSystemAlert = (alertId) => {
    setSystemAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const renderModal = () => {
    if (!showModal) return null;

    const modalContent = {
      addUser: (
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Add New User</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option value="">Select Role</option>
              <option value="admin">Administrator</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
            <div className="flex space-x-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg">Cancel</button>
              <button onClick={() => { setShowModal(false); alert('User added successfully!'); }} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">Add User</button>
            </div>
          </div>
        </div>
      ),
      generateReports: (
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Generate Reports</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Patient Reports</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Financial Reports</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>System Performance Reports</span>
              </label>
            </div>
            <div className="flex space-x-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg">Cancel</button>
              <button onClick={() => { setShowModal(false); alert('Reports generated successfully!'); }} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg">Generate</button>
            </div>
          </div>
        </div>
      ),
      systemSettings: (
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">System Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">System Name</label>
              <input type="text" defaultValue="Hospital Management System" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Notifications</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg">Cancel</button>
              <button onClick={() => { setShowModal(false); alert('Settings saved successfully!'); }} className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg">Save Settings</button>
            </div>
          </div>
        </div>
      )
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
          {modalContent[modalType]}
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Simulate data fetching
    setStats({
      totalPatients: 1247,
      totalDoctors: 45,
      totalAppointments: 3847,
      totalRevenue: 284750,
      systemHealth: 95,
      activeUsers: 127
    });

    setRecentActivities([
      { id: 1, type: 'user', message: 'New doctor registered: Dr. Ashok Reddy', time: '2 minutes ago', icon: FiUser, color: 'text-blue-600' },
      { id: 2, type: 'appointment', message: 'Emergency appointment scheduled for Rahul Sharma', time: '5 minutes ago', icon: FiCalendar, color: 'text-green-600' },
      { id: 3, type: 'alert', message: 'System backup completed successfully', time: '15 minutes ago', icon: FiCheckCircle, color: 'text-emerald-600' },
      { id: 4, type: 'system', message: 'Database optimization in progress', time: '1 hour ago', icon: FiDatabase, color: 'text-purple-600' }
    ]);

    setSystemAlerts([
      { id: 1, level: 'warning', message: 'Server memory usage at 78%', time: '10 minutes ago' },
      { id: 2, level: 'info', message: 'New system update available', time: '2 hours ago' }
    ]);
  }, []);

  const quickActions = [
    { id: 1, title: 'Add New User', icon: FiUser, color: 'from-blue-500 to-blue-600', description: 'Register new staff member', onClick: handleAddUser },
    { id: 2, title: 'System Backup', icon: FiDatabase, color: 'from-green-500 to-green-600', description: 'Create system backup', onClick: handleSystemBackup },
    { id: 3, title: 'Generate Reports', icon: FiFileText, color: 'from-purple-500 to-purple-600', description: 'View analytics reports', onClick: handleGenerateReports },
    { id: 4, title: 'System Settings', icon: FiSettings, color: 'from-orange-500 to-orange-600', description: 'Configure system', onClick: handleSystemSettings }
  ];

  const systemMetrics = [
    { label: 'CPU Usage', value: 45, max: 100, color: 'bg-blue-500' },
    { label: 'Memory', value: 78, max: 100, color: 'bg-yellow-500' },
    { label: 'Storage', value: 62, max: 100, color: 'bg-green-500' },
    { label: 'Network', value: 34, max: 100, color: 'bg-purple-500' }
  ];

  return (
    <>
      <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-purple-100 text-lg">System Overview & Management</p>
            <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FiUsers className="w-5 h-5" />
                <span className="text-sm">{stats.totalPatients.toLocaleString()} Patients</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiUser className="w-5 h-5" />
                <span className="text-sm">{stats.totalDoctors} Doctors</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCalendar className="w-5 h-5" />
                <span className="text-sm">{stats.totalAppointments.toLocaleString()} Appointments</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <FiSettings className="w-12 h-12 text-white" />
            </div>
          </div>
          <button
            onClick={handleRefreshData}
            disabled={loading}
            className="ml-4 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors disabled:opacity-50"
            title="Refresh Data"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FiRefreshCw className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 cursor-pointer" onClick={handleViewUsers}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalPatients.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Total Patients</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 cursor-pointer" onClick={handleViewDoctors}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiUser className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+8%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</h3>
          <p className="text-sm text-gray-600">Total Doctors</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500 cursor-pointer" onClick={handleViewAppointments}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+15%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalAppointments.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Appointments</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500 cursor-pointer" onClick={handleViewAnalytics}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FiDollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+22%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${(stats.totalRevenue / 1000).toFixed(1)}k</h3>
          <p className="text-sm text-gray-600">Revenue</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <FiActivity className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Excellent</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.systemHealth}%</h3>
          <p className="text-sm text-gray-600">System Health</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+5%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.activeUsers}</h3>
          <p className="text-sm text-gray-600">Active Users</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <FiSettings className="w-5 h-5 mr-2 text-purple-600" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={action.onClick}
                    disabled={loading && action.id === 2}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r ${action.color} text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50`}
                  >
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{action.title}</p>
                      <p className="text-xs opacity-90">{action.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* System Performance */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <FiActivity className="w-5 h-5 mr-2 text-green-600" />
              System Performance
            </h3>
            <div className="space-y-4">
              {systemMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                    <span className="text-sm text-gray-600">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${metric.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <FiClock className="w-5 h-5 mr-2 text-blue-600" />
              Recent Activities
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.color} bg-opacity-10`}>
                      <Icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <FiAlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
          System Alerts
        </h3>
        <div className="space-y-3">
          {systemAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  alert.level === 'warning'
                    ? 'bg-yellow-500'
                    : 'bg-blue-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
              <button
                onClick={() => handleSystemAlert(alert.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>

      {/* Modal */}
      {renderModal()}
    </>
  );
};

export default AdminDashboard;
