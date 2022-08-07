const router = require("express").Router();
const { Event, Instance } = require('../models/index')

router.get('/api/events', (req, res) => {
    Event.find()
        .then(dbEvents => {
            res.json(dbEvents)
        })
        .catch(error => {
            res.status(400).json(error)
        })
})

router.get('/api/instances', (req, res) => {
    Instance.find()
        .then(dbInstances => {
            dbInstances.forEach(instance => {
                let time = instance.endTime - instance.startTime
                console.log(`${instance.name} = ${Math.floor(time / 1000)} seconds`);
            })
            res.json(dbInstances)
        })
        .catch(error => {
            res.status(400).json(error)
        })
})

router.get('/api/current-timer', (req, res) => {
    Instance.findOne({ running: true })
        .then(dbInstance => {
            res.json(dbInstance)
        })
        .catch(error => {
            res.status(400).json(error)
        })
})

router.post('/api/new-event', ({ body }, res) => {
    Event.create(body)
        .then(dbEvent => res.json(dbEvent))
        .catch(error => res.json(error))
})

// Start the timer
router.put('/api/stop-timer', (req, res) => {
    const body = { running: false, endTime: Date.now() }
    Instance.updateOne({ running: true }, body)
        .then(timer => res.json(timer))
        .catch(error => res.json(error))
})

// End the timer
router.post('/api/start-timer', ({ body }, res) => {
    Instance.create(body)
        .then(dbInstance => res.json(dbInstance))
        .catch(error => res.json(error))
})

module.exports = router;