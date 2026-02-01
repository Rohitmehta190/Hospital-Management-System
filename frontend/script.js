const API_BASE = 'http://localhost:5000/api';

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const section = this.getAttribute('href').substring(1);
        showSection(section);
    });
});

function showSection(sectionName) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.style.display = 'block';
        
        // Load data based on section
        switch(sectionName) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'patients':
                loadPatients();
                break;
            case 'doctors':
                loadDoctors();
                break;
            case 'appointments':
                loadAppointments();
                break;
        }
    }
}

// Dashboard
async function loadDashboard() {
    try {
        const [patientsResponse, doctorsResponse, appointmentsResponse] = await Promise.all([
            fetch(`${API_BASE}/patients`),
            fetch(`${API_BASE}/doctors`),
            fetch(`${API_BASE}/appointments`)
        ]);
        
        const patients = await patientsResponse.json();
        const doctors = await doctorsResponse.json();
        const appointments = await appointmentsResponse.json();
        
        document.getElementById('total-patients').textContent = patients.length;
        document.getElementById('total-doctors').textContent = doctors.length;
        
        const today = new Date().toISOString().split('T')[0];
        const todayAppointments = appointments.filter(apt => 
            apt.appointment_date.startsWith(today)
        );
        document.getElementById('today-appointments').textContent = todayAppointments.length;
        
        const pendingAppointments = appointments.filter(apt => 
            apt.status === 'scheduled'
        );
        document.getElementById('pending-appointments').textContent = pendingAppointments.length;
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Patients
async function loadPatients() {
    try {
        const response = await fetch(`${API_BASE}/patients`);
        const patients = await response.json();
        
        const tbody = document.getElementById('patients-table');
        tbody.innerHTML = patients.map(patient => `
            <tr>
                <td>${patient.id}</td>
                <td>${patient.first_name} ${patient.last_name}</td>
                <td>${patient.date_of_birth}</td>
                <td>${patient.gender}</td>
                <td>${patient.phone || 'N/A'}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewPatient(${patient.id})">View</button>
                    <button class="btn btn-sm btn-warning" onclick="editPatient(${patient.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deletePatient(${patient.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading patients:', error);
    }
}

function showAddPatientForm() {
    const modal = new bootstrap.Modal(document.getElementById('patientModal'));
    modal.show();
}

async function addPatient() {
    const patientData = {
        user_id: 1, // This should come from authentication
        first_name: document.getElementById('patientFirstName').value,
        last_name: document.getElementById('patientLastName').value,
        date_of_birth: document.getElementById('patientDOB').value,
        gender: document.getElementById('patientGender').value,
        phone: document.getElementById('patientPhone').value
    };
    
    try {
        const response = await fetch(`${API_BASE}/patients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientData)
        });
        
        if (response.ok) {
            bootstrap.Modal.getInstance(document.getElementById('patientModal')).hide();
            document.getElementById('patientForm').reset();
            loadPatients();
            showAlert('Patient added successfully!', 'success');
        } else {
            showAlert('Error adding patient', 'danger');
        }
    } catch (error) {
        console.error('Error adding patient:', error);
        showAlert('Error adding patient', 'danger');
    }
}

// Doctors
async function loadDoctors() {
    try {
        const response = await fetch(`${API_BASE}/doctors`);
        const doctors = await response.json();
        
        const tbody = document.getElementById('doctors-table');
        tbody.innerHTML = doctors.map(doctor => `
            <tr>
                <td>${doctor.id}</td>
                <td>${doctor.first_name} ${doctor.last_name}</td>
                <td>${doctor.specialization}</td>
                <td>${doctor.license_number}</td>
                <td>${doctor.phone || 'N/A'}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewDoctor(${doctor.id})">View</button>
                    <button class="btn btn-sm btn-warning" onclick="editDoctor(${doctor.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteDoctor(${doctor.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading doctors:', error);
    }
}

// Appointments
async function loadAppointments() {
    try {
        const response = await fetch(`${API_BASE}/appointments`);
        const appointments = await response.json();
        
        const tbody = document.getElementById('appointments-table');
        tbody.innerHTML = appointments.map(appointment => `
            <tr>
                <td>${appointment.id}</td>
                <td>${appointment.patient_name}</td>
                <td>${appointment.doctor_name}</td>
                <td>${new Date(appointment.appointment_date).toLocaleString()}</td>
                <td>${appointment.reason || 'N/A'}</td>
                <td><span class="badge status-${appointment.status}">${appointment.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewAppointment(${appointment.id})">View</button>
                    <button class="btn btn-sm btn-warning" onclick="editAppointment(${appointment.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteAppointment(${appointment.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading appointments:', error);
    }
}

// Utility functions
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.querySelector('.container').insertBefore(alertDiv, document.querySelector('.container').firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Placeholder functions for edit/delete operations
function viewPatient(id) {
    console.log('View patient:', id);
}

function editPatient(id) {
    console.log('Edit patient:', id);
}

function deletePatient(id) {
    if (confirm('Are you sure you want to delete this patient?')) {
        console.log('Delete patient:', id);
    }
}

function viewDoctor(id) {
    console.log('View doctor:', id);
}

function editDoctor(id) {
    console.log('Edit doctor:', id);
}

function deleteDoctor(id) {
    if (confirm('Are you sure you want to delete this doctor?')) {
        console.log('Delete doctor:', id);
    }
}

function showAddDoctorForm() {
    console.log('Show add doctor form');
}

function showAddAppointmentForm() {
    console.log('Show add appointment form');
}

function viewAppointment(id) {
    console.log('View appointment:', id);
}

function editAppointment(id) {
    console.log('Edit appointment:', id);
}

function deleteAppointment(id) {
    if (confirm('Are you sure you want to delete this appointment?')) {
        console.log('Delete appointment:', id);
    }
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
});
