import React from 'react';
import { FiTrendingUp, FiUsers, FiCalendar, FiClock, FiActivity, FiAward } from 'react-icons/fi';

const DoctorStats = ({ doctors }) => {
  const totalDoctors = doctors.length;
  const availableDoctors = doctors.filter(() => Math.random() > 0.3).length; // Demo data
  const appointmentsToday = Math.floor(Math.random() * 50) + 20; // Demo data
  const avgRating = (4.2 + Math.random() * 0.6).toFixed(1); // Demo data

  const specializations = [
    { name: 'Cardiology', count: Math.floor(Math.random() * 5) + 2, color: 'bg-red-500' },
    { name: 'Neurology', count: Math.floor(Math.random() * 4) + 1, color: 'bg-blue-500' },
    { name: 'Pediatrics', count: Math.floor(Math.random() * 6) + 3, color: 'bg-green-500' },
    { name: 'Orthopedics', count: Math.floor(Math.random() * 4) + 2, color: 'bg-purple-500' },
    { name: 'General Medicine', count: Math.floor(Math.random() * 8) + 4, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Doctors</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalDoctors}</p>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <FiTrendingUp className="w-4 h-4 mr-1" />
                +12% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Now</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{availableDoctors}</p>
              <p className="text-sm text-blue-600 mt-2 flex items-center">
                <FiClock className="w-4 h-4 mr-1" />
                On duty today
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiActivity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{appointmentsToday}</p>
              <p className="text-sm text-purple-600 mt-2 flex items-center">
                <FiCalendar className="w-4 h-4 mr-1" />
                Scheduled
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{avgRating}</p>
              <p className="text-sm text-yellow-600 mt-2 flex items-center">
                <FiAward className="w-4 h-4 mr-1" />
                Excellent
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FiAward className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Specializations Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Specializations</h3>
        <div className="space-y-4">
          {specializations.map((spec, index) => (
            <div key={spec.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 ${spec.color} rounded-full`}></div>
                <span className="text-sm font-medium text-gray-700">{spec.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className={`${spec.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${(spec.count / totalDoctors) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-900 w-8">{spec.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Patient Satisfaction</span>
                <span className="text-sm font-semibold text-gray-900">94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Appointment Completion</span>
                <span className="text-sm font-semibold text-gray-900">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="text-sm font-semibold text-gray-900">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Schedule Overview</h3>
          <div className="space-y-3">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
              <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{day}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Appointments</span>
                  <span className="text-sm font-semibold text-teal-600">
                    {Math.floor(Math.random() * 20) + 10}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorStats;
