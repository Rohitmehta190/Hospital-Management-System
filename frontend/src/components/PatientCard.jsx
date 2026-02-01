import React from 'react';
import { FiUser, FiPhone, FiMail, FiCalendar, FiMapPin, FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

const PatientCard = ({ patient, onEdit, onDelete, onView }) => {
  const getAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Patient Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <span className="text-2xl font-bold text-white">
                {getInitials(patient.first_name, patient.last_name)}
              </span>
            </div>
            <div className="text-white">
              <h3 className="text-xl font-bold">
                {patient.first_name} {patient.last_name}
              </h3>
              <p className="text-blue-100 text-sm">ID: #{patient.id}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onView(patient)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
              title="View Details"
            >
              <FiEye className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => onEdit(patient)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
              title="Edit Patient"
            >
              <FiEdit className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => onDelete(patient.id)}
              className="p-2 bg-red-500/80 backdrop-blur-sm rounded-lg hover:bg-red-600 transition-colors"
              title="Delete Patient"
            >
              <FiTrash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Patient Details */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiCalendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Age</p>
              <p className="text-sm font-semibold text-gray-900">{getAge(patient.date_of_birth)} years</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiUser className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Gender</p>
              <p className="text-sm font-semibold text-gray-900 capitalize">{patient.gender}</p>
            </div>
          </div>

          {patient.phone && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FiPhone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-semibold text-gray-900">{patient.phone}</p>
              </div>
            </div>
          )}

          {patient.email && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <FiMail className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">{patient.email}</p>
              </div>
            </div>
          )}
        </div>

        {patient.address && (
          <div className="flex items-start space-x-3 pt-2 border-t border-gray-100">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FiMapPin className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-sm text-gray-700">{patient.address}</p>
            </div>
          </div>
        )}

        {patient.emergency_contact && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-red-800 mb-1">Emergency Contact</p>
            <p className="text-sm text-red-700">{patient.emergency_contact}</p>
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default PatientCard;
