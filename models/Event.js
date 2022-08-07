const { Schema, model } = require('mongoose')

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    // instances: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Class'
    // }]
})

const Event = model('Event', eventSchema)

module.exports = Event