const { Schema, model } = require('mongoose')

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { timestamps: true })

const Event = model('Event', eventSchema)

module.exports = Event