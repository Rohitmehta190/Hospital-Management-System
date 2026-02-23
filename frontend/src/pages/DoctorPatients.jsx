import React, { useState, useEffect } from 'react';
import { FiUsers, FiSearch, FiFilter, FiCalendar, FiPhone, FiMail, FiMapPin, FiEdit, FiEye, FiFileText, FiActivity, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';

const DoctorPatients = ({ user }) => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    // Simulate data fetching
    setPatients([
      {
        id: 1,
        name: 'John Smith',
        age: 45,
        gender: 'Male',
        bloodType: 'O+',
        lastVisit: '2024-01-15',
        condition: 'Hypertension',
        status: 'active',
        phone: '+1 (555) 123-4567',
        email: 'john.smith@email.com',
        address: '123 Main St, City, State',
        appointments: 12,
        nextAppointment: '2024-02-01',
        medications: ['Lisinopril', 'Aspirin'],
        allergies: ['Penicillin'],
        notes: 'Patient responding well to treatment. Blood pressure under control.'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        age: 32,
        gender: 'Female',
        bloodType: 'A+',
        lastVisit: '2024-01-10',
        condition: 'Diabetes Type 2',
        status: 'active',
        phone: '+1 (555) 987-6543',
        email: 'sarah.j@email.com',
        address: '456 Oak Ave, City, State',
        appointments: 8,
        nextAppointment: '2024-01-25',
        medications: ['Metformin', 'Insulin'],
        allergies: ['None'],
        notes: 'Blood sugar levels stable. Diet compliance good.'
      }
    ]);
  }, []);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'stable': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">My Patients</h1>
            <p className="text-blue-100 text-lg">Manage patient records and treatment plans</p>
            <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FiUsers className="w-5 h-5" />
                <span className="text-sm">{patients.length} Total Patients</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiActivity className="w-5 h-5" />
                <span className="text-sm">Active Treatment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="critical">Critical</option>
            <option value="stable">Stable</option>
          </select>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{patient.name}</h3>
                    <p className="text-blue-100 text-sm">{patient.age} years • {patient.gender}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Blood Type</span>
                <span className="text-sm font-medium text-gray-900">{patient.bloodType}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Condition</span>
                <span className="text-sm font-medium text-gray-900">{patient.condition}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Last Visit</span>
                <span className="text-sm font-medium text-gray-900">{patient.lastVisit}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Next Appointment</span>
                <span className="text-sm font-medium text-blue-600">{patient.nextAppointment}</span>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    <FiEye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                    <FiFileText className="w-4 h-4 mr-1" />
                    Records
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPatients;
