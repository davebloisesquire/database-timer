const express = require('express')
const app = express()
const port = 5050
const mongoose = require('mongoose');

const Event = require('./models/Event')

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/timer-db', {
        useNewUrlParser: true
    }
);

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => res.send("Dave was here"))

app.get('/events', (req, res) => {
    Event.find()
        .then(dbEvents => {
            res.json(dbEvents)
        })
        .catch(error => {
            res.status(400).json(error)
        })
})

app.post('/new-event', ({ body }, res) => {
    Event.create(body)
        .then(dbEvent => res.json(dbEvent))
        .catch(error => res.json(error))
})

app.listen(port, () => {
    console.log(`Timer API running on port ${ port }`);
})