const express = require('express')
const app = express()
const port = 5050
const mongoose = require('mongoose');

const { Event, Instance } = require('./models/index')

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/timer-db', {
        useNewUrlParser: true
    }
);

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => res.send("Dave was here"))

// routes
app.use(require("./routes/api.js"));

app.listen(port, () => {
    console.log(`Timer API running on port ${ port }`);
})