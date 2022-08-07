function init() {
    const url = "http://localhost:5050/api/current-timer"
    fetch(url, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            const buttons = document.getElementById("button-section")
            if (data) {
                buttons.innerHTML = `<button onclick="stopTimer()">Stop Timer</button>`
            } else {
                buttons.innerHTML = `<input type="text" id="instanceNameInput">
                <button onclick="startTimer()">Start Timer</button>`
            }
        })
    fetch("http://localhost:5050/api/instances")
        .then(response => response.json())
        .then(data => populateTimers(data))
}

function startTimer() {
    const url = "http://localhost:5050/api/start-timer"
    const instanceNameInput = document.getElementById("instanceNameInput").value
    const startBody = [{
        running: true,
        name: instanceNameInput
    }]
    fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(startBody)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .then(data => init())
}

function stopTimer() {
    const url = "http://localhost:5050/api/stop-timer"
    fetch(url, {
            method: "PUT"
        })
        .then(response => response.json())
        .then(data => init())
}

function populateTimers(data) {
    let timers = ""
    data.forEach(timer => {
        let time = Date.parse(timer.endTime) - Date.parse(timer.startTime)
        timers += `<li>${timer.name} = ${Math.floor(time / 1000)} seconds</li>`
    })
    document.getElementById("old-timers").innerHTML = timers
}

init()