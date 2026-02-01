import React from 'react';
import { FiUser, FiPhone, FiMail, FiCalendar, FiMapPin, FiEdit, FiTrash2, FiEye, FiClock, FiStar } from 'react-icons/fi';

const DoctorCard = ({ doctor, onEdit, onDelete, onView, onSchedule }) => {
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

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Doctor Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <span className="text-2xl font-bold text-white">
                {getInitials(doctor.first_name, doctor.last_name)}
              </span>
            </div>
            <div className="text-white">
              <h3 className="text-xl font-bold">
                Dr. {doctor.first_name} {doctor.last_name}
              </h3>
              <p className="text-teal-100 text-sm">{doctor.specialization}</p>
              <div className="flex items-center mt-1">
                <FiStar className="w-4 h-4 text-yellow-300 fill-current" />
                <span className="ml-1 text-sm text-teal-100">{getRating()} Rating</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onView(doctor)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
              title="View Details"
            >
              <FiEye className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => onSchedule(doctor)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
              title="Schedule Appointment"
            >
              <FiCalendar className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => onEdit(doctor)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
              title="Edit Doctor"
            >
              <FiEdit className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => onDelete(doctor.id)}
              className="p-2 bg-red-500/80 backdrop-blur-sm rounded-lg hover:bg-red-600 transition-colors"
              title="Delete Doctor"
            >
              <FiTrash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Doctor Details */}
      <div className="p-6 space-y-4">
        {/* Availability Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Current Status</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(getAvailability())}`}>
            {getAvailability()}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <FiPhone className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm font-semibold text-gray-900">{doctor.phone || 'Not provided'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
              <FiMail className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">{doctor.email || 'Not provided'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiCalendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">License Number</p>
              <p className="text-sm font-semibold text-gray-900">{doctor.license_number}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiClock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Working Hours</p>
              <p className="text-sm font-semibold text-gray-900">9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        {/* Specialization Badge */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
              {doctor.specialization}
            </span>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              {doctor.experience || '5+ Years'} Experience
            </span>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default DoctorCard;
