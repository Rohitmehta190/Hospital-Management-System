import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AppointmentCard from '../components/AppointmentCard';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentCalendar from '../components/AppointmentCalendar';
import AppointmentStats from '../components/AppointmentStats';
import { FiPlus, FiSearch, FiFilter, FiGrid, FiList, FiCalendar, FiBarChart2, FiClock } from 'react-icons/fi';

const Appointments = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments', 'calendar', or 'stats'
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [error, setError] = useState('');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter appointments based on search term, status, and date
    let filtered = appointments;
    
    if (searchTerm) {
      filtered = filtered.filter(apt => {
        const patient = patients.find(p => p.id === apt.patient_id);
        const doctor = doctors.find(d => d.id === apt.doctor_id);
        
        return (
          apt.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (patient && `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (doctor && `Dr. ${doctor.first_name} ${doctor.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(apt => apt.status === filterStatus);
    }

    if (filterDate) {
      filtered = filtered.filter(apt => 
        apt.appointment_date.startsWith(filterDate)
      );
    }

    // Sort by date and time
    filtered.sort((a, b) => new Date(b.appointment_date) - new Date(a.appointment_date));

    setFilteredAppointments(filtered);
  }, [searchTerm, filterStatus, filterDate, appointments, patients, doctors]);

  const fetchData = async () => {
    try {
      const [appointmentsResponse, patientsResponse, doctorsResponse] = await Promise.all([
        api.get('/appointments'),
        api.get('/patients'),
        api.get('/doctors')
      ]);

      setAppointments(appointmentsResponse.data);
      setPatients(patientsResponse.data);
      setDoctors(doctorsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch appointment data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (appointmentData) => {
    setError('');
    try {
      if (editingAppointment) {
        await api.put(`/appointments/${editingAppointment.id}`, appointmentData);
      } else {
        await api.post('/appointments', appointmentData);
      }
      
      fetchData();
      resetForm();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save appointment');
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setShowAddForm(true);
  };

  const handleDelete = async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment? This action cannot be undone.')) {
      try {
        await api.delete(`/appointments/${appointmentId}`);
        fetchData();
      } catch (error) {
        setError('Failed to delete appointment');
      }
    }
  };

  const handleComplete = async (appointmentId) => {
    try {
      await api.put(`/appointments/${appointmentId}`, { status: 'completed' });
      fetchData();
    } catch (error) {
      setError('Failed to complete appointment');
    }
  };

  const handleCancel = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await api.put(`/appointments/${appointmentId}`, { status: 'cancelled' });
        fetchData();
      } catch (error) {
        setError('Failed to cancel appointment');
      }
    }
  };

  const handleReschedule = (appointment) => {
    setEditingAppointment(appointment);
    setShowAddForm(true);
  };

  const handleDateSelect = (date) => {
    setFilterDate(date.toISOString().split('T')[0]);
    setActiveTab('appointments');
  };

  const handleAppointmentClick = (appointment) => {
    handleEdit(appointment);
  };

  const resetForm = () => {
    setEditingAppointment(null);
    setShowAddForm(false);
    setError('');
  };

  const getTodayStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(apt => 
      apt.appointment_date.startsWith(today)
    );

    return {
      total: todayAppointments.length,
      completed: todayAppointments.filter(apt => apt.status === 'completed').length,
      scheduled: todayAppointments.filter(apt => apt.status === 'scheduled').length,
      cancelled: todayAppointments.filter(apt => apt.status === 'cancelled').length
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg font-semibold text-gray-700">Loading appointments...</div>
        </div>
      </div>
    );
  }

  const todayStats = getTodayStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Appointments Management</h1>
            <p className="text-indigo-100 text-lg">Schedule and manage all patient appointments</p>
            <div className="mt-4 flex items-center space-x-6">
              <div>
                <p className="text-indigo-200 text-sm">Today's Total</p>
                <p className="text-xl font-semibold">{todayStats.total}</p>
              </div>
              <div>
                <p className="text-indigo-200 text-sm">Completed</p>
                <p className="text-xl font-semibold">{todayStats.completed}</p>
              </div>
              <div>
                <p className="text-indigo-200 text-sm">Pending</p>
                <p className="text-xl font-semibold">{todayStats.scheduled}</p>
              </div>
              <div>
                <p className="text-indigo-200 text-sm">Cancelled</p>
                <p className="text-xl font-semibold">{todayStats.cancelled}</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <FiCalendar className="w-20 h-20 text-indigo-200 opacity-50" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-2">
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'appointments'
                ? 'bg-indigo-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FiCalendar className="w-5 h-5 mr-2" />
            Appointments
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'calendar'
                ? 'bg-indigo-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FiCalendar className="w-5 h-5 mr-2" />
            Calendar
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'stats'
                ? 'bg-indigo-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FiBarChart2 className="w-5 h-5 mr-2" />
            Statistics
          </button>
        </div>
      </div>

      {activeTab === 'appointments' && (
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
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>

                {/* Date Filter */}
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />

                {/* View Toggle */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-50'} transition-colors`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 ${viewMode === 'list' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-50'} transition-colors`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add Appointment Button */}
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                <FiPlus className="w-5 h-5 mr-2" />
                Schedule Appointment
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiCalendar className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Appointments Display */}
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <FiCalendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filterStatus !== 'all' || filterDate
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by scheduling your first appointment'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && !filterDate && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                >
                  <FiPlus className="w-5 h-5 mr-2" />
                  Schedule First Appointment
                </button>
              )}
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  patients={patients}
                  doctors={doctors}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onComplete={handleComplete}
                  onCancel={handleCancel}
                  onReschedule={handleReschedule}
                />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'calendar' && (
        <AppointmentCalendar
          appointments={appointments}
          onDateSelect={handleDateSelect}
          onAppointmentClick={handleAppointmentClick}
        />
      )}

      {activeTab === 'stats' && (
        <AppointmentStats appointments={appointments} />
      )}

      {/* Appointment Form Modal */}
      {showAddForm && (
        <AppointmentForm
          appointment={editingAppointment}
          patients={patients}
          doctors={doctors}
          onSave={handleSave}
          onCancel={resetForm}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Appointments;
