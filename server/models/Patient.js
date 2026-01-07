const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    cancerType: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        enum: ['Early', 'Intermediate', 'Advanced', 'Unknown']
    },
    symptoms: [String],
    hospitalPreference: String,
    financialHelpNeeded: Boolean,
    monthlyIncome: Number,
    address: {
        city: String,
        state: String,
        pincode: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Consulted', 'Under Treatment', 'Completed'],
        default: 'Pending'
    },
    registeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Patient', patientSchema);