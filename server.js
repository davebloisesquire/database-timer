const express = require('express')
const app = express()
const port = 5050

const testData = [
    { name: 'Dave', height: '6 foot' },
    { name: 'Steve', height: '6 foot 5' }
]

app.get('/', (req, res) => res.send(testData))

app.get('/start', (req, res) => {
    res.send(Date.now())
})

app.listen(port, () => {
    console.log(`Timer API running on port ${ port }`);
})