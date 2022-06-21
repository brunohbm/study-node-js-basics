const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();

function delay(duration) {
    const startDate = Date.now();

    // Loop that will block the server
    while ((Date.now() - startDate) < duration) { }
}

app.get('/', (req, res) => {
    // PID = Process ID
    res.send(`Empty GET: ${process.pid}`);
});

app.get('/timer', (req, res) => {
    delay(9000);
    // PID = Process ID
    res.send(`GET with delay  ${process.pid}`);
});

// isMaster indicates if the first process has already started.
if (cluster.isMaster) {
    const NUM_WORKERS = os.cpus().length;

    for (let index = 0; index < NUM_WORKERS; index++) {
        // Fork creates a new Worker for the process.
        cluster.fork();
        console.log('Fork created!');
    }
} else {
    app.listen(3000);
}