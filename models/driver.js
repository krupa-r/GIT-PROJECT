const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    
    profilePicture: {
        type: String
    },
    company: { 
        type: String,
    },
    license: { 
        type: String,
    },
    });


module.exports = mongoose.model('Driver', driverSchema);