import React, { useState, useEffect } from 'react';
import api from '../services/api';
import DoctorCard from '../components/DoctorCard';
import DoctorForm from '../components/DoctorForm';
import DoctorSchedule from '../components/DoctorSchedule';
import DoctorStats from '../components/DoctorStats';
import { FiPlus, FiSearch, FiFilter, FiGrid, FiList, FiUser, FiBarChart2, FiCalendar } from 'react-icons/fi';

const Doctors = ({ user }) => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [showSchedule, setShowSchedule] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('doctors'); // 'doctors' or 'stats'
  const [filterSpecialization, setFilterSpecialization] = useState('');
  const [error, setError] = useState('');

  const specializations = [
    'All Specializations',
    'General Medicine',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'Psychiatry',
    'Radiology',
    'Surgery',
    'Gynecology',
    'Ophthalmology',
    'ENT',
    'Dentistry',
    'Anesthesiology',
    'Pathology',
    'Emergency Medicine'
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    // Filter doctors based on search term and specialization
    let filtered = doctors;
    
    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.phone?.includes(searchTerm) ||
        doctor.email?.toLowerCase().includes(searchTerm)
      );
    }

    if (filterSpecialization && filterSpecialization !== 'All Specializations') {
      filtered = filtered.filter(doctor => 
        doctor.specialization === filterSpecialization
      );
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, filterSpecialization, doctors]);

  const fetchDoctors = async () => {
    try {
      const response = await api.get('/doctors');
      setDoctors(response.data);
      setFilteredDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setError('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (doctorData) => {
    setError('');
    try {
      if (editingDoctor) {
        await api.put(`/doctors/${editingDoctor.id}`, doctorData);
      } else {
        await api.post('/doctors', doctorData);
      }
      
      fetchDoctors();
      resetForm();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save doctor');
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setShowAddForm(true);
  };

  const handleDelete = async (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor? This action cannot be undone.')) {
      try {
        await api.delete(`/doctors/${doctorId}`);
        fetchDoctors();
      } catch (error) {
        setError('Failed to delete doctor');
      }
    }
  };

  const handleView = (doctor) => {
    // You can implement a detailed view modal or navigate to a detail page
    console.log('View doctor details:', doctor);
  };

  const handleSchedule = (doctor) => {
    setShowSchedule(doctor);
  };

  const handleBookAppointment = (appointmentData) => {
    // Implement appointment booking logic
    console.log('Book appointment:', appointmentData);
    setShowSchedule(null);
    // You might want to show a success message or redirect to appointments page
  };

  const resetForm = () => {
    setEditingDoctor(null);
    setShowAddForm(false);
    setError('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg font-semibold text-gray-700">Loading doctors...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Doctors Management</h1>
            <p className="text-teal-100 text-lg">Manage and monitor all medical staff</p>
            <div className="mt-4 flex items-center space-x-6">
              <div>
                <p className="text-teal-200 text-sm">Total Staff</p>
                <p className="text-xl font-semibold">{filteredDoctors.length}</p>
              </div>
              <div>
                <p className="text-teal-200 text-sm">Available Now</p>
                <p className="text-xl font-semibold">{Math.floor(filteredDoctors.length * 0.7)}</p>
              </div>
              <div>
                <p className="text-teal-200 text-sm">Departments</p>
                <p className="text-xl font-semibold">16</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <FiUser className="w-20 h-20 text-teal-200 opacity-50" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-2">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('doctors')}
            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'doctors'
                ? 'bg-teal-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FiUser className="w-5 h-5 mr-2" />
            Doctors
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'stats'
                ? 'bg-teal-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FiBarChart2 className="w-5 h-5 mr-2" />
            Statistics
          </button>
        </div>
      </div>

      {activeTab === 'doctors' ? (
        <>
          {/* Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Specialization Filter */}
                <select
                  value={filterSpecialization}
                  onChange={(e) => setFilterSpecialization(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>

                {/* View Toggle */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-teal-500 text-white' : 'text-gray-700 hover:bg-gray-50'} transition-colors`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 ${viewMode === 'list' ? 'bg-teal-500 text-white' : 'text-gray-700 hover:bg-gray-50'} transition-colors`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add Doctor Button */}
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-200 shadow-lg"
              >
                <FiPlus className="w-5 h-5 mr-2" />
                Add Doctor
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiUser className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Doctors Display */}
          {filteredDoctors.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <FiUser className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filterSpecialization !== 'All Specializations' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Get started by adding your first doctor'
                }
              </p>
              {!searchTerm && filterSpecialization === 'All Specializations' && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-200"
                >
                  <FiPlus className="w-5 h-5 mr-2" />
                  Add First Doctor
                </button>
              )}
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                  onSchedule={handleSchedule}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <DoctorStats doctors={doctors} />
      )}

      {/* Doctor Form Modal */}
      {showAddForm && (
        <DoctorForm
          doctor={editingDoctor}
          onSave={handleSave}
          onCancel={resetForm}
          loading={loading}
        />
      )}

      {/* Schedule Modal */}
      {showSchedule && (
        <DoctorSchedule
          doctor={showSchedule}
          onClose={() => setShowSchedule(null)}
          onBookAppointment={handleBookAppointment}
        />
      )}
    </div>
  );
};

export default Doctors;
