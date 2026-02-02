import React, { useState, useEffect } from 'react';
import { FiCalendar, FiUser, FiHeart, FiActivity, FiFileText, FiClock, FiAlertCircle, FiCheckCircle, FiVideo, FiMessageSquare, FiDownload, FiTrendingUp, FiActivity as FiActivityIcon, FiThermometer } from 'react-icons/fi';

const PatientDashboard = ({ user }) => {
  const [healthStats, setHealthStats] = useState({
    heartRate: 72,
    bloodPressure: '120/80',
    temperature: 98.6,
    weight: 165,
    height: 5.9,
    bmi: 22.1
  });

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [medications, setMedications] = useState([]);
  const [healthTips, setHealthTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Button handlers
  const handleBookAppointment = () => {
    setModalType('bookAppointment');
    setShowModal(true);
  };

  const handleViewRecords = () => {
    setModalType('viewRecords');
    setShowModal(true);
  };

  const handleMessageDoctor = () => {
    setModalType('messageDoctor');
    setShowModal(true);
  };

  const handleDownloadReports = () => {
    setModalType('downloadReports');
    setShowModal(true);
  };

  const handleJoinVideoCall = (appointmentId) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Starting video call for appointment ${appointmentId}...`);
    }, 1000);
  };

  const handleRequestMedicationRefill = (medId) => {
    alert(`Medication refill requested for medication ID: ${medId}`);
  };

  const renderModal = () => {
    if (!showModal) return null;

    const modalContent = {
      bookAppointment: (
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Book New Appointment</h3>
          <div className="space-y-4">
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option value="">Select Doctor</option>
              <option value="1">Dr. Ashok Reddy - Cardiology</option>
              <option value="2">Dr. Anjali Gupta - General Medicine</option>
              <option value="3">Dr. Priya Nair - General Practice</option>
            </select>
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option value="">Select Time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">2:00 PM</option>
            </select>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option value="">Appointment Type</option>
              <option value="regular">Regular Checkup</option>
              <option value="follow-up">Follow-up</option>
              <option value="emergency">Emergency</option>
            </select>
            <div className="flex space-x-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg">Cancel</button>
              <button onClick={() => { setShowModal(false); alert('Appointment booked successfully!'); }} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg">Book Appointment</button>
            </div>
          </div>
        </div>
      ),
      viewRecords: (
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Medical Records</h3>
          <div className="space-y-3">
            {medicalHistory.map((record) => (
              <div key={record.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{record.diagnosis}</p>
                    <p className="text-sm text-gray-600">{record.treatment}</p>
                    <p className="text-xs text-gray-500">{record.date} • {record.doctor}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    record.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    record.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button onClick={() => setShowModal(false)} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">Close</button>
          </div>
        </div>
      ),
      messageDoctor: (
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Message Doctor</h3>
          <div className="space-y-4">
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option value="">Select Doctor</option>
              <option value="1">Dr. Ashok Reddy</option>
              <option value="2">Dr. Anjali Gupta</option>
              <option value="3">Dr. Priya Nair</option>
            </select>
            <input type="text" placeholder="Subject" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            <textarea placeholder="Type your message here..." className="w-full px-3 py-2 border border-gray-300 rounded-lg h-32"></textarea>
            <div className="flex space-x-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg">Cancel</button>
              <button onClick={() => { setShowModal(false); alert('Message sent successfully!'); }} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">Send Message</button>
            </div>
          </div>
        </div>
      ),
      downloadReports: (
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Download Reports</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>Complete Medical History</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>Lab Results</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>Prescription History</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>Immunization Records</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>Allergy Information</span>
            </label>
          </div>
          <div className="mt-4 flex space-x-3">
            <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg">Cancel</button>
            <button onClick={() => { setShowModal(false); alert('Reports downloaded successfully!'); }} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg">Download</button>
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
    setUpcomingAppointments([
      { id: 1, date: 'Tomorrow', time: '10:00 AM', doctor: 'Dr. Ashok Reddy', type: 'Regular Checkup', department: 'Cardiology' },
      { id: 2, date: 'Next Week', time: '2:30 PM', doctor: 'Dr. Anjali Gupta', type: 'Follow-up', department: 'Internal Medicine' },
      { id: 3, date: 'Next Month', time: '11:15 AM', doctor: 'Dr. Priya Nair', type: 'Annual Physical', department: 'General Practice' }
    ]);

    setMedicalHistory([
      { id: 1, date: '2024-01-15', diagnosis: 'Hypertension', doctor: 'Dr. Ashok Reddy', treatment: 'Medication prescribed', status: 'resolved' },
      { id: 2, date: '2023-12-20', diagnosis: 'Seasonal Flu', doctor: 'Dr. Anjali Gupta', treatment: 'Rest and fluids', status: 'resolved' },
      { id: 3, date: '2023-11-10', diagnosis: 'Annual Checkup', doctor: 'Dr. Priya Nair', treatment: 'Routine examination', status: 'completed' }
    ]);

    setMedications([
      { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', purpose: 'Blood pressure', remaining: 45 },
      { id: 2, name: 'Vitamin D', dosage: '1000 IU', frequency: 'Once daily', purpose: 'Supplement', remaining: 60 },
      { id: 3, name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', purpose: 'Heart health', remaining: 30 }
    ]);

    setHealthTips([
      { id: 1, title: 'Stay Hydrated', description: 'Drink at least 8 glasses of water daily', icon: FiActivityIcon, color: 'from-blue-500 to-blue-600' },
      { id: 2, title: 'Regular Exercise', description: '30 minutes of moderate exercise daily', icon: FiHeart, color: 'from-red-500 to-red-600' },
      { id: 3, title: 'Healthy Diet', description: 'Include more fruits and vegetables', icon: FiActivity, color: 'from-green-500 to-green-600' }
    ]);
  }, []);

  const quickActions = [
    { id: 1, title: 'Book Appointment', icon: FiCalendar, color: 'from-blue-500 to-blue-600', description: 'Schedule new appointment', onClick: handleBookAppointment },
    { id: 2, title: 'Video Consultation', icon: FiVideo, color: 'from-green-500 to-green-600', description: 'Start video call with doctor', onClick: handleBookAppointment },
    { id: 3, title: 'View Records', icon: FiFileText, color: 'from-purple-500 to-purple-600', description: 'Access medical records', onClick: handleViewRecords },
    { id: 4, title: 'Message Doctor', icon: FiMessageSquare, color: 'from-orange-500 to-orange-600', description: 'Send message to doctor', onClick: handleMessageDoctor }
  ];

  const getHealthStatus = (value, type) => {
    if (type === 'heartRate') {
      if (value >= 60 && value <= 100) return { status: 'Normal', color: 'text-green-600', bg: 'bg-green-100' };
      return { status: 'Attention', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    }
    if (type === 'bloodPressure') {
      const [systolic, diastolic] = value.split('/').map(Number);
      if (systolic < 120 && diastolic < 80) return { status: 'Normal', color: 'text-green-600', bg: 'bg-green-100' };
      return { status: 'High', color: 'text-red-600', bg: 'bg-red-100' };
    }
    return { status: 'Normal', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const heartRateStatus = getHealthStatus(healthStats.heartRate, 'heartRate');
  const bpStatus = getHealthStatus(healthStats.bloodPressure, 'bloodPressure');

  return (
    <>
      <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">Patient Dashboard</h1>
            <p className="text-green-100 text-lg">Welcome back, {user?.username || 'John Doe'}!</p>
            <div className="mt-6 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FiHeart className="w-5 h-5" />
                <span className="text-sm">Patient ID: #P2024001</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="w-5 h-5" />
                <span className="text-sm">Active Patient</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiUser className="w-5 h-5" />
                <span className="text-sm">Primary Care: Dr. Ashok Reddy</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <FiHeart className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Health Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FiHeart className="w-6 h-6 text-red-600" />
            </div>
            <span className={`text-xs font-medium ${heartRateStatus.color} ${heartRateStatus.bg} px-2 py-1 rounded-full`}>
              {heartRateStatus.status}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{healthStats.heartRate}</h3>
          <p className="text-sm text-gray-600">Heart Rate (bpm)</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiActivity className="w-6 h-6 text-blue-600" />
            </div>
            <span className={`text-xs font-medium ${bpStatus.color} ${bpStatus.bg} px-2 py-1 rounded-full`}>
              {bpStatus.status}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{healthStats.bloodPressure}</h3>
          <p className="text-sm text-gray-600">Blood Pressure</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FiThermometer className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Normal</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{healthStats.temperature}°F</h3>
          <p className="text-sm text-gray-600">Temperature</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiUser className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Healthy</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{healthStats.weight} lbs</h3>
          <p className="text-sm text-gray-600">Weight</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Normal</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{healthStats.height}'</h3>
          <p className="text-sm text-gray-600">Height</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <FiActivityIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Good</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{healthStats.bmi}</h3>
          <p className="text-sm text-gray-600">BMI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <FiCalendar className="w-5 h-5 mr-2 text-blue-600" />
              Upcoming Appointments
            </h3>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <FiCalendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.type}</p>
                      <p className="text-sm text-gray-600">{appointment.doctor} • {appointment.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{appointment.date}</p>
                    <p className="text-sm text-gray-600">{appointment.time}</p>
                    <button 
                      onClick={() => handleJoinVideoCall(appointment.id)}
                      disabled={loading}
                      className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? 'Joining...' : 'Join Call'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Medications */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <FiActivity className="w-5 h-5 mr-2 text-purple-600" />
            Current Medications
          </h3>
          <div className="space-y-3">
            {medications.map((medication) => (
              <div key={medication.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FiActivity className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{medication.name}</p>
                    <p className="text-sm text-gray-600">{medication.dosage} • {medication.frequency}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Remaining</p>
                  <p className="text-sm font-semibold text-gray-900">{medication.remaining} pills</p>
                  <button 
                    onClick={() => handleRequestMedicationRefill(medication.id)}
                    className="mt-1 px-2 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                  >
                    Refill
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical History */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <FiFileText className="w-5 h-5 mr-2 text-orange-600" />
            Medical History
          </h3>
          <div className="space-y-3">
            {medicalHistory.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{record.diagnosis}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      record.status === 'resolved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{record.doctor} • {record.date}</p>
                  <p className="text-xs text-gray-500 mt-1">{record.treatment}</p>
                </div>
                <button onClick={handleDownloadReports} className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                  <FiDownload className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Health Tips */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <FiTrendingUp className="w-5 h-5 mr-2 text-green-600" />
          Personalized Health Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {healthTips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div key={tip.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`w-12 h-12 bg-gradient-to-r ${tip.color} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>

      {/* Modal */}
      {renderModal()}
    </>
  );
};

export default PatientDashboard;
