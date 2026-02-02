import React from 'react';
import { FiMenu, FiX, FiHome, FiUsers, FiUser, FiCalendar, FiActivity, FiSettings, FiLogOut, FiBell, FiSearch } from 'react-icons/fi';
import RoleSwitcher from './RoleSwitcher';
import LogoutModal from './LogoutModal';
import RoleBasedNav from './RoleBasedNav';
import AdminDashboard from '../pages/AdminDashboard';
import DoctorDashboard from '../pages/DoctorDashboard';
import PatientDashboard from '../pages/PatientDashboard';
import NotificationBar from './NotificationBar';
import QuickAddModal from './QuickAddModal';

const Layout = ({ children, user, currentPage, setCurrentPage, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const [showQuickAddModal, setShowQuickAddModal] = React.useState(false);
  const [currentRole, setCurrentRole] = React.useState(user?.role || 'admin');

  const handleRoleSwitch = (newRole) => {
    setCurrentRole(newRole);
    // Update user role in localStorage
    const updatedUser = { ...user, role: newRole };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    onLogout();
  };

  const renderRoleBasedDashboard = () => {
    switch (currentRole) {
      case 'admin':
        return <AdminDashboard user={user} />;
      case 'doctor':
        return <DoctorDashboard user={user} />;
      case 'patient':
        return <PatientDashboard user={user} />;
      default:
        return <AdminDashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">H</span>
            </div>
            <span className="ml-3 text-xl font-bold text-white">HospitalMS</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-blue-100 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>

          {/* Role-based Navigation */}
          <RoleBasedNav
            currentRole={currentRole}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          {/* Mobile Quick Add Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setShowQuickAddModal(true)}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Quick Add +
            </button>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-semibold text-sm">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.username || 'User'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'Guest'}</p>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <FiLogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center flex-1">
                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
                >
                  <FiMenu className="w-6 h-6" />
                </button>
                
                {/* Page Title */}
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900 capitalize">
                    {currentPage || 'Dashboard'}
                  </h1>
                  <span className="ml-3 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                    {user?.role || 'User'}
                  </span>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <NotificationBar user={user} />

                {/* Quick Actions */}
                <div className="hidden md:flex items-center space-x-2">
                  <button 
                    onClick={() => setShowQuickAddModal(true)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm"
                  >
                    Quick Add +
                  </button>
                </div>

                {/* User Avatar & Role Switcher */}
                <div className="hidden lg:flex items-center space-x-3">
                  <RoleSwitcher
                    user={user}
                    currentRole={currentRole}
                    onRoleSwitch={handleRoleSwitch}
                    onLogout={handleLogout}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {currentPage === 'dashboard' ? renderRoleBasedDashboard() : children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        user={user}
      />

      {/* Quick Add Modal */}
      <QuickAddModal
        isOpen={showQuickAddModal}
        onClose={() => setShowQuickAddModal(false)}
        user={user}
      />
    </div>
  );
};

export default Layout;
