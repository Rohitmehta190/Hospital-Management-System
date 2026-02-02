import React, { useState } from 'react';
import { FiX, FiUser, FiCalendar, FiUsers, FiPlus, FiSearch, FiClock, FiMessageSquare, FiFileText, FiActivity } from 'react-icons/fi';

const QuickAddModal = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('patient');
  const [formData, setFormData] = useState({
    // Patient form
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    patientAge: '',
    patientGender: '',
    
    // Appointment form
    appointmentPatient: '',
    appointmentDoctor: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: '',
    
    // Doctor form
    doctorName: '',
    doctorEmail: '',
    doctorPhone: '',
    doctorSpecialization: '',
    doctorLicense: '',
    
    // Message form
    messageRecipient: '',
    messageSubject: '',
    messageContent: ''
  });

  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'patient', label: 'Add Patient', icon: FiUser, color: 'from-blue-500 to-blue-600' },
    { id: 'appointment', label: 'Schedule', icon: FiCalendar, color: 'from-green-500 to-green-600' },
    { id: 'doctor', label: 'Add Doctor', icon: FiUsers, color: 'from-purple-500 to-purple-600' },
    { id: 'message', label: 'Message', icon: FiMessageSquare, color: 'from-orange-500 to-orange-600' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form and close modal
      setFormData({
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        patientAge: '',
        patientGender: '',
        appointmentPatient: '',
        appointmentDoctor: '',
        appointmentDate: '',
        appointmentTime: '',
        appointmentType: '',
        doctorName: '',
        doctorEmail: '',
        doctorPhone: '',
        doctorSpecialization: '',
        doctorLicense: '',
        messageRecipient: '',
        messageSubject: '',
        messageContent: ''
      });
      
      onClose();
      alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} added successfully!`);
    } catch (error) {
      alert('Error adding item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'patient':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="patientEmail"
                  value={formData.patientEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="patient@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="patientPhone"
                  value={formData.patientPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="patientAge"
                  value={formData.patientAge}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="patientGender"
                  value={formData.patientGender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Adding Patient...
                </>
              ) : (
                <>
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Patient
                </>
              )}
            </button>
          </form>
        );

      case 'appointment':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                <select
                  name="appointmentPatient"
                  value={formData.appointmentPatient}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select patient</option>
                  <option value="John Smith">John Smith</option>
                  <option value="Sarah Johnson">Sarah Johnson</option>
                  <option value="Michael Brown">Michael Brown</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                <select
                  name="appointmentDoctor"
                  value={formData.appointmentDoctor}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select doctor</option>
                  <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                  <option value="Dr. Michael Brown">Dr. Michael Brown</option>
                  <option value="Dr. Emily Davis">Dr. Emily Davis</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
                <select
                  name="appointmentType"
                  value={formData.appointmentType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select type</option>
                  <option value="regular">Regular Checkup</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="emergency">Emergency</option>
                  <option value="consultation">Consultation</option>
                  <option value="surgery">Surgery</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Scheduling...
                </>
              ) : (
                <>
                  <FiCalendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </>
              )}
            </button>
          </form>
        );

      case 'doctor':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Dr. John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="doctorEmail"
                  value={formData.doctorEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="doctor@hospital.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="doctorPhone"
                  value={formData.doctorPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <select
                  name="doctorSpecialization"
                  value={formData.doctorSpecialization}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select specialization</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="General Medicine">General Medicine</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                <input
                  type="text"
                  name="doctorLicense"
                  value={formData.doctorLicense}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="MD123456"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Adding Doctor...
                </>
              ) : (
                <>
                  <FiUsers className="w-4 h-4 mr-2" />
                  Add Doctor
                </>
              )}
            </button>
          </form>
        );

      case 'message':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
              <select
                name="messageRecipient"
                value={formData.messageRecipient}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select recipient</option>
                <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                <option value="Dr. Michael Brown">Dr. Michael Brown</option>
                <option value="Nursing Staff">Nursing Staff</option>
                <option value="Lab Department">Lab Department</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                name="messageSubject"
                value={formData.messageSubject}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter message subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="messageContent"
                value={formData.messageContent}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                placeholder="Type your message here..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <FiMessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        {/* Modal panel */}
        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
          {/* Modal header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Quick Add</h3>
                <p className="text-indigo-100 text-sm">Quickly add patients, appointments, doctors, or send messages</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-4 gap-1 p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r ' + tab.color + ' text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form content */}
          <div className="p-6">
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;
