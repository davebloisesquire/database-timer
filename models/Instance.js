const { Schema, model } = require('mongoose')

const instanceSchema = new Schema({
    running: {
        type: Boolean,
        required: true
    },
    name: {
        type: String
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date
    }
})

const Instance = model('Instance', instanceSchema)

module.exports = Instance