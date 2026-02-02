import React, { useState, useEffect } from 'react';
import { FiUsers, FiUser, FiCalendar, FiActivity, FiTrendingUp, FiDollarSign, FiAlertTriangle, FiCheckCircle, FiClock, FiBarChart2, FiSettings, FiDatabase, FiShield, FiGlobe } from 'react-icons/fi';

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
      { id: 1, type: 'user', message: 'New doctor registered: Dr. Sarah Johnson', time: '2 minutes ago', icon: FiUser, color: 'text-blue-600' },
      { id: 2, type: 'appointment', message: 'Emergency appointment scheduled', time: '5 minutes ago', icon: FiCalendar, color: 'text-green-600' },
      { id: 3, type: 'alert', message: 'System backup completed successfully', time: '15 minutes ago', icon: FiCheckCircle, color: 'text-emerald-600' },
      { id: 4, type: 'system', message: 'Database optimization in progress', time: '1 hour ago', icon: FiDatabase, color: 'text-purple-600' }
    ]);

    setSystemAlerts([
      { id: 1, level: 'warning', message: 'Server memory usage at 78%', time: '10 minutes ago' },
      { id: 2, level: 'info', message: 'New system update available', time: '2 hours ago' }
    ]);
  }, []);

  const quickActions = [
    { id: 1, title: 'Add New User', icon: FiUser, color: 'from-blue-500 to-blue-600', description: 'Register new staff member' },
    { id: 2, title: 'System Backup', icon: FiDatabase, color: 'from-green-500 to-green-600', description: 'Create system backup' },
    { id: 3, title: 'Generate Reports', icon: FiBarChart2, color: 'from-purple-500 to-purple-600', description: 'View analytics reports' },
    { id: 4, title: 'System Settings', icon: FiSettings, color: 'from-orange-500 to-orange-600', description: 'Configure system' }
  ];

  const systemMetrics = [
    { label: 'CPU Usage', value: 45, max: 100, color: 'bg-blue-500' },
    { label: 'Memory', value: 78, max: 100, color: 'bg-yellow-500' },
    { label: 'Storage', value: 62, max: 100, color: 'bg-green-500' },
    { label: 'Network', value: 34, max: 100, color: 'bg-purple-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">Administrator Dashboard</h1>
            <p className="text-purple-100 text-lg">System Overview & Management</p>
            <div className="mt-6 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FiShield className="w-5 h-5" />
                <span className="text-sm">Admin Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiGlobe className="w-5 h-5" />
                <span className="text-sm">System Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="w-5 h-5" />
                <span className="text-sm">All Systems Operational</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <FiSettings className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalPatients.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Total Patients</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiUser className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+8%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</h3>
          <p className="text-sm text-gray-600">Total Doctors</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+15%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalAppointments.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Appointments</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500">
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
            <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">95%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.systemHealth}%</h3>
          <p className="text-sm text-gray-600">System Health</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FiGlobe className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Online</span>
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
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r ${action.color} text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
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
      {systemAlerts.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <FiAlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
            System Alerts
          </h3>
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.level === 'warning'
                    ? 'bg-yellow-50 border-yellow-400'
                    : 'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
