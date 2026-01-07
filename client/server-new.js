// ============================================
// SEENU'S RIGHT TREATMENT - CANCER CARE PLATFORM
// Backend Server with Mock Data
// ============================================

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== SERVE STATIC FILES ==========
app.use(express.static(path.join(__dirname, 'client')));

// ========== MOCK DATABASE ==========
let patients = [
  {
    id: 1,
    name: "Rajesh Sharma",
    age: 52,
    gender: "Male",
    phone: "9876543210",
    email: "rajesh@example.com",
    cancerType: "Oral Cancer",
    stage: "Early",
    symptoms: ["White patches", "Mouth ulcer"],
    city: "Mumbai",
    state: "Maharashtra",
    financialHelp: true,
    status: "Pending",
    createdAt: "2024-01-06"
  },
  {
    id: 2,
    name: "Priya Patel",
    age: 45,
    gender: "Female",
    phone: "8765432109",
    email: "priya@example.com",
    cancerType: "Breast Cancer",
    stage: "Intermediate",
    symptoms: ["Lump", "Pain"],
    city: "Delhi",
    state: "Delhi",
    financialHelp: false,
    status: "Consulted",
    createdAt: "2024-01-05"
  }
];

let hospitals = [
  {
    id: 1,
    name: "Tata Memorial Hospital",
    type: "Government",
    city: "Mumbai",
    state: "Maharashtra",
    phone: "022-24177000",
    emergency: "022-24146750",
    specializations: ["Oncology", "Radiation", "Surgery"],
    verified: true
  },
  {
    id: 2,
    name: "AIIMS Cancer Center",
    type: "Government",
    city: "Delhi",
    state: "Delhi",
    phone: "011-26588500",
    specializations: ["Medical Oncology", "Pediatric"],
    verified: true
  },
  {
    id: 3,
    name: "Apollo Cancer Institute",
    type: "Private",
    city: "Chennai",
    state: "Tamil Nadu",
    phone: "044-28203333",
    specializations: ["All Cancers"],
    verified: true
  }
];

// ========== API ROUTES ==========

// 1. HOME PAGE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// 2. GET ALL PATIENTS
app.get('/api/patients', (req, res) => {
  res.json(patients);
});

// 3. GET SINGLE PATIENT
app.get('/api/patients/:id', (req, res) => {
  const patient = patients.find(p => p.id == req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

// 4. ADD NEW PATIENT
app.post('/api/patients', (req, res) => {
  const newPatient = {
    id: patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1,
    ...req.body,
    status: "Pending",
    createdAt: new Date().toISOString().split('T')[0]
  };
  patients.push(newPatient);
  res.status(201).json(newPatient);
});

// 5. UPDATE PATIENT
app.put('/api/patients/:id', (req, res) => {
  const index = patients.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    patients[index] = { ...patients[index], ...req.body };
    res.json(patients[index]);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

// 6. GET ALL HOSPITALS
app.get('/api/hospitals', (req, res) => {
  res.json(hospitals);
});

// 7. ADD NEW HOSPITAL
app.post('/api/hospitals', (req, res) => {
  const newHospital = {
    id: hospitals.length > 0 ? Math.max(...hospitals.map(h => h.id)) + 1 : 1,
    ...req.body,
    verified: false
  };
  hospitals.push(newHospital);
  res.status(201).json(newHospital);
});

// 8. REGISTRATION FORM PAGE
app.get('/register', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Register Patient - Seenu's Right Treatment</title>
      <style>
        body { font-family: Arial; max-width: 600px; margin: 40px auto; padding: 20px; }
        input, select, textarea { width: 100%; padding: 10px; margin: 8px 0; border: 1px solid #ccc; }
        button { background: #2563eb; color: white; padding: 12px 20px; border: none; cursor: pointer; }
        .success { color: green; padding: 10px; }
        .error { color: red; padding: 10px; }
      </style>
    </head>
    <body>
      <h2>📝 Register New Patient</h2>
      <form id="patientForm">
        <input type="text" name="name" placeholder="Full Name *" required>
        <input type="tel" name="phone" placeholder="Phone Number *" required>
        <input type="email" name="email" placeholder="Email">
        <input type="number" name="age" placeholder="Age">
        <select name="gender">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select name="cancerType" required>
          <option value="">Select Cancer Type *</option>
          <option value="Breast Cancer">Breast Cancer</option>
          <option value="Oral Cancer">Oral Cancer</option>
          <option value="Cervical Cancer">Cervical Cancer</option>
          <option value="Lung Cancer">Lung Cancer</option>
        </select>
        <textarea name="symptoms" placeholder="Symptoms (comma separated)"></textarea>
        <button type="submit">Register Patient</button>
      </form>
      <div id="message"></div>
      <script>
        document.getElementById('patientForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData);
          
          if (data.symptoms) {
            data.symptoms = data.symptoms.split(',').map(s => s.trim());
          }
          
          try {
            const response = await fetch('/api/patients', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            
            const messageDiv = document.getElementById('message');
            if (response.ok) {
              messageDiv.innerHTML = '<div class="success">✅ Patient registered successfully!</div>';
              e.target.reset();
            } else {
              messageDiv.innerHTML = '<div class="error">❌ Registration failed</div>';
            }
          } catch (error) {
            document.getElementById('message').innerHTML = 
              '<div class="error">❌ Error: ' + error.message + '</div>';
          }
        });
      </script>
    </body>
    </html>
  `);
});

// 9. ADMIN DASHBOARD
app.get('/admin', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Admin Dashboard - Seenu's Right Treatment</title>
      <style>
        body { font-family: Arial; margin: 0; }
        .sidebar { width: 250px; background: #1e293b; color: white; height: 100vh; padding: 20px; position: fixed; }
        .main { margin-left: 270px; padding: 30px; }
        .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 30px 0; }
        .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        table { width: 100%; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        th, td { padding: 15px; text-align: left; border-bottom: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="sidebar">
        <h2>🏥 Admin Panel</h2>
        <p>Seenu's Right Treatment</p>
      </div>
      <div class="main">
        <h1>Dashboard</h1>
        <div class="stats">
          <div class="stat-card">
            <h3 id="totalPatients">0</h3>
            <p>Total Patients</p>
          </div>
          <div class="stat-card">
            <h3 id="pendingPatients">0</h3>
            <p>Pending Cases</p>
          </div>
          <div class="stat-card">
            <h3 id="totalHospitals">0</h3>
            <p>Hospitals</p>
          </div>
          <div class="stat-card">
            <h3 id="needFinancial">0</h3>
            <p>Need Financial Aid</p>
          </div>
        </div>
        
        <h2>Recent Patients</h2>
        <table id="patientsTable">
          <thead>
            <tr><th>Name</th><th>Cancer Type</th><th>Stage</th><th>Status</th></tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      
      <script>
        async function loadDashboard() {
          try {
            const [patientsRes, hospitalsRes] = await Promise.all([
              fetch('/api/patients'),
              fetch('/api/hospitals')
            ]);
            
            const patients = await patientsRes.json();
            const hospitals = await hospitalsRes.json();
            
            // Update stats
            document.getElementById('totalPatients').textContent = patients.length;
            document.getElementById('pendingPatients').textContent = 
              patients.filter(p => p.status === 'Pending').length;
            document.getElementById('totalHospitals').textContent = hospitals.length;
            document.getElementById('needFinancial').textContent = 
              patients.filter(p => p.financialHelp).length;
            
            // Update table
            const tbody = document.querySelector('#patientsTable tbody');
            tbody.innerHTML = '';
            patients.slice(0, 5).forEach(patient => {
              const row = document.createElement('tr');
              row.innerHTML = \`
                <td>\${patient.name}</td>
                <td>\${patient.cancerType}</td>
                <td>\${patient.stage}</td>
                <td>\${patient.status}</td>
              \`;
              tbody.appendChild(row);
            });
          } catch (error) {
            console.error('Error:', error);
          }
        }
        loadDashboard();
      </script>
    </body>
    </html>
  `);
});

// 10. CATCH ALL ROUTE - Serve HTML pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
============================================
🏥 SEENU'S RIGHT TREATMENT - CANCER CARE PLATFORM
============================================
✅ Server running: http://localhost:${PORT}
📊 API Endpoints:
   GET  /api/patients    - View all patients
   POST /api/patients    - Add new patient
   GET  /api/hospitals   - View hospitals
📝 Pages:
   /register            - Patient registration
   /admin               - Admin dashboard
   /                    - Main website
============================================
  `);
});