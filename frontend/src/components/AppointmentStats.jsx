import React from 'react';
import { FiCalendar, FiClock, FiUsers, FiCheckCircle, FiXCircle, FiTrendingUp, FiActivity } from 'react-icons/fi';

const AppointmentStats = ({ appointments }) => {
  const today = new Date().toISOString().split('T')[0];
  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 7);
  const thisMonth = new Date();
  thisMonth.setMonth(thisMonth.getMonth() - 1);

  const todayAppointments = appointments.filter(apt => 
    apt.appointment_date.startsWith(today)
  );

  const weekAppointments = appointments.filter(apt => 
    new Date(apt.appointment_date) >= thisWeek
  );

  const monthAppointments = appointments.filter(apt => 
    new Date(apt.appointment_date) >= thisMonth
  );

  const completedAppointments = appointments.filter(apt => 
    apt.status === 'completed'
  );

  const cancelledAppointments = appointments.filter(apt => 
    apt.status === 'cancelled'
  );

  const scheduledAppointments = appointments.filter(apt => 
    apt.status === 'scheduled'
  );

  const completionRate = appointments.length > 0 
    ? ((completedAppointments.length / appointments.length) * 100).toFixed(1)
    : 0;

  const cancellationRate = appointments.length > 0
    ? ((cancelledAppointments.length / appointments.length) * 100).toFixed(1)
    : 0;

  // Generate daily data for the last 7 days
  const generateDailyData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayAppointments = appointments.filter(apt => 
        apt.appointment_date.startsWith(dateStr)
      );
      
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        total: dayAppointments.length,
        completed: dayAppointments.filter(apt => apt.status === 'completed').length,
        cancelled: dayAppointments.filter(apt => apt.status === 'cancelled').length,
        scheduled: dayAppointments.filter(apt => apt.status === 'scheduled').length
      });
    }
    return data;
  };

  const dailyData = generateDailyData();

  // Generate hourly distribution for today
  const generateHourlyData = () => {
    const hours = [];
    for (let hour = 8; hour <= 18; hour++) {
      const hourAppointments = todayAppointments.filter(apt => {
        const aptHour = new Date(apt.appointment_date).getHours();
        return aptHour === hour;
      });
      
      hours.push({
        hour: `${hour}:00`,
        count: hourAppointments.length
      });
    }
    return hours;
  };

  const hourlyData = generateHourlyData();

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{todayAppointments.length}</p>
              <p className="text-sm text-blue-600 mt-2 flex items-center">
                <FiCalendar className="w-4 h-4 mr-1" />
                Scheduled
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{weekAppointments.length}</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <FiTrendingUp className="w-4 h-4 mr-1" />
                +15% from last week
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{completionRate}%</p>
              <p className="text-sm text-emerald-600 mt-2 flex items-center">
                <FiCheckCircle className="w-4 h-4 mr-1" />
                {completedAppointments.length} completed
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <FiCheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cancellation Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{cancellationRate}%</p>
              <p className="text-sm text-red-600 mt-2 flex items-center">
                <FiXCircle className="w-4 h-4 mr-1" />
                {cancelledAppointments.length} cancelled
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FiXCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Trends */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">7-Day Appointment Trends</h3>
          <div className="space-y-3">
            {dailyData.map((day, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-20 text-xs text-gray-600">{day.date}</div>
                <div className="flex-1 flex items-center space-x-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-blue-500 rounded-full" style={{ width: `${(day.total / Math.max(...dailyData.map(d => d.total))) * 100}%` }}></div>
                    <div className="absolute inset-y-0 left-0 bg-green-500 rounded-full" style={{ width: `${(day.completed / Math.max(...dailyData.map(d => d.total))) * 100}%` }}></div>
                  </div>
                  <span className="text-xs font-semibold text-gray-700 w-8">{day.total}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4 mt-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              <span className="text-gray-600">Total</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span className="text-gray-600">Completed</span>
            </div>
          </div>
        </div>

        {/* Today's Hourly Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Today's Hourly Distribution</h3>
          <div className="space-y-2">
            {hourlyData.map((hour, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-12 text-xs text-gray-600">{hour.hour}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${hour.count > 0 ? (hour.count / Math.max(...hourlyData.map(h => h.count))) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-gray-700 w-6">{hour.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Appointment Status Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-8 border-blue-100"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{scheduledAppointments.length}</p>
                  <p className="text-xs text-gray-600">Scheduled</p>
                </div>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {appointments.length > 0 ? ((scheduledAppointments.length / appointments.length) * 100).toFixed(1) : 0}% of total
            </p>
          </div>

          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-8 border-green-100"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{completedAppointments.length}</p>
                  <p className="text-xs text-gray-600">Completed</p>
                </div>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {completionRate}% completion rate
            </p>
          </div>

          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-8 border-red-100"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{cancelledAppointments.length}</p>
                  <p className="text-xs text-gray-600">Cancelled</p>
                </div>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {cancellationRate}% cancellation rate
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-600 font-medium">Pending</p>
              <p className="text-xl font-bold text-blue-900">{scheduledAppointments.length}</p>
            </div>
            <FiClock className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-600 font-medium">Completed</p>
              <p className="text-xl font-bold text-green-900">{completedAppointments.length}</p>
            </div>
            <FiCheckCircle className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-red-600 font-medium">Cancelled</p>
              <p className="text-xl font-bold text-red-900">{cancelledAppointments.length}</p>
            </div>
            <FiXCircle className="w-8 h-8 text-red-500 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-purple-600 font-medium">Total</p>
              <p className="text-xl font-bold text-purple-900">{appointments.length}</p>
            </div>
            <FiActivity className="w-8 h-8 text-purple-500 opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentStats;
