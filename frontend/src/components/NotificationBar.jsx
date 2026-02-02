import React, { useState, useEffect } from 'react';
import { FiBell, FiX, FiCheck, FiAlertCircle, FiInfo, FiMessageSquare, FiCalendar, FiUser, FiActivity } from 'react-icons/fi';

const NotificationBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simulate fetching notifications
    const mockNotifications = [
      {
        id: 1,
        type: 'urgent',
        title: 'Emergency Appointment',
        message: 'New emergency appointment request from John Smith',
        time: '2 minutes ago',
        read: false,
        icon: FiAlertCircle,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      },
      {
        id: 2,
        type: 'appointment',
        title: 'Appointment Reminder',
        message: 'Your appointment with Dr. Sarah Johnson is tomorrow at 10:00 AM',
        time: '1 hour ago',
        read: false,
        icon: FiCalendar,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      },
      {
        id: 3,
        type: 'message',
        title: 'New Message',
        message: 'Dr. Michael Brown sent you a message regarding your test results',
        time: '3 hours ago',
        read: true,
        icon: FiMessageSquare,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      },
      {
        id: 4,
        type: 'system',
        title: 'System Update',
        message: 'Hospital management system will undergo maintenance tonight',
        time: '5 hours ago',
        read: true,
        icon: FiInfo,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200'
      },
      {
        id: 5,
        type: 'activity',
        title: 'Patient Update',
        message: 'Patient Sarah Johnson has been discharged',
        time: '1 day ago',
        read: true,
        icon: FiUser,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
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
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <FiBell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        )}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
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
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FiBell className="w-5 h-5" />
                  <h3 className="font-semibold">Notifications</h3>
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
              {unreadCount > 0 && (
                <p className="text-xs text-blue-100 mt-1">{unreadCount} unread notifications</p>
              )}
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
                        className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notification.bgColor} ${notification.borderColor} border`}>
                            <Icon className={`w-5 h-5 ${notification.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {notification.time}
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
