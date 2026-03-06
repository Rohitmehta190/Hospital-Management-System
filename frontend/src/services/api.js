import axios from 'axios';

// Use Firebase directly instead of backend API
const API_BASE_URL = 'https://hospital-management-syst-4c145.firebaseio.com';

// Create axios instance for Firebase Realtime Database
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Firebase REST API functions
export const firebaseAPI = {
  // Get data from Firebase
  get: (path) => api.get(`/${path}.json`),
  
  // Post data to Firebase
  post: (path, data) => api.post(`/${path}.json`, data),
  
  // Update data in Firebase
  put: (path, data) => api.put(`/${path}.json`, data),
  
  // Delete data from Firebase
  delete: (path) => api.delete(`/${path}.json`),
};

// Legacy API exports (for compatibility)
export const authAPI = {
  login: (credentials) => Promise.resolve({ success: true }), // Handled by Firebase Auth
  register: (userData) => Promise.resolve({ success: true }), // Handled by Firebase Auth
};

// Patients API calls (using Firebase)
export const patientsAPI = {
  getAll: () => firebaseAPI.get('patients'),
  getById: (id) => firebaseAPI.get(`patients/${id}`),
  create: (patientData) => firebaseAPI.post('patients', patientData),
  update: (id, patientData) => firebaseAPI.put(`patients/${id}`, patientData),
  delete: (id) => firebaseAPI.delete(`patients/${id}`),
};

// Doctors API calls (using Firebase)
export const doctorsAPI = {
  getAll: () => firebaseAPI.get('doctors'),
  getById: (id) => firebaseAPI.get(`doctors/${id}`),
  create: (doctorData) => firebaseAPI.post('doctors', doctorData),
  update: (id, doctorData) => firebaseAPI.put(`doctors/${id}`, doctorData),
  delete: (id) => firebaseAPI.delete(`doctors/${id}`),
};

// Appointments API calls (using Firebase)
export const appointmentsAPI = {
  getAll: () => firebaseAPI.get('appointments'),
  getById: (id) => firebaseAPI.get(`appointments/${id}`),
  create: (appointmentData) => firebaseAPI.post('appointments', appointmentData),
  update: (id, appointmentData) => firebaseAPI.put(`appointments/${id}`, appointmentData),
  delete: (id) => firebaseAPI.delete(`appointments/${id}`),
  getByPatient: (patientId) => firebaseAPI.get(`appointments`, {
    params: {
      orderBy: '"patientId"',
      equalTo: `"${patientId}"`
    }
  }),
  getByDoctor: (doctorId) => firebaseAPI.get(`appointments`, {
    params: {
      orderBy: '"doctorId"',
      equalTo: `"${doctorId}"`
    }
  }),
};

// Export the default api instance for direct usage
export default api;
