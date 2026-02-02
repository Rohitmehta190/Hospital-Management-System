import React, { useState, useEffect } from 'react';
import { FiCalendar, FiUsers, FiClock, FiActivity, FiTrendingUp, FiAward, FiHeart, FiFileText, FiVideo, FiMessageSquare, FiCheckCircle, FiAlertCircle, FiUser, FiBarChart2 } from 'react-icons/fi';

const DoctorDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    todayAppointments: 0,
    totalPatients: 0,
    completedAppointments: 0,
    averageRating: 0,
    weeklyHours: 0,
    pendingReports: 0
  });

  const [todaySchedule, setTodaySchedule] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Button handlers
  const handleStartConsultation = () => {
    setModalType('consultation');
    setShowModal(true);
  };

  const handleWritePrescription = () => {
    setModalType('prescription');
    setShowModal(true);
  };

  const handleViewSchedule = () => {
    setModalType('schedule');
    setShowModal(true);
  };

  const handlePatientMessages = () => {
    setModalType('messages');
    setShowModal(true);
  };

  const handleViewPatientDetails = (patientId) => {
    alert(`Opening patient details for patient ID: ${patientId}`);
  };

  const handleStartAppointment = (appointmentId) => {
    setLoading(true);
    setTimeout(() => {
      setTodaySchedule(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: 'in-progress' }
            : apt
        )
      );
      setLoading(false);
      alert('Consultation started!');
    }, 1000);
  };

  const renderModal = () => {
    if (!showModal) return null;

    const modalContent = {
      consultation: (
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Start Video Consultation</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">Starting video consultation with next available patient...</p>
            </div>
            <div className="flex space-x-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg">Cancel</button>
              <button onClick={() => { setShowModal(false); alert('Video consultation started!'); }} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">Start Call</button>
            </div>
          </div>
        </div>
      ),
      prescription: (
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Write Prescription</h3>
          <div className="space-y-4">
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option value="">Select Patient</option>
              <option value="1">Rahul Sharma</option>
              <option value="2">Priya Patel</option>
              <option value="3">Amit Kumar</option>
            </select>
            <textarea placeholder="Prescription details..." className="w-full px-3 py-2 border border-gray-300 rounded-lg h-32"></textarea>
            <div className="flex space-x-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg">Cancel</button>
              <button onClick={() => { setShowModal(false); alert('Prescription saved!'); }} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg">Save Prescription</button>
            </div>
          </div>
        </div>
      ),
      schedule: (
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">View Schedule</h3>
          <div className="space-y-3">
            {todaySchedule.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{appointment.patient}</p>
                  <p className="text-sm text-gray-600">{appointment.time} - {appointment.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                  appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button onClick={() => setShowModal(false)} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">Close</button>
          </div>
        </div>
      ),
      messages: (
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Patient Messages</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Rahul Sharma</p>
              <p className="text-sm text-gray-600">"Doctor, I need to reschedule my appointment..."</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Priya Patel</p>
              <p className="text-sm text-gray-600">"Thank you for the consultation yesterday!"</p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
          </div>
          <div className="mt-4">
            <button onClick={() => setShowModal(false)} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">Close</button>
          </div>
        </div>
      )
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
          {modalContent[modalType]}
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Simulate data fetching
    setStats({
      todayAppointments: 8,
      totalPatients: 127,
      completedAppointments: 847,
      averageRating: 4.8,
      weeklyHours: 42,
      pendingReports: 3
    });

    setTodaySchedule([
      { id: 1, time: '09:00 AM', patient: 'Rahul Sharma', type: 'Regular Checkup', status: 'completed' },
      { id: 2, time: '10:00 AM', patient: 'Priya Patel', type: 'Follow-up', status: 'in-progress' },
      { id: 3, time: '11:00 AM', patient: 'Amit Kumar', type: 'Consultation', status: 'upcoming' },
      { id: 4, time: '02:00 PM', patient: 'Sunita Devi', type: 'Emergency', status: 'upcoming' },
      { id: 5, time: '03:00 PM', patient: 'Ramesh Patel', type: 'Surgery Review', status: 'upcoming' }
    ]);

    setRecentPatients([
      { id: 1, name: 'Rahul Sharma', age: 45, lastVisit: '2 days ago', condition: 'Hypertension', avatar: 'RS' },
      { id: 2, name: 'Priya Patel', age: 32, lastVisit: '1 week ago', condition: 'Diabetes', avatar: 'PP' },
      { id: 3, name: 'Amit Kumar', age: 58, lastVisit: '3 days ago', condition: 'Heart Disease', avatar: 'AK' }
    ]);

    setNotifications([
      { id: 1, type: 'urgent', message: 'Emergency appointment request from Amit Kumar', time: '5 min ago' },
      { id: 2, type: 'info', message: 'Lab results ready for Rahul Sharma', time: '1 hour ago' },
      { id: 3, type: 'reminder', message: 'Complete medical reports for Priya Patel', time: '2 hours ago' }
    ]);
  }, []);

  const quickActions = [
    { id: 1, title: 'Start Consultation', icon: FiVideo, color: 'from-blue-500 to-blue-600', description: 'Begin video call', onClick: handleStartConsultation },
    { id: 2, title: 'Write Prescription', icon: FiFileText, color: 'from-green-500 to-green-600', description: 'Create prescription', onClick: handleWritePrescription },
    { id: 3, title: 'View Schedule', icon: FiCalendar, color: 'from-purple-500 to-purple-600', description: 'Check appointments', onClick: handleViewSchedule },
    { id: 4, title: 'Patient Messages', icon: FiMessageSquare, color: 'from-orange-500 to-orange-600', description: 'Read messages', onClick: handlePatientMessages }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'urgent': return 'bg-red-50 border-red-200 text-red-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'reminder': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <>
      <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">Doctor Dashboard</h1>
            <p className="text-blue-100 text-lg">Dr. {user?.username || 'Smith'} • Cardiology Specialist</p>
            <div className="mt-6 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FiHeart className="w-5 h-5" />
                <span className="text-sm">Medical Professional</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiAward className="w-5 h-5" />
                <span className="text-sm">15 Years Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="w-5 h-5" />
                <span className="text-sm">Board Certified</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <FiUser className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Today</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.todayAppointments}</h3>
          <p className="text-sm text-gray-600">Appointments</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Total</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalPatients}</h3>
          <p className="text-sm text-gray-600">Patients</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiCheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Total</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.completedAppointments}</h3>
          <p className="text-sm text-gray-600">Completed</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FiAward className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Rating</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.averageRating}</h3>
          <p className="text-sm text-gray-600">Average Rating</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <FiClock className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Week</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.weeklyHours}</h3>
          <p className="text-sm text-gray-600">Hours Worked</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FiFileText className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">Pending</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.pendingReports}</h3>
          <p className="text-sm text-gray-600">Reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <FiCalendar className="w-5 h-5 mr-2 text-blue-600" />
              Today's Schedule
            </h3>
            <div className="space-y-3">
              {todaySchedule.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="font-semibold text-gray-900">{appointment.time}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patient}</p>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                    {appointment.status === 'upcoming' && (
                      <button 
                        onClick={() => handleStartAppointment(appointment.id)}
                        disabled={loading}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <FiVideo className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <FiActivity className="w-5 h-5 mr-2 text-green-600" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={action.onClick}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r ${action.color} text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{action.title}</p>
                      <p className="text-xs opacity-90">{action.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <FiUsers className="w-5 h-5 mr-2 text-purple-600" />
            Recent Patients
          </h3>
          <div className="space-y-3">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => handleViewPatientDetails(patient.id)}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{patient.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">Age: {patient.age} • {patient.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Last visit</p>
                  <p className="text-sm font-medium text-gray-900">{patient.lastVisit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <FiAlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
            Notifications
          </h3>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-4 rounded-lg border ${getNotificationColor(notification.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs mt-1 opacity-75">{notification.time}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

      {/* Modal */}
      {renderModal()}
    </>
  );
};

export default DoctorDashboard;
