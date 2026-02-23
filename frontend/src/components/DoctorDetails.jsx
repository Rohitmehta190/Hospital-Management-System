import React from 'react';
import { FiX, FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiAward, FiBriefcase, FiClock, FiEdit, FiTrash2, FiStar, FiCheckCircle } from 'react-icons/fi';

const DoctorDetails = ({ doctor, onClose, onEdit, onDelete, onSchedule }) => {
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getRating = () => {
    // Generate random rating for demo
    return (4.0 + Math.random()).toFixed(1);
  };

  const getAvailability = () => {
    const hours = new Date().getHours();
    if (hours >= 9 && hours <= 17) return 'Available';
    if (hours >= 18 && hours <= 20) return 'Busy';
    return 'Off Duty';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': return 'bg-yellow-100 text-yellow-800';
      case 'Off Duty': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityBadge = (availability) => {
    switch (availability) {
      case 'full-time': return 'bg-blue-100 text-blue-800';
      case 'part-time': return 'bg-purple-100 text-purple-800';
      case 'consultant': return 'bg-indigo-100 text-indigo-800';
      case 'on-call': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        {/* Modal panel */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                  <span className="text-4xl font-bold text-white">
                    {getInitials(doctor.first_name, doctor.last_name)}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">
                    Dr. {doctor.first_name} {doctor.last_name}
                  </h2>
                  <p className="text-teal-100 text-lg mb-3">{doctor.specialization}</p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <FiStar className="w-5 h-5 text-yellow-300 fill-current mr-1" />
                      <span className="text-teal-100">{getRating()} Rating</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(getAvailability())}`}>
                      {getAvailability()}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityBadge(doctor.availability)}`}>
                      {doctor.availability || 'Full Time'}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 text-white hover:text-teal-100 rounded-lg hover:bg-white/20 transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FiUser className="w-5 h-5 mr-2 text-teal-600" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <FiPhone className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm font-semibold text-gray-900">{doctor.phone || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                          <FiMail className="w-5 h-5 text-cyan-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm font-semibold text-gray-900 truncate">{doctor.email || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FiBriefcase className="w-5 h-5 mr-2 text-teal-600" />
                    Professional Information
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FiAward className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">License Number</p>
                          <p className="text-sm font-semibold text-gray-900">{doctor.license_number}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FiCalendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">Experience</p>
                          <p className="text-sm font-semibold text-gray-900">{doctor.experience || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FiClock className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">Working Hours</p>
                          <p className="text-sm font-semibold text-gray-900">9:00 AM - 5:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education & Qualifications */}
                {doctor.education && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <FiAward className="w-5 h-5 mr-2 text-teal-600" />
                      Education & Qualifications
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{doctor.education}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => onSchedule(doctor)}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-200"
                    >
                      <FiCalendar className="w-5 h-5 mr-2" />
                      Book Appointment
                    </button>
                    <button
                      onClick={() => onEdit(doctor)}
                      className="w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <FiEdit className="w-5 h-5 mr-2" />
                      Edit Doctor
                    </button>
                    <button
                      onClick={() => onDelete(doctor.id)}
                      className="w-full flex items-center justify-center px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5 mr-2" />
                      Delete Doctor
                    </button>
                  </div>
                </div>

                {/* Specialization & Stats */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Specialization</h3>
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <p className="text-teal-800 font-medium">{doctor.specialization}</p>
                  </div>
                </div>

                {/* Status Overview */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Status Overview</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Status</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(getAvailability())}`}>
                        {getAvailability()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Availability</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityBadge(doctor.availability)}`}>
                        {doctor.availability || 'Full Time'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Patient Rating</span>
                      <div className="flex items-center">
                        <FiStar className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm font-medium">{getRating()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
