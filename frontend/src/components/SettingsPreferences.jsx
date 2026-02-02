import React, { useState } from 'react';
import { FiMonitor, FiMoon, FiSun, FiBell, FiGlobe, FiMail, FiSmartphone } from 'react-icons/fi';

const SettingsPreferences = ({ user }) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('english');
  const [timezone, setTimezone] = useState('UTC-5');
  const [emailNotifications, setEmailNotifications] = useState({
    appointments: true,
    reports: true,
    updates: false,
    marketing: false
  });
  const [pushNotifications, setPushNotifications] = useState({
    appointments: true,
    messages: true,
    alerts: true
  });
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [timeFormat, setTimeFormat] = useState('12h');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const themes = [
    { id: 'light', name: 'Light', icon: FiSun, description: 'Clean and bright interface' },
    { id: 'dark', name: 'Dark', icon: FiMoon, description: 'Easy on the eyes' },
    { id: 'auto', name: 'Auto', icon: FiMonitor, description: 'Follows system preference' }
  ];

  const languages = [
    { code: 'english', name: 'English' },
    { code: 'spanish', name: 'Español' },
    { code: 'french', name: 'Français' },
    { code: 'german', name: 'Deutsch' },
    { code: 'chinese', name: '中文' }
  ];

  const timezones = [
    { value: 'UTC-12', name: 'UTC-12:00 Baker Island' },
    { value: 'UTC-8', name: 'UTC-08:00 Pacific Time' },
    { value: 'UTC-5', name: 'UTC-05:00 Eastern Time' },
    { value: 'UTC+0', name: 'UTC+00:00 London' },
    { value: 'UTC+5:30', name: 'UTC+05:30 India' },
    { value: 'UTC+8', name: 'UTC+08:00 Beijing' }
  ];

  const handleEmailNotificationChange = (type) => {
    setEmailNotifications({
      ...emailNotifications,
      [type]: !emailNotifications[type]
    });
  };

  const handlePushNotificationChange = (type) => {
    setPushNotifications({
      ...pushNotifications,
      [type]: !pushNotifications[type]
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Preferences saved successfully!');
      setMessageType('success');
    } catch (error) {
      setMessage('Error saving preferences. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Appearance Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <FiMonitor className="w-5 h-5 mr-2 text-indigo-600" />
          Appearance
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Theme</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {themes.map((themeOption) => {
                const Icon = themeOption.icon;
                return (
                  <button
                    key={themeOption.id}
                    onClick={() => setTheme(themeOption.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      theme === themeOption.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${
                      theme === themeOption.id ? 'text-indigo-600' : 'text-gray-400'
                    }`} />
                    <h4 className="font-medium text-gray-900">{themeOption.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{themeOption.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Format
              </label>
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="DD.MM.YYYY">DD.MM.YYYY</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Format
              </label>
              <select
                value={timeFormat}
                onChange={(e) => setTimeFormat(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="12h">12-hour (AM/PM)</option>
                <option value="24h">24-hour</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <FiGlobe className="w-5 h-5 mr-2 text-indigo-600" />
          Regional Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <FiBell className="w-5 h-5 mr-2 text-indigo-600" />
          Notifications
        </h3>

        <div className="space-y-6">
          {/* Email Notifications */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4 flex items-center">
              <FiMail className="w-4 h-4 mr-2" />
              Email Notifications
            </h4>
            <div className="space-y-3">
              {Object.entries(emailNotifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {key === 'appointments' && 'Appointment Reminders'}
                      {key === 'reports' && 'Weekly Reports'}
                      {key === 'updates' && 'Product Updates'}
                      {key === 'marketing' && 'Marketing Emails'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {key === 'appointments' && 'Get notified about upcoming appointments'}
                      {key === 'reports' && 'Receive weekly hospital performance reports'}
                      {key === 'updates' && 'Stay updated with new features and improvements'}
                      {key === 'marketing' && 'Receive promotional offers and announcements'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEmailNotificationChange(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Push Notifications */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4 flex items-center">
              <FiSmartphone className="w-4 h-4 mr-2" />
              Push Notifications
            </h4>
            <div className="space-y-3">
              {Object.entries(pushNotifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {key === 'appointments' && 'Appointment Alerts'}
                      {key === 'messages' && 'New Messages'}
                      {key === 'alerts' && 'System Alerts'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {key === 'appointments' && 'Instant alerts for appointment changes'}
                      {key === 'messages' && 'Notifications for new patient messages'}
                      {key === 'alerts' && 'Important system and security notifications'}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePushNotificationChange(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center ${
          messageType === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {messageType === 'success' ? (
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          {message}
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Saving...
            </>
          ) : (
            'Save Preferences'
          )}
        </button>
      </div>
    </div>
  );
};

export default SettingsPreferences;
