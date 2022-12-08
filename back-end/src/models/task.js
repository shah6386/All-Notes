const mongoose = require('mongoose')

const taskchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
})

const Task = new mongoose.model('Task', taskchema)

module.exports = Task