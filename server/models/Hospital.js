const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Government', 'Private', 'Charitable']
    },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String
    },
    contact: {
        phone: String,
        email: String,
        emergency: String
    },
    specializations: [String],
    departments: [String],
    facilities: [String],
    doctors: [{
        name: String,
        specialization: String,
        experience: Number,
        available: Boolean
    }],
    beds: {
        total: Number,
        available: Number,
        icu: Number
    },
    appointmentSlots: [{
        date: Date,
        time: String,
        available: Boolean
    }],
    governmentSchemes: [String],
    location: {
        lat: Number,
        lng: Number
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    verified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Hospital', hospitalSchema);