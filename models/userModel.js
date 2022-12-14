const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: 0
    },
    dob: {
        type: Date,
    },
    bio: {
        type: String,
    },
    role:{
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)