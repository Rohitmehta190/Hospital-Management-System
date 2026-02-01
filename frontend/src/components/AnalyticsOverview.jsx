import React from 'react';
import { FiTrendingUp, FiUsers, FiCalendar, FiActivity, FiDollarSign, FiClock, FiAward, FiTarget } from 'react-icons/fi';

const AnalyticsOverview = ({ patients, doctors, appointments }) => {
  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const thisYear = new Date(today.getFullYear(), 0, 1);

  // Calculate metrics
  const totalPatients = patients.length;
  const totalDoctors = doctors.length;
  const totalAppointments = appointments.length;
  
  const thisMonthAppointments = appointments.filter(apt => 
    new Date(apt.appointment_date) >= thisMonth
  ).length;
  
  const lastMonthAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.appointment_date);
    return aptDate >= lastMonth && aptDate < thisMonth;
  }).length;

  const completedAppointments = appointments.filter(apt => apt.status === 'completed').length;
  const completionRate = totalAppointments > 0 ? ((completedAppointments / totalAppointments) * 100).toFixed(1) : 0;

  const revenue = completedAppointments * 150; // Assuming $150 per appointment
  const thisMonthRevenue = appointments.filter(apt => 
    apt.status === 'completed' && new Date(apt.appointment_date) >= thisMonth
  ).length * 150;

  const avgAppointmentsPerDay = thisMonthAppointments / today.getDate();
  const patientGrowth = totalPatients > 0 ? ((totalPatients / Math.max(totalPatients - 5, 1)) * 100).toFixed(1) : 0;

  const metrics = [
    {
      title: 'Total Patients',
      value: totalPatients,
      change: '+12.5%',
      trend: 'up',
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Doctors',
      value: totalDoctors,
      change: '+8.2%',
      trend: 'up',
      icon: FiAward,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Appointments',
      value: totalAppointments,
      change: '+15.3%',
      trend: 'up',
      icon: FiCalendar,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      change: '+5.1%',
      trend: 'up',
      icon: FiTarget,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      title: 'Monthly Revenue',
      value: `$${thisMonthRevenue.toLocaleString()}`,
      change: '+18.7%',
      trend: 'up',
      icon: FiDollarSign,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Avg Daily Appointments',
      value: avgAppointmentsPerDay.toFixed(1),
      change: '+3.2%',
      trend: 'up',
      icon: FiActivity,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <FiTrendingUp className={`w-4 h-4 mr-1 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`w-14 h-14 ${metric.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 ${metric.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <h3 className="text-2xl font-bold mb-6">Key Insights & Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
              <FiUsers className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold">{totalPatients}</p>
            <p className="text-indigo-100">Active Patients</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
              <FiClock className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold">{avgAppointmentsPerDay.toFixed(1)}</p>
            <p className="text-indigo-100">Daily Avg</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
              <FiTarget className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold">{completionRate}%</p>
            <p className="text-indigo-100">Success Rate</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
              <FiDollarSign className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold">${thisMonthRevenue.toLocaleString()}</p>
            <p className="text-indigo-100">Monthly Revenue</p>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiCalendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">This Month</p>
                  <p className="text-xs text-gray-500">Appointments</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{thisMonthAppointments}</p>
                <p className="text-xs text-green-600">+15.3%</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FiTarget className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Completed</p>
                  <p className="text-xs text-gray-500">This Month</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  {appointments.filter(apt => 
                    apt.status === 'completed' && new Date(apt.appointment_date) >= thisMonth
                  ).length}
                </p>
                <p className="text-xs text-green-600">+8.7%</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FiUsers className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New Patients</p>
                  <p className="text-xs text-gray-500">This Month</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{Math.floor(totalPatients * 0.3)}</p>
                <p className="text-xs text-green-600">+22.1%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Department Performance</h3>
          <div className="space-y-3">
            {[
              { name: 'Cardiology', appointments: 45, completion: 92, color: 'bg-red-500' },
              { name: 'General Medicine', appointments: 78, completion: 88, color: 'bg-blue-500' },
              { name: 'Pediatrics', appointments: 32, completion: 95, color: 'bg-green-500' },
              { name: 'Orthopedics', appointments: 28, completion: 90, color: 'bg-purple-500' },
              { name: 'Emergency', appointments: 56, completion: 85, color: 'bg-yellow-500' }
            ].map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${dept.color} rounded-full`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{dept.name}</p>
                    <p className="text-xs text-gray-500">{dept.appointments} appointments</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{dept.completion}%</p>
                  <p className="text-xs text-gray-500">completion</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
