const mongoose = require('mongoose');

const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || 'TEST_MONGO_DB_PASSWORD';
const MONGO_CONNECTION_URI = `mongodb+srv://nasa-api:${MONGO_DB_PASSWORD}@nasaapi.mnhykjz.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', err => {
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_CONNECTION_URI);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
};