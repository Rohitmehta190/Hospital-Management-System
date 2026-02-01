import React from 'react';

const AppointmentChart = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Trends</h3>
      <div className="h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56 * 0.7} ${2 * Math.PI * 56}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">70%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">Appointment Completion Rate</p>
        </div>
      </div>
    </div>
  );
};

const PatientGrowthChart = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data = [45, 52, 48, 65, 72, 68];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Growth</h3>
      <div className="h-64">
        <div className="flex items-end justify-between h-full px-2">
          {data.map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full max-w-8 bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg transition-all duration-300 hover:opacity-80"
                   style={{ height: `${(value / Math.max(...data)) * 100}%` }}>
              </div>
              <span className="text-xs text-gray-600 mt-2">{months[index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DepartmentStats = () => {
  const departments = [
    { name: 'Cardiology', patients: 120, color: 'bg-blue-500' },
    { name: 'Neurology', patients: 85, color: 'bg-green-500' },
    { name: 'Orthopedics', patients: 95, color: 'bg-purple-500' },
    { name: 'Pediatrics', patients: 110, color: 'bg-orange-500' },
    { name: 'Emergency', patients: 75, color: 'bg-red-500' }
  ];

  const totalPatients = departments.reduce((sum, dept) => sum + dept.patients, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Statistics</h3>
      <div className="space-y-4">
        {departments.map((dept, index) => (
          <div key={index} className="flex items-center">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                <span className="text-sm text-gray-500">{dept.patients} patients</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${dept.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${(dept.patients / totalPatients) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { AppointmentChart, PatientGrowthChart, DepartmentStats };
