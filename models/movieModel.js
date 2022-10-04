const mongoose = require('mongoose')


const movieSchema = new mongoose.Schema({
    movie_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    year:{
        type: String,
        trim: true,
        required: true
    },
    plot:{
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    actor:{
        type: String,
        required: true
    },
    checked:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Movies", movieSchema)