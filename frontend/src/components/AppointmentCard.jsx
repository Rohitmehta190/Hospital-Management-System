import React from 'react';
import { FiCalendar, FiClock, FiUser, FiPhone, FiEdit, FiTrash2, FiCheck, FiX, FiMessageSquare, FiVideo } from 'react-icons/fi';

const AppointmentCard = ({ appointment, patients, doctors, onEdit, onDelete, onComplete, onCancel, onReschedule }) => {
  const patient = patients.find(p => p.id === appointment.patient_id);
  const doctor = doctors.find(d => d.id === appointment.doctor_id);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      day: date.toLocaleDateString('en-US', { weekday: 'short' })
    };
  };

  const dateTime = formatDateTime(appointment.appointment_date);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Appointment Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-white">
              <div className="flex items-center space-x-2 mb-1">
                <FiCalendar className="w-4 h-4" />
                <span className="text-sm font-medium">{dateTime.day}</span>
              </div>
              <div className="text-2xl font-bold">{dateTime.date}</div>
              <div className="flex items-center space-x-2 mt-1">
                <FiClock className="w-4 h-4" />
                <span className="text-lg font-semibold">{dateTime.time}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
              {appointment.status}
            </span>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(appointment.priority || 'medium')}`}></div>
              <span className="text-xs text-white capitalize">{appointment.priority || 'medium'} priority</span>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="p-6 space-y-4">
        {/* Patient & Doctor Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FiUser className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Patient</p>
              <p className="text-sm font-semibold text-gray-900">
                {patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown Patient'}
              </p>
              {patient?.phone && (
                <div className="flex items-center mt-1">
                  <FiPhone className="w-3 h-3 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-600">{patient.phone}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FiUser className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Doctor</p>
              <p className="text-sm font-semibold text-gray-900">
                Dr. {doctor ? `${doctor.first_name} ${doctor.last_name}` : 'Unknown Doctor'}
              </p>
              {doctor?.specialization && (
                <p className="text-xs text-gray-600 mt-1">{doctor.specialization}</p>
              )}
            </div>
          </div>
        </div>

        {/* Reason for Visit */}
        {appointment.reason && (
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs font-medium text-gray-500 mb-1">Reason for Visit</p>
            <p className="text-sm text-gray-700 line-clamp-2">{appointment.reason}</p>
          </div>
        )}

        {/* Notes */}
        {appointment.notes && (
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs font-medium text-blue-600 mb-1">Notes</p>
            <p className="text-sm text-blue-700 line-clamp-2">{appointment.notes}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-2">
            {appointment.status === 'scheduled' && (
              <>
                <button
                  onClick={() => onComplete(appointment.id)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Mark as Completed"
                >
                  <FiCheck className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onReschedule(appointment)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Reschedule"
                >
                  <FiCalendar className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onCancel(appointment.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Cancel Appointment"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={() => onEdit(appointment)}
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              title="Edit Appointment"
            >
              <FiEdit className="w-4 h-4" />
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="Send Message"
            >
              <FiMessageSquare className="w-4 h-4" />
            </button>
            <button
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              title="Video Call"
            >
              <FiVideo className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default AppointmentCard;
