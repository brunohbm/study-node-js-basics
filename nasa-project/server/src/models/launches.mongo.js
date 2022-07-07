const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    success: {
        type: Boolean,
        required: true,
    },
    upcoming: {
        type: Boolean,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    customers: [String],
    destination: {
        type: String,
        required: true,
    },
    flightNumber: {
        type: Number,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Launch', launchesSchema);