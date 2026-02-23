import React, { useState, useEffect, useRef } from 'react';
import { FiBell, FiX, FiCheck, FiAlertCircle, FiInfo, FiMessageSquare, FiCalendar, FiUser, FiActivity } from 'react-icons/fi';
import api from '../services/api';

const NotificationBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const intervalRef = useRef(null);

  // Update current time every second
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Generate dynamic notifications based on current time
  useEffect(() => {
    const generateDynamicNotifications = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const dayOfWeek = now.getDay();
      
      const dynamicNotifications = [];

      // Time-based notifications
      if (hour >= 9 && hour <= 17) {
        // Working hours notifications
        if (minute % 15 === 0) {
          dynamicNotifications.push({
            id: Date.now() + 1,
            type: 'appointment',
            title: 'Upcoming Appointment',
            message: `You have an appointment in ${15 - (minute % 15)} minutes`,
            time: 'Just now',
            read: false,
            icon: FiCalendar,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            timestamp: now
          });
        }
      }

      // Morning notifications
      if (hour === 9 && minute === 0) {
        dynamicNotifications.push({
          id: Date.now() + 2,
          type: 'system',
          title: 'Good Morning!',
          message: 'Welcome to a new day at Hospital Management System',
          time: 'Just now',
          read: false,
          icon: FiInfo,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          timestamp: now
        });
      }

      // Lunch time notification
      if (hour === 12 && minute === 0) {
        dynamicNotifications.push({
          id: Date.now() + 3,
          type: 'system',
          title: 'Lunch Break',
          message: 'Time for lunch! Remember to take a break.',
          time: 'Just now',
          read: false,
          icon: FiInfo,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          timestamp: now
        });
      }

      // End of day notification
      if (hour === 17 && minute === 0) {
        dynamicNotifications.push({
          id: Date.now() + 4,
          type: 'system',
          title: 'End of Day',
          message: 'Working hours are ending. Have a great evening!',
          time: 'Just now',
          read: false,
          icon: FiInfo,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          timestamp: now
        });
      }

      // Random emergency notifications (rare)
      if (Math.random() < 0.01) { // 1% chance every update
        dynamicNotifications.push({
          id: Date.now() + 5,
          type: 'urgent',
          title: 'Emergency Alert',
          message: 'New emergency case requires immediate attention',
          time: 'Just now',
          read: false,
          icon: FiAlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          timestamp: now
        });
      }

      // Weekend notifications
      if (dayOfWeek === 0 || dayOfWeek === 6) { // Saturday or Sunday
        if (hour === 10 && minute === 0) {
          dynamicNotifications.push({
            id: Date.now() + 6,
            type: 'system',
            title: 'Weekend Update',
            message: 'Weekend shift starting. Have a productive day!',
            time: 'Just now',
            read: false,
            icon: FiActivity,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            borderColor: 'border-indigo-200',
            timestamp: now
          });
        }
      }

      // Add some persistent notifications
      const persistentNotifications = [
        {
          id: 999,
          type: 'message',
          title: 'System Status',
          message: `Hospital system is running smoothly - ${currentTime.toLocaleTimeString()}`,
          time: 'Live',
          read: false,
          icon: FiMessageSquare,
          color: 'text-teal-600',
          bgColor: 'bg-teal-50',
          borderColor: 'border-teal-200',
          timestamp: now
        }
      ];

      const allNotifications = [...dynamicNotifications, ...persistentNotifications];
      setNotifications(allNotifications);
      setUnreadCount(allNotifications.filter(n => !n.read).length);
    };

    generateDynamicNotifications();
    
    // Update notifications every 30 seconds
    const notificationInterval = setInterval(generateDynamicNotifications, 30000);
    
    return () => {
      clearInterval(notificationInterval);
    };
  }, [currentTime]);

  // Calculate relative time
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000); // difference in seconds
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  // Update notification times
  useEffect(() => {
    const timer = setInterval(() => {
      setNotifications(prev => 
        prev.map(notification => ({
          ...notification,
          time: getRelativeTime(notification.timestamp || new Date())
        }))
      );
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    const deleted = notifications.find(n => n.id === id);
    if (deleted && !deleted.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <div className="relative">
      {/* Notification Button with Dynamic Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <FiBell className={`w-5 h-5 ${unreadCount > 0 ? 'animate-pulse' : ''}`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-20 overflow-hidden">
            {/* Header with Live Time */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FiBell className="w-5 h-5" />
                  <h3 className="font-semibold">Notifications</h3>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full animate-pulse">
                    LIVE
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-100 hover:text-white transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-blue-100">
                  {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
                </p>
                {unreadCount > 0 && (
                  <p className="text-xs text-blue-100 font-medium">{unreadCount} unread</p>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <FiBell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No notifications</p>
                  <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''} ${notification.type === 'urgent' ? 'border-l-4 border-red-500' : ''}`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notification.bgColor} ${notification.borderColor} border ${notification.type === 'urgent' ? 'animate-pulse' : ''}`}>
                            <Icon className={`w-5 h-5 ${notification.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                  {notification.type === 'urgent' && (
                                    <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full animate-pulse">
                                      URGENT
                                    </span>
                                  )}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1 flex items-center">
                                  {notification.time}
                                  {notification.time === 'Live' && (
                                    <span className="ml-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                  )}
                                </p>
                              </div>
                              <div className="flex items-center space-x-1 ml-2">
                                {!notification.read && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                    title="Mark as read"
                                  >
                                    <FiCheck className="w-4 h-4" />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                  title="Delete"
                                >
                                  <FiX className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={clearAll}
                  className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Clear all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBar;
