const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();

let nextFlightNumber = 100;

const launch = {
    success: true,
    upcoming: true,
    rocket: 'Explorer IS1',
    customers: ['ZTM', 'NASA'],
    destination: 'Kepler-442 b',
    flightNumber: nextFlightNumber,
    mission: 'Kepler Exploration X',
    launchDate: new Date('December 27, 2030'),
};

async function saveLaunch(newLaunch) {
    const planet = await planets.findOne({
        keplerName: newLaunch.destination,
    });

    if(!planet) throw new Error('No matching planet found!');

    await launchesDatabase.updateOne({
        flightNumber: newLaunch.flightNumber,
    }, newLaunch, { upsert: true });
}

saveLaunch(launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

async function getLatestFlightNumber() {
    const latestFlight = await launchesDatabase
        .findOne()
        .sort("-flightNumber");

    if(!latestFlight) return DEFAULT_FLIGHT_NUMBER;

    return latestFlight.flightNumber;
}

async function getAllLaunches() {
    return await launchesDatabase.find({}, {
        "_id": 0, "__v": 0
    });
}

function addNewLaunch(launchData) {
    nextFlightNumber++;

    const newLaunch = Object.assign(launchData, {
        success: true,
        upcoming: true,
        flightNumber: nextFlightNumber,
        customers: ['Zero to Master', 'NASA'],
    });

    launches.set(nextFlightNumber, newLaunch);
};

function abortLaunchById(launchId) {
    const launchToAbort = launches.get(launchId);
    launchToAbort.upcoming = false;
    launchToAbort.success = false;

    return launchToAbort;
}

module.exports = {
    addNewLaunch,
    getAllLaunches,
    abortLaunchById,
    existsLaunchWithId,
};