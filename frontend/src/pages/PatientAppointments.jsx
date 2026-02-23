import React, { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiUser, FiVideo, FiMessageSquare, FiCheckCircle, FiAlertCircle, FiPlus, FiFilter } from 'react-icons/fi';

const PatientAppointments = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    // Simulate data fetching
    setAppointments([
      {
        id: 1,
        date: '2024-01-25',
        time: '10:00 AM',
        doctor: 'Dr. Sarah Johnson',
        department: 'Cardiology',
        type: 'Regular Checkup',
        status: 'confirmed',
        location: 'Room 201',
        notes: 'Annual checkup - bring insurance card',
        videoLink: 'https://zoom.us/j/123456789'
      },
      {
        id: 2,
        date: '2024-02-15',
        time: '2:30 PM',
        doctor: 'Dr. Michael Brown',
        department: 'Internal Medicine',
        type: 'Follow-up',
        status: 'scheduled',
        location: 'Room 105',
        notes: 'Review blood test results',
        videoLink: null
      },
      {
        id: 3,
        date: '2023-12-20',
        time: '11:00 AM',
        doctor: 'Dr. Emily Davis',
        department: 'General Practice',
        type: 'Consultation',
        status: 'completed',
        location: 'Room 302',
        notes: 'Flu treatment completed',
        videoLink: null
      }
    ]);
  }, []);

  const upcomingAppointments = appointments.filter(apt => apt.status !== 'completed');
  const pastAppointments = appointments.filter(apt => apt.status === 'completed');

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Emergency': return 'bg-red-100 text-red-800';
      case 'Regular Checkup': return 'bg-blue-100 text-blue-800';
      case 'Follow-up': return 'bg-green-100 text-green-800';
      case 'Consultation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleJoinVideoCall = (videoLink) => {
    if (videoLink) {
      window.open(videoLink, '_blank');
    }
  };

  const handleSendMessage = (doctorName) => {
    // Simulate opening message interface
    alert(`Opening message interface for ${doctorName}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">My Appointments</h1>
            <p className="text-green-100 text-lg">Schedule and manage your medical appointments</p>
            <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FiCalendar className="w-5 h-5" />
                <span className="text-sm">{upcomingAppointments.length} Upcoming</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="w-5 h-5" />
                <span className="text-sm">{pastAppointments.length} Completed</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowBookingModal(true)}
            className="hidden lg:flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
          >
            <FiPlus className="w-5 h-5 mr-2" />
            Book Appointment
          </button>
        </div>
      </div>

      {/* Mobile Book Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowBookingModal(true)}
          className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-colors"
        >
          <FiPlus className="w-5 h-5 mr-2" />
          Book New Appointment
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-2">
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-green-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FiCalendar className="w-5 h-5 mr-2" />
            Upcoming ({upcomingAppointments.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'past'
                ? 'bg-green-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FiCheckCircle className="w-5 h-5 mr-2" />
            Past ({pastAppointments.length})
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {activeTab === 'upcoming' && upcomingAppointments.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FiCalendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming appointments</h3>
            <p className="text-gray-500 mb-6">Schedule your next appointment to stay on top of your health</p>
            <button
              onClick={() => setShowBookingModal(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200"
            >
              <FiPlus className="w-5 h-5 mr-2" />
              Book Appointment
            </button>
          </div>
        )}

        {activeTab === 'past' && pastAppointments.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FiCheckCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No past appointments</h3>
            <p className="text-gray-500">Your appointment history will appear here</p>
          </div>
        )}

        {(activeTab === 'upcoming' ? upcomingAppointments : pastAppointments).map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <FiCalendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{appointment.type}</h3>
                      <p className="text-sm text-gray-600">{appointment.doctor} • {appointment.department}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Date:</span>
                      <span className="text-sm font-medium text-gray-900">{appointment.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiClock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Time:</span>
                      <span className="text-sm font-medium text-gray-900">{appointment.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiUser className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium text-gray-900">{appointment.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(appointment.type)}`}>
                        {appointment.type}
                      </span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> {appointment.notes}
                      </p>
                    </div>
                  )}

                  {appointment.status !== 'completed' && (
                    <div className="flex space-x-3">
                      {appointment.videoLink && (
                        <button
                          onClick={() => handleJoinVideoCall(appointment.videoLink)}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <FiVideo className="w-4 h-4 mr-2" />
                          Join Video Call
                        </button>
                      )}
                      <button
                        onClick={() => handleSendMessage(appointment.doctor)}
                        className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <FiMessageSquare className="w-4 h-4 mr-2" />
                        Message Doctor
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal (placeholder) */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowBookingModal(false)}></div>
            <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
                <h3 className="text-2xl font-bold">Book New Appointment</h3>
                <p className="text-green-100">Schedule your next medical consultation</p>
              </div>
              <div className="p-6">
                <p className="text-center text-gray-600 mb-4">Appointment booking form would go here...</p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
