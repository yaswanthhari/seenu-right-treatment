const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to Cancer Care Database'))
  .catch(err => console.log('❌ Connection error:', err.message));

// Patient Schema
const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  phone: String,
  email: String,
  cancerType: String,
  stage: String,
  symptoms: [String],
  address: {
    city: String,
    state: String
  },
  financialHelp: Boolean,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const Patient = mongoose.model('Patient', patientSchema);

// API Routes
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/patients', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/patients`);
});