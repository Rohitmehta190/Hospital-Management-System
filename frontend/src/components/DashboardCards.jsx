import React from 'react';
import { FiUsers, FiUser, FiCalendar, FiActivity, FiTrendingUp, FiClock } from 'react-icons/fi';

const DashboardCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+12%',
      trendColor: 'text-green-600'
    },
    {
      title: 'Total Doctors',
      value: stats.totalDoctors,
      icon: FiUser,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      trend: '+5%',
      trendColor: 'text-green-600'
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      icon: FiCalendar,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      trend: '+8%',
      trendColor: 'text-green-600'
    },
    {
      title: 'Pending Appointments',
      value: stats.pendingAppointments,
      icon: FiClock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      trend: '-3%',
      trendColor: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 ${card.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`} />
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${card.trendColor} flex items-center justify-end`}>
                    <FiTrendingUp className="w-4 h-4 mr-1" />
                    {card.trend}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
                <p className="text-sm text-gray-600 mt-1">{card.title}</p>
              </div>
            </div>
            <div className={`h-1 bg-gradient-to-r ${card.color}`}></div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCards;
