const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

async function saveLaunch(newLaunch) {
    const planet = await planets.findOne({
        keplerName: newLaunch.destination,
    });

    if (!planet) throw new Error('No matching planet found!');

    await launchesDatabase.findOneAndUpdate({
        flightNumber: newLaunch.flightNumber,
    }, newLaunch, { upsert: true });
}

async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    });
}

async function getLatestFlightNumber() {
    const latestFlight = await launchesDatabase
        .findOne()
        .sort("-flightNumber");

    if (!latestFlight) return DEFAULT_FLIGHT_NUMBER;

    return latestFlight.flightNumber;
}

async function getAllLaunches() {
    return await launchesDatabase.find({}, {
        "_id": 0, "__v": 0
    });
}

async function scheduleNewLaunch(launch) {
    const nextFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        flightNumber: nextFlightNumber,
        customers: ['Zero to Master', 'NASA'],
    });

    await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
    const abortedLaunch = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });

    return abortedLaunch.modifiedCount === 1;
}

module.exports = {
    getAllLaunches,
    abortLaunchById,
    scheduleNewLaunch,
    existsLaunchWithId,
};