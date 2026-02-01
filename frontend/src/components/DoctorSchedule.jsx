import React, { useState } from 'react';
import { FiCalendar, FiClock, FiUser, FiCheck, FiX, FiEdit, FiPlus } from 'react-icons/fi';

const DoctorSchedule = ({ doctor, onClose, onBookAppointment }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('');

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isBooked = Math.random() > 0.7; // Random booking for demo
        slots.push({ time, isBooked });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = () => {
    if (selectedTime) {
      onBookAppointment({
        doctor,
        date: selectedDate,
        time: selectedTime
      });
    }
  };

  const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: date.getDate()
      });
    }
    return dates;
  };

  const weekDates = getWeekDates();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        {/* Modal panel */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Dr. {doctor.first_name} {doctor.last_name}</h2>
                <p className="text-teal-100">{doctor.specialization}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white hover:text-teal-100 rounded-lg hover:bg-white/20 transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
              <div className="grid grid-cols-7 gap-2">
                {weekDates.map((dateInfo) => (
                  <button
                    key={dateInfo.date}
                    onClick={() => setSelectedDate(dateInfo.date)}
                    className={`p-3 rounded-lg text-center transition-colors ${
                      selectedDate === dateInfo.date
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-xs font-medium">{dateInfo.day}</div>
                    <div className="text-lg font-bold">{dateInfo.dateNum}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Time Slots</h3>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => !slot.isBooked && handleTimeSelect(slot.time)}
                    disabled={slot.isBooked}
                    className={`p-3 rounded-lg text-center transition-colors ${
                      slot.isBooked
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : selectedTime === slot.time
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <FiClock className="w-4 h-4 mr-1" />
                      {slot.time}
                    </div>
                    {slot.isBooked && (
                      <div className="text-xs mt-1">Booked</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Appointment Summary */}
            {selectedTime && (
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-teal-900 mb-2">Appointment Summary</h4>
                <div className="space-y-1 text-sm text-teal-700">
                  <div className="flex items-center">
                    <FiUser className="w-4 h-4 mr-2" />
                    Dr. {doctor.first_name} {doctor.last_name}
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    {new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center">
                    <FiClock className="w-4 h-4 mr-2" />
                    {selectedTime}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleBookAppointment}
                disabled={!selectedTime}
                className="px-6 py-3 border border-transparent rounded-lg text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
