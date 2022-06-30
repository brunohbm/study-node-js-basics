require('./config');
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;
const MONGO_CONNECTION_URI = `mongodb+srv://nasa-api:${process.env.MONGO_DB_PASSWORD}@nasaapi.mnhykjz.mongodb.net/?retryWrites=true&w=majority`;

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', err => {
    console.error(err);
});

async function startServer() {
    await mongoose.connect(MONGO_CONNECTION_URI);
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
}

startServer();