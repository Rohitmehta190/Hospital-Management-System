import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AnalyticsOverview from '../components/AnalyticsOverview';
import AnalyticsCharts from '../components/AnalyticsCharts';
import AnalyticsReports from '../components/AnalyticsReports';
import { FiBarChart2, FiTrendingUp, FiFileText, FiDownload, FiFilter, FiCalendar } from 'react-icons/fi';

const Analytics = ({ user }) => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [patientsResponse, doctorsResponse, appointmentsResponse] = await Promise.all([
        api.get('/patients'),
        api.get('/doctors'),
        api.get('/appointments')
      ]);

      setPatients(patientsResponse.data);
      setDoctors(doctorsResponse.data);
      setAppointments(appointmentsResponse.data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setError('Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      id: 'overview',
      name: 'Overview',
      icon: FiBarChart2,
      description: 'Key metrics and performance indicators'
    },
    {
      id: 'charts',
      name: 'Charts & Trends',
      icon: FiTrendingUp,
      description: 'Visual analytics and trend analysis'
    },
    {
      id: 'reports',
      name: 'Reports',
      icon: FiFileText,
      description: 'Generate and export detailed reports'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg font-semibold text-gray-700">Loading analytics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Analytics & Insights</h1>
            <p className="text-indigo-100 text-lg">Comprehensive hospital performance analytics</p>
            <div className="mt-4 flex items-center space-x-6">
              <div>
                <p className="text-indigo-200 text-sm">Total Patients</p>
                <p className="text-xl font-semibold">{patients.length}</p>
              </div>
              <div>
                <p className="text-indigo-200 text-sm">Total Doctors</p>
                <p className="text-xl font-semibold">{doctors.length}</p>
              </div>
              <div>
                <p className="text-indigo-200 text-sm">Total Appointments</p>
                <p className="text-xl font-semibold">{appointments.length}</p>
              </div>
              <div>
                <p className="text-indigo-200 text-sm">Completion Rate</p>
                <p className="text-xl font-semibold">
                  {appointments.length > 0 
                    ? ((appointments.filter(apt => apt.status === 'completed').length / appointments.length) * 100).toFixed(1)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <FiBarChart2 className="w-20 h-20 text-indigo-200 opacity-50" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-2">
        <div className="grid grid-cols-3 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiBarChart2 className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <AnalyticsOverview 
            patients={patients} 
            doctors={doctors} 
            appointments={appointments} 
          />
        )}
        
        {activeTab === 'charts' && (
          <AnalyticsCharts 
            patients={patients} 
            doctors={doctors} 
            appointments={appointments} 
          />
        )}
        
        {activeTab === 'reports' && (
          <AnalyticsReports 
            patients={patients} 
            doctors={doctors} 
            appointments={appointments} 
          />
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-colors">
            <FiDownload className="w-5 h-5 text-blue-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Export Data</p>
              <p className="text-sm text-gray-600">Download analytics data</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:from-green-100 hover:to-green-200 transition-colors">
            <FiCalendar className="w-5 h-5 text-green-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Schedule Report</p>
              <p className="text-sm text-gray-600">Automated report generation</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-colors">
            <FiFilter className="w-5 h-5 text-purple-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Custom Filters</p>
              <p className="text-sm text-gray-600">Advanced data filtering</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
