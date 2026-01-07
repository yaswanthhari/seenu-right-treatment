const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    doctorName: String,
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: String,
    purpose: String,
    symptoms: String,
    previousReports: [String],
    status: {
        type: String,
        enum: ['Requested', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Requested'
    },
    followUpDate: Date,
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);