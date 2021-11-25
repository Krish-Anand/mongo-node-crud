const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 256
    }, 
    email: {
        type: String,
        required: true,
        min: 6,
        max: 256
    }, 
    password: {
        type: String,
        required: true,
        min: 6,
        max: 256
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', authSchema);