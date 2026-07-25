const mongoose = require('mongoose');

const resevationSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    occasion: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: "Pending"
    }
});

module.exports = mongoose.model('resevationSchema', resevationSchema);