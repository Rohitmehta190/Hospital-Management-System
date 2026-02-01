import React, { useState, useEffect } from 'react';
import api from '../services/api';
import DashboardCards from '../components/DashboardCards';
import AppointmentTable from '../components/AppointmentTable';
import { AppointmentChart, PatientGrowthChart, DepartmentStats } from '../components/Charts';
import { FiActivity, FiTrendingUp, FiUsers, FiCalendar } from 'react-icons/fi';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    todayAppointments: 0,
    pendingAppointments: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [patientsResponse, doctorsResponse, appointmentsResponse] = await Promise.all([
        api.get('/patients'),
        api.get('/doctors'),
        api.get('/appointments')
      ]);

      const patients = patientsResponse.data;
      const doctors = doctorsResponse.data;
      const appointments = appointmentsResponse.data;

      const today = new Date().toISOString().split('T')[0];
      const todayAppointments = appointments.filter(apt => 
        apt.appointment_date.startsWith(today)
      );
      const pendingAppointments = appointments.filter(apt => 
        apt.status === 'scheduled'
      );

      setStats({
        totalPatients: patients.length,
        totalDoctors: doctors.length,
        todayAppointments: todayAppointments.length,
        pendingAppointments: pendingAppointments.length
      });

      // Get recent appointments with priority
      const recent = appointments
        .sort((a, b) => new Date(b.appointment_date) - new Date(a.appointment_date))
        .slice(0, 8)
        .map(apt => ({
          ...apt,
          priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
        }));
      setRecentAppointments(recent);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg font-semibold text-gray-700">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.username}!</h1>
            <p className="text-blue-100">Here's what's happening at your hospital today.</p>
          </div>
          <div className="hidden md:block">
            <FiActivity className="w-16 h-16 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardCards stats={stats} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AppointmentChart data={stats} />
        <PatientGrowthChart />
        <DepartmentStats />
      </div>

      {/* Recent Appointments */}
      <AppointmentTable appointments={recentAppointments} />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <FiUsers className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Add Patient</h3>
          <p className="text-sm text-gray-500 mt-1">Register new patient</p>
        </button>

        <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <FiCalendar className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Schedule</h3>
          <p className="text-sm text-gray-500 mt-1">Book appointment</p>
        </button>

        <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <FiTrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Reports</h3>
          <p className="text-sm text-gray-500 mt-1">View analytics</p>
        </button>

        <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <FiActivity className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Activity</h3>
          <p className="text-sm text-gray-500 mt-1">Recent actions</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
