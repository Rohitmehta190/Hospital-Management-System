import React, { useState } from 'react';
import { FiDownload, FiFilter, FiCalendar, FiFileText, FiTrendingUp, FiUsers, FiClock, FiDollarSign, FiTarget } from 'react-icons/fi';

const AnalyticsReports = ({ patients, doctors, appointments }) => {
  const [selectedReport, setSelectedReport] = useState('monthly');
  const [dateRange, setDateRange] = useState('this-month');

  const generateReportData = () => {
    const today = new Date();
    let startDate, endDate;

    switch (dateRange) {
      case 'today':
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        break;
      case 'this-week':
        startDate = new Date(today.setDate(today.getDate() - today.getDay()));
        endDate = new Date(today.setDate(today.getDate() - today.getDay() + 7));
        break;
      case 'this-month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'this-year':
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
      default:
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    }

    const filteredAppointments = appointments.filter(apt => {
      const aptDate = new Date(apt.appointment_date);
      return aptDate >= startDate && aptDate <= endDate;
    });

    const completed = filteredAppointments.filter(apt => apt.status === 'completed');
    const cancelled = filteredAppointments.filter(apt => apt.status === 'cancelled');
    const scheduled = filteredAppointments.filter(apt => apt.status === 'scheduled');

    const revenue = completed.length * 150;
    const completionRate = filteredAppointments.length > 0 ? ((completed.length / filteredAppointments.length) * 100).toFixed(1) : 0;

    return {
      total: filteredAppointments.length,
      completed: completed.length,
      cancelled: cancelled.length,
      scheduled: scheduled.length,
      revenue,
      completionRate,
      dateRange: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
      period: dateRange.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
    };
  };

  const reportData = generateReportData();

  const reports = [
    {
      id: 'monthly',
      name: 'Monthly Performance Report',
      description: 'Comprehensive monthly analytics including appointments, revenue, and patient metrics',
      icon: FiCalendar,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'patient',
      name: 'Patient Analytics Report',
      description: 'Detailed patient demographics, growth trends, and retention analysis',
      icon: FiUsers,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'doctor',
      name: 'Doctor Performance Report',
      description: 'Individual and department-wise doctor performance metrics',
      icon: FiTrendingUp,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'financial',
      name: 'Financial Summary Report',
      description: 'Revenue analysis, billing trends, and financial projections',
      icon: FiDollarSign,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'operational',
      name: 'Operational Efficiency Report',
      description: 'Resource utilization, wait times, and operational metrics',
      icon: FiClock,
      color: 'from-red-500 to-red-600'
    }
  ];

  const exportReport = (format) => {
    // Simulate report export
    const data = {
      report: selectedReport,
      data: reportData,
      format,
      timestamp: new Date().toISOString()
    };
    
    console.log('Exporting report:', data);
    
    // Create a simple CSV for demo
    if (format === 'csv') {
      const csv = `Metric,Value\nTotal Appointments,${reportData.total}\nCompleted,${reportData.completed}\nCancelled,${reportData.cancelled}\nRevenue,$${reportData.revenue}\nCompletion Rate,${reportData.completionRate}%`;
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hospital-report-${Date.now()}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Generate Reports</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {reports.map((report) => {
            const Icon = report.icon;
            return (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedReport === report.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${report.color} rounded-lg flex items-center justify-center mb-3 mx-auto`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{report.name}</h4>
                <p className="text-xs text-gray-600 text-center">{report.description}</p>
              </button>
            );
          })}
        </div>

        {/* Date Range Selection */}
        <div className="flex items-center space-x-4 mb-6">
          <label className="text-sm font-medium text-gray-700">Date Range:</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="this-year">This Year</option>
          </select>
        </div>

        {/* Export Options */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => exportReport('pdf')}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <FiDownload className="w-4 h-4 mr-2" />
            Export as PDF
          </button>
          <button
            onClick={() => exportReport('excel')}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <FiDownload className="w-4 h-4 mr-2" />
            Export as Excel
          </button>
          <button
            onClick={() => exportReport('csv')}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiDownload className="w-4 h-4 mr-2" />
            Export as CSV
          </button>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <FiFileText className="w-5 h-5 mr-2 text-indigo-600" />
            Report Preview: {reports.find(r => r.id === selectedReport)?.name}
          </h3>
          <span className="text-sm text-gray-500">{reportData.period}</span>
        </div>

        {/* Report Content */}
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Appointments</p>
                  <p className="text-2xl font-bold text-blue-900">{reportData.total}</p>
                </div>
                <FiCalendar className="w-8 h-8 text-blue-500 opacity-50" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-900">{reportData.completed}</p>
                </div>
                <FiTrendingUp className="w-8 h-8 text-green-500 opacity-50" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Revenue</p>
                  <p className="text-2xl font-bold text-yellow-900">${reportData.revenue}</p>
                </div>
                <FiDollarSign className="w-8 h-8 text-yellow-500 opacity-50" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Completion Rate</p>
                  <p className="text-2xl font-bold text-purple-900">{reportData.completionRate}%</p>
                </div>
                <FiTarget className="w-8 h-8 text-purple-500 opacity-50" />
              </div>
            </div>
          </div>

          {/* Detailed Report Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Total Appointments</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{reportData.total}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">100%</td>
                  <td className="px-4 py-3 text-sm text-green-600">↑ 12.5%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Completed Appointments</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{reportData.completed}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{reportData.completionRate}%</td>
                  <td className="px-4 py-3 text-sm text-green-600">↑ 8.3%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Cancelled Appointments</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{reportData.cancelled}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {reportData.total > 0 ? ((reportData.cancelled / reportData.total) * 100).toFixed(1) : 0}%
                  </td>
                  <td className="px-4 py-3 text-sm text-red-600">↓ 2.1%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Scheduled Appointments</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{reportData.scheduled}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {reportData.total > 0 ? ((reportData.scheduled / reportData.total) * 100).toFixed(1) : 0}%
                  </td>
                  <td className="px-4 py-3 text-sm text-blue-600">↑ 5.7%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Total Revenue</td>
                  <td className="px-4 py-3 text-sm text-gray-900">${reportData.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">-</td>
                  <td className="px-4 py-3 text-sm text-green-600">↑ 18.7%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Key Insights */}
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <h4 className="font-semibold text-indigo-900 mb-3">Key Insights</h4>
            <ul className="space-y-2 text-sm text-indigo-700">
              <li>• Appointment completion rate has improved by {reportData.completionRate}% this period</li>
              <li>• Total revenue generated: ${reportData.revenue.toLocaleString()} from completed appointments</li>
              <li>• Patient satisfaction indicated by low cancellation rates</li>
              <li>• Operational efficiency showing positive trends</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;
