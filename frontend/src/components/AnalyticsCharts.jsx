import React from 'react';
import { FiTrendingUp, FiBarChart2, FiPieChart, FiActivity } from 'react-icons/fi';

const AnalyticsCharts = ({ patients, doctors, appointments }) => {
  // Generate monthly data for the last 12 months
  const generateMonthlyData = () => {
    const months = [];
    const today = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const monthAppointments = appointments.filter(apt => {
        const aptDate = new Date(apt.appointment_date);
        return aptDate >= monthStart && aptDate <= monthEnd;
      });
      
      const completed = monthAppointments.filter(apt => apt.status === 'completed').length;
      const cancelled = monthAppointments.filter(apt => apt.status === 'cancelled').length;
      
      months.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        total: monthAppointments.length,
        completed,
        cancelled,
        revenue: completed * 150
      });
    }
    
    return months;
  };

  // Generate daily data for the last 30 days
  const generateDailyData = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayAppointments = appointments.filter(apt => 
        apt.appointment_date.startsWith(dateStr)
      );
      
      days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        total: dayAppointments.length,
        completed: dayAppointments.filter(apt => apt.status === 'completed').length,
        cancelled: dayAppointments.filter(apt => apt.status === 'cancelled').length
      });
    }
    
    return days;
  };

  // Generate doctor performance data
  const generateDoctorData = () => {
    return doctors.map(doctor => {
      const doctorAppointments = appointments.filter(apt => apt.doctor_id === doctor.id);
      const completed = doctorAppointments.filter(apt => apt.status === 'completed').length;
      
      return {
        name: `Dr. ${doctor.first_name} ${doctor.last_name}`,
        specialization: doctor.specialization,
        total: doctorAppointments.length,
        completed,
        completionRate: doctorAppointments.length > 0 ? ((completed / doctorAppointments.length) * 100).toFixed(1) : 0,
        revenue: completed * 150
      };
    });
  };

  // Generate patient demographics
  const generatePatientDemographics = () => {
    const ageGroups = {
      '0-18': 0,
      '19-35': 0,
      '36-50': 0,
      '51-65': 0,
      '65+': 0
    };

    const genders = { Male: 0, Female: 0 };

    patients.forEach(patient => {
      // Calculate age (simplified)
      const birthYear = new Date(patient.date_of_birth).getFullYear();
      const age = new Date().getFullYear() - birthYear;
      
      if (age <= 18) ageGroups['0-18']++;
      else if (age <= 35) ageGroups['19-35']++;
      else if (age <= 50) ageGroups['36-50']++;
      else if (age <= 65) ageGroups['51-65']++;
      else ageGroups['65+']++;

      if (patient.gender) {
        genders[patient.gender]++;
      }
    });

    return { ageGroups, genders };
  };

  const monthlyData = generateMonthlyData();
  const dailyData = generateDailyData();
  const doctorData = generateDoctorData();
  const demographics = generatePatientDemographics();

  const maxValue = Math.max(...monthlyData.map(m => m.total));

  return (
    <div className="space-y-6">
      {/* Monthly Trends Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <FiTrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
            Monthly Appointment Trends
          </h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              <span className="text-gray-600">Total</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span className="text-gray-600">Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span className="text-gray-600">Cancelled</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 flex items-end space-x-2">
          {monthlyData.map((month, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col-reverse space-y-reverse space-y-1">
                <div 
                  className="w-full bg-red-500 rounded-t"
                  style={{ height: `${(month.cancelled / maxValue) * 100}%` }}
                  title={`Cancelled: ${month.cancelled}`}
                ></div>
                <div 
                  className="w-full bg-green-500"
                  style={{ height: `${(month.completed / maxValue) * 100}%` }}
                  title={`Completed: ${month.completed}`}
                ></div>
                <div 
                  className="w-full bg-blue-500 rounded-b"
                  style={{ height: `${((month.total - month.completed - month.cancelled) / maxValue) * 100}%` }}
                  title={`Scheduled: ${month.total - month.completed - month.cancelled}`}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-2 text-center">
                {month.month}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Activity Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <FiActivity className="w-5 h-5 mr-2 text-green-600" />
            30-Day Activity Overview
          </h3>
        </div>
        
        <div className="h-48">
          <div className="flex items-end space-x-1 h-full">
            {dailyData.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t hover:from-indigo-600 hover:to-indigo-400 transition-colors cursor-pointer"
                  style={{ height: `${day.total > 0 ? (day.total / Math.max(...dailyData.map(d => d.total))) * 100 : 2}%` }}
                  title={`${day.date}: ${day.total} appointments`}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{dailyData[0]?.date}</span>
            <span>{dailyData[dailyData.length - 1]?.date}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doctor Performance */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <FiBarChart2 className="w-5 h-5 mr-2 text-purple-600" />
              Doctor Performance
            </h3>
          </div>
          
          <div className="space-y-4">
            {doctorData.map((doctor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
                    <p className="text-xs text-gray-500">{doctor.specialization}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{doctor.total} appointments</p>
                    <p className="text-xs text-gray-500">{doctor.completionRate}% completion</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${doctor.completionRate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Demographics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <FiPieChart className="w-5 h-5 mr-2 text-orange-600" />
              Patient Demographics
            </h3>
          </div>
          
          <div className="space-y-6">
            {/* Age Groups */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Age Distribution</h4>
              <div className="space-y-2">
                {Object.entries(demographics.ageGroups).map(([ageGroup, count]) => (
                  <div key={ageGroup} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{ageGroup} years</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                          style={{ width: `${(count / patients.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gender Distribution */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Gender Distribution</h4>
              <div className="flex items-center space-x-4">
                {Object.entries(demographics.genders).map(([gender, count]) => (
                  <div key={gender} className="flex-1 text-center">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-lg font-bold text-gray-900">{count}</span>
                    </div>
                    <p className="text-sm text-gray-600">{gender}</p>
                    <p className="text-xs text-gray-500">
                      {patients.length > 0 ? ((count / patients.length) * 100).toFixed(1) : 0}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
