import React, { useState, useEffect } from 'react';
import { FiX, FiUser, FiCalendar, FiUsers, FiPlus, FiSearch, FiClock, FiMessageSquare, FiFileText, FiActivity, FiCheckCircle, FiAlertCircle, FiFolder, FiEye } from 'react-icons/fi';
import api from '../services/api';

const QuickAddModal = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('patient');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Patient form
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    
    // Appointment form
    patient_id: '',
    doctor_id: '',
    appointment_date: '',
    appointment_time: '',
    appointment_type: 'regular',
    reason: '',
    
    // Doctor form
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    specialization: '',
    license_number: '',
    experience: '',
    education: '',
    availability: 'full-time',
    
    // Reports form
    report_type: '',
    patient_id_report: '',
    doctor_id_report: '',
    report_date: '',
    report_content: '',
    
    // Activity form
    activity_type: '',
    activity_description: '',
    activity_date: '',
    activity_time: '',
    
    // Message form
    recipient: '',
    subject: '',
    content: ''
  });

  const tabs = [
    { id: 'patient', label: 'Add Patient', icon: FiUser, color: 'from-blue-500 to-blue-600' },
    { id: 'appointment', label: 'Book Appointment', icon: FiCalendar, color: 'from-green-500 to-green-600' },
    { id: 'view-appointments', label: 'View Appointments', icon: FiEye, color: 'from-cyan-500 to-cyan-600' },
    { id: 'doctor', label: 'Add Doctor', icon: FiUsers, color: 'from-purple-500 to-purple-600' },
    { id: 'records', label: 'View Records', icon: FiFolder, color: 'from-teal-500 to-teal-600' },
    { id: 'reports', label: 'Reports', icon: FiFileText, color: 'from-indigo-500 to-indigo-600' },
    { id: 'activity', label: 'Activity', icon: FiActivity, color: 'from-pink-500 to-pink-600' },
    { id: 'message', label: 'Message', icon: FiMessageSquare, color: 'from-orange-500 to-orange-600' }
  ];

  // Fetch data for dropdowns
  useEffect(() => {
    if (isOpen) {
      fetchPatientsAndDoctors();
    }
  }, [isOpen]);

  // Auto-load data when records or view-appointments tab is selected
  useEffect(() => {
    if (isOpen && (activeTab === 'records' || activeTab === 'view-appointments')) {
      fetchPatientsAndDoctors();
    }
  }, [activeTab, isOpen]);

  const fetchPatientsAndDoctors = async () => {
    setDataLoading(true);
    setErrorMessage('');
    try {
      const [patientsResponse, doctorsResponse, appointmentsResponse] = await Promise.all([
        api.get('/patients'),
        api.get('/doctors'),
        api.get('/appointments')
      ]);
      setPatients(patientsResponse.data || []);
      setDoctors(doctorsResponse.data || []);
      setAppointments(appointmentsResponse.data || []);
      if (activeTab === 'records') {
        setSuccessMessage('Records loaded successfully!');
      } else if (activeTab === 'view-appointments') {
        setSuccessMessage('Appointments loaded successfully!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Failed to load data. Please try again.');
    } finally {
      setDataLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear messages when user starts typing
    setSuccessMessage('');
    setErrorMessage('');
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      date_of_birth: '',
      gender: '',
      patient_id: '',
      doctor_id: '',
      appointment_date: '',
      appointment_time: '',
      appointment_type: 'regular',
      reason: '',
      specialization: '',
      license_number: '',
      experience: '',
      education: '',
      availability: 'full-time',
      report_type: '',
      patient_id_report: '',
      doctor_id_report: '',
      report_date: '',
      report_content: '',
      activity_type: '',
      activity_description: '',
      activity_date: '',
      activity_time: '',
      recipient: '',
      subject: '',
      content: ''
    });
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      let response;
      
      switch (activeTab) {
        case 'patient':
          // Create patient data
          const patientData = {
            user_id: 1, // Should come from auth
            first_name: formData.first_name,
            last_name: formData.last_name,
            date_of_birth: formData.date_of_birth,
            gender: formData.gender,
            phone: formData.phone,
            email: formData.email
          };
          response = await api.post('/patients', patientData);
          setSuccessMessage('Patient added successfully!');
          break;

        case 'appointment':
          // Create appointment data
          const appointmentDateTime = `${formData.appointment_date} ${formData.appointment_time}`;
          const appointmentData = {
            patient_id: parseInt(formData.patient_id),
            doctor_id: parseInt(formData.doctor_id),
            appointment_date: appointmentDateTime,
            reason: formData.reason || 'Regular checkup',
            status: 'scheduled',
            notes: ''
          };
          response = await api.post('/appointments', appointmentData);
          setSuccessMessage('Appointment scheduled successfully!');
          break;

        case 'doctor':
          // Create doctor data
          const doctorData = {
            user_id: 1, // Should come from auth
            first_name: formData.first_name,
            last_name: formData.last_name,
            specialization: formData.specialization,
            license_number: formData.license_number,
            phone: formData.phone,
            email: formData.email,
            experience: formData.experience,
            education: formData.education,
            availability: formData.availability
          };
          response = await api.post('/doctors', doctorData);
          setSuccessMessage('Doctor added successfully!');
          break;

        case 'reports':
          // Create report data (simulated - would integrate with reports API)
          await new Promise(resolve => setTimeout(resolve, 1000));
          setSuccessMessage('Report generated successfully!');
          break;

        case 'records':
          // View records functionality - no submission needed, just display
          setSuccessMessage('Records loaded successfully!');
          break;

        case 'view-appointments':
          // View appointments functionality - no submission needed, just display
          setSuccessMessage('Appointments loaded successfully!');
          break;

        case 'activity':
          // Log activity data (simulated - would integrate with activity logging API)
          await new Promise(resolve => setTimeout(resolve, 1000));
          setSuccessMessage('Activity logged successfully!');
          break;

        case 'message':
          // Simulate message sending (in real app, this would integrate with a messaging system)
          await new Promise(resolve => setTimeout(resolve, 1000));
          setSuccessMessage('Message sent successfully!');
          break;

        default:
          throw new Error('Invalid tab');
      }

      // Reset form after successful submission
      setTimeout(() => {
        resetForm();
        if (activeTab !== 'message' && activeTab !== 'reports' && activeTab !== 'activity' && activeTab !== 'records' && activeTab !== 'view-appointments') {
          onClose();
        }
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.response?.data?.error || `Failed to ${activeTab}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'patient':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Success/Error Messages */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <p className="text-green-800 text-sm">{successMessage}</p>
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                <FiAlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-red-800 text-sm">{errorMessage}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
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
            {/* Success/Error Messages */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <p className="text-green-800 text-sm">{successMessage}</p>
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                <FiAlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-red-800 text-sm">{errorMessage}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                <select
                  name="patient_id"
                  value={formData.patient_id}
                  onChange={handleInputChange}
                  required
                  disabled={dataLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">
                    {dataLoading ? 'Loading patients...' : 'Select patient'}
                  </option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.first_name} {patient.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                <select
                  name="doctor_id"
                  value={formData.doctor_id}
                  onChange={handleInputChange}
                  required
                  disabled={dataLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">
                    {dataLoading ? 'Loading doctors...' : 'Select doctor'}
                  </option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      Dr. {doctor.first_name} {doctor.last_name} - {doctor.specialization}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  name="appointment_time"
                  value={formData.appointment_time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter reason for appointment"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || dataLoading}
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
            {/* Success/Error Messages */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <p className="text-green-800 text-sm">{successMessage}</p>
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                <FiAlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-red-800 text-sm">{errorMessage}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Dr. John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select specialization</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Psychiatry">Psychiatry</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Gynecology">Gynecology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                <input
                  type="text"
                  name="license_number"
                  value={formData.license_number}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="MD123456"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select experience</option>
                  <option value="0-2 years">0-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="6-10 years">6-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="consultant">Consultant</option>
                  <option value="on-call">On Call</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Education & Qualifications</label>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Enter education details and qualifications"
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
            {/* Success/Error Messages */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <p className="text-green-800 text-sm">{successMessage}</p>
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                <FiAlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-red-800 text-sm">{errorMessage}</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
              <select
                name="recipient"
                value={formData.recipient}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select recipient</option>
                <optgroup label="Doctors">
                  {doctors.map(doctor => (
                    <option key={`doctor-${doctor.id}`} value={`Dr. ${doctor.first_name} ${doctor.last_name}`}>
                      Dr. {doctor.first_name} {doctor.last_name} ({doctor.specialization})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Departments">
                  <option value="Nursing Staff">Nursing Staff</option>
                  <option value="Lab Department">Lab Department</option>
                  <option value="Radiology Department">Radiology Department</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Emergency Department">Emergency Department</option>
                  <option value="Administration">Administration</option>
                </optgroup>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter message subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="content"
                value={formData.content}
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

      case 'reports':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Success/Error Messages */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <p className="text-green-800 text-sm">{successMessage}</p>
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                <FiAlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-red-800 text-sm">{errorMessage}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                <select
                  name="report_type"
                  value={formData.report_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select report type</option>
                  <option value="medical">Medical Report</option>
                  <option value="lab">Lab Results</option>
                  <option value="prescription">Prescription</option>
                  <option value="discharge">Discharge Summary</option>
                  <option value="billing">Billing Report</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                <select
                  name="patient_id_report"
                  value={formData.patient_id_report}
                  onChange={handleInputChange}
                  required
                  disabled={dataLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">
                    {dataLoading ? 'Loading patients...' : 'Select patient'}
                  </option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.first_name} {patient.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                <select
                  name="doctor_id_report"
                  value={formData.doctor_id_report}
                  onChange={handleInputChange}
                  disabled={dataLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">
                    {dataLoading ? 'Loading doctors...' : 'Select doctor'}
                  </option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      Dr. {doctor.first_name} {doctor.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Date</label>
                <input
                  type="date"
                  name="report_date"
                  value={formData.report_date}
                  onChange={handleInputChange}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Content</label>
                <textarea
                  name="report_content"
                  value={formData.report_content}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Enter report details and findings..."
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating Report...
                </>
              ) : (
                <>
                  <FiFileText className="w-4 h-4 mr-2" />
                  Generate Report
                </>
              )}
            </button>
          </form>
        );

      case 'activity':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Success/Error Messages */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <p className="text-green-800 text-sm">{successMessage}</p>
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                <FiAlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-red-800 text-sm">{errorMessage}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
                <select
                  name="activity_type"
                  value={formData.activity_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select activity type</option>
                  <option value="patient_visit">Patient Visit</option>
                  <option value="surgery">Surgery</option>
                  <option value="emergency">Emergency Case</option>
                  <option value="consultation">Consultation</option>
                  <option value="follow_up">Follow-up</option>
                  <option value="medication">Medication Administered</option>
                  <option value="lab_test">Lab Test</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="activity_date"
                  value={formData.activity_date}
                  onChange={handleInputChange}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  name="activity_time"
                  value={formData.activity_time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Activity Description</label>
                <textarea
                  name="activity_description"
                  value={formData.activity_description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                  placeholder="Describe the activity in detail..."
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-lg hover:from-pink-700 hover:to-pink-800 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Logging Activity...
                </>
              ) : (
                <>
                  <FiActivity className="w-4 h-4 mr-2" />
                  Log Activity
                </>
              )}
            </button>
          </form>
        );

      case 'records':
        return (
          <div className="space-y-4">
            {/* Success/Error Messages */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <p className="text-green-800 text-sm">{successMessage}</p>
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                <FiAlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-red-800 text-sm">{errorMessage}</p>
              </div>
            )}
            
            {/* Load Records Button */}
            <button
              onClick={fetchPatientsAndDoctors}
              disabled={dataLoading}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 disabled:opacity-50"
            >
              {dataLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Loading Records...
                </>
              ) : (
                <>
                  <FiEye className="w-4 h-4 mr-2" />
                  Load All Records
                </>
              )}
            </button>
            
            <div className="space-y-6">
              {/* Patients Records */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FiUser className="w-5 h-5 mr-2 text-blue-500" />
                  Patient Records ({patients.length})
                </h3>
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                  {dataLoading ? (
                    <div className="p-4 text-center text-gray-500">Loading patients...</div>
                  ) : patients.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {patients.map(patient => (
                        <div key={patient.id} className="p-3 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">
                                {patient.first_name} {patient.last_name}
                              </p>
                              <p className="text-sm text-gray-600">{patient.email}</p>
                              <p className="text-sm text-gray-500">{patient.phone}</p>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              ID: {patient.id}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">No patients found</div>
                  )}
                </div>
              </div>

              {/* Doctors Records */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FiUsers className="w-5 h-5 mr-2 text-purple-500" />
                  Doctor Records ({doctors.length})
                </h3>
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                  {dataLoading ? (
                    <div className="p-4 text-center text-gray-500">Loading doctors...</div>
                  ) : doctors.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {doctors.map(doctor => (
                        <div key={doctor.id} className="p-3 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">
                                Dr. {doctor.first_name} {doctor.last_name}
                              </p>
                              <p className="text-sm text-gray-600">{doctor.specialization}</p>
                              <p className="text-sm text-gray-500">{doctor.email}</p>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                              {doctor.specialization}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">No doctors found</div>
                  )}
                </div>
              </div>

              {/* Appointments Records */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FiCalendar className="w-5 h-5 mr-2 text-green-500" />
                  Appointment Records ({appointments.length})
                </h3>
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                  {dataLoading ? (
                    <div className="p-4 text-center text-gray-500">Loading appointments...</div>
                  ) : appointments.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {appointments.map(appointment => (
                        <div key={appointment.id} className="p-3 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">
                                {appointment.patient_name} - Dr. {appointment.doctor_name}
                              </p>
                              <p className="text-sm text-gray-600">{appointment.reason}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(appointment.appointment_date).toLocaleString()}
                              </p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              appointment.status === 'scheduled' 
                                ? 'bg-green-100 text-green-800'
                                : appointment.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">No appointments found</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'view-appointments':
        return (
          <div className="space-y-4">
            {/* Success/Error Messages */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <p className="text-green-800 text-sm">{successMessage}</p>
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                <FiAlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-red-800 text-sm">{errorMessage}</p>
              </div>
            )}
            
            {/* Load Appointments Button */}
            <button
              onClick={fetchPatientsAndDoctors}
              disabled={dataLoading}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-all duration-200 disabled:opacity-50"
            >
              {dataLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Loading Appointments...
                </>
              ) : (
                <>
                  <FiEye className="w-4 h-4 mr-2" />
                  View All Appointments
                </>
              )}
            </button>
            
            {/* Appointments List */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <FiCalendar className="w-5 h-5 mr-2 text-cyan-500" />
                All Appointments ({appointments.length})
              </h3>
              <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
                {dataLoading ? (
                  <div className="p-4 text-center text-gray-500">Loading appointments...</div>
                ) : appointments.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {appointments.map(appointment => (
                      <div key={appointment.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className="font-medium text-gray-900 mr-2">
                                {appointment.patient_name}
                              </span>
                              <span className="text-gray-500">→</span>
                              <span className="font-medium text-gray-900 ml-2">
                                Dr. {appointment.doctor_name}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{appointment.reason}</p>
                            <p className="text-sm text-gray-500">
                              📅 {new Date(appointment.appointment_date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              🕐 {new Date(appointment.appointment_date).toLocaleTimeString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            appointment.status === 'scheduled' 
                              ? 'bg-green-100 text-green-800'
                              : appointment.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : appointment.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                        {appointment.notes && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                            <strong>Notes:</strong> {appointment.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <FiCalendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No appointments found</p>
                    <p className="text-sm text-gray-400 mt-1">Book your first appointment to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
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
            <div className="grid grid-cols-8 gap-1 p-2">
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
