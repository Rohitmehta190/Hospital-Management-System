import React, { useState } from 'react';
import { FiCalendar, FiChevronLeft, FiChevronRight, FiClock, FiUsers } from 'react-icons/fi';

const AppointmentCalendar = ({ appointments, onDateSelect, onAppointmentClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    
    return appointments.filter(apt => {
      const aptDate = new Date(apt.appointment_date);
      return aptDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateSelect && onDateSelect(date);
  };

  const handleAppointmentClick = (appointment, e) => {
    e.stopPropagation();
    onAppointmentClick && onAppointmentClick(appointment);
  };

  const monthYear = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <FiCalendar className="w-6 h-6 mr-2 text-indigo-600" />
          {monthYear}
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            Today
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Week day headers */}
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((date, index) => {
          const dayAppointments = date ? getAppointmentsForDate(date) : [];
          const isToday = date && date.toDateString() === new Date().toDateString();
          const isSelected = date && date.toDateString() === selectedDate.toDateString();
          const isCurrentMonth = date && date.getMonth() === currentDate.getMonth();

          return (
            <div
              key={index}
              onClick={() => date && handleDateClick(date)}
              className={`
                min-h-[80px] border rounded-lg p-2 transition-all duration-200
                ${!date ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md cursor-pointer'}
                ${isToday ? 'ring-2 ring-indigo-500' : ''}
                ${isSelected ? 'bg-indigo-50 border-indigo-500' : ''}
                ${!isCurrentMonth ? 'opacity-50' : ''}
              `}
            >
              {date && (
                <>
                  <div className={`text-sm font-medium ${isToday ? 'text-indigo-600' : 'text-gray-900'}`}>
                    {date.getDate()}
                  </div>
                  
                  {/* Appointment indicators */}
                  {dayAppointments.length > 0 && (
                    <div className="mt-1 space-y-1">
                      {dayAppointments.slice(0, 3).map((apt, aptIndex) => (
                        <div
                          key={aptIndex}
                          onClick={(e) => handleAppointmentClick(apt, e)}
                          className={`
                            text-xs px-1 py-0.5 rounded truncate cursor-pointer
                            ${apt.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                            ${apt.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : ''}
                            ${apt.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
                            ${apt.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' : ''}
                          `}
                        >
                          {new Date(apt.appointment_date).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      ))}
                      {dayAppointments.length > 3 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{dayAppointments.length - 3} more
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-indigo-900">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h4>
            <div className="flex items-center text-indigo-700">
              <FiClock className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">
                {getAppointmentsForDate(selectedDate).length} appointments
              </span>
            </div>
          </div>
          
          {getAppointmentsForDate(selectedDate).length > 0 ? (
            <div className="space-y-2">
              {getAppointmentsForDate(selectedDate).map(apt => (
                <div
                  key={apt.id}
                  onClick={() => onAppointmentClick && onAppointmentClick(apt)}
                  className="bg-white p-3 rounded-lg border border-indigo-200 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(apt.appointment_date).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div className="text-sm text-gray-600">
                        Patient ID: {apt.patient_id}
                      </div>
                    </div>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${apt.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                      ${apt.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : ''}
                      ${apt.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                      ${apt.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : ''}
                    `}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">
              No appointments scheduled for this date
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
