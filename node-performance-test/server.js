const express = require('express');

const app = express();

function delay (duration) {
    const startDate = Date.now();

    // Loop that will block the server
    while ((Date.now() - startDate) < duration) {}
}

app.get('/', (req, res) => {
    res.send('Empty GET');
});

app.get('/timer', (req, res) => {
    delay(9000);
    res.send('GET with delay');
});

app.listen(3000);