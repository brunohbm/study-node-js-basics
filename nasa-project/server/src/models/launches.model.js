const axios = require("axios");
const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4';

async function saveLaunch(newLaunch) {
    await launchesDatabase.findOneAndUpdate({
        flightNumber: newLaunch.flightNumber,
    }, newLaunch, { upsert: true });
}

async function findLaunch(filter) {
    return await launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId) {
    return await findLaunch({
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

async function getAllLaunches(skip, limit) {
    return await launchesDatabase
    .find({}, {
        "_id": 0, "__v": 0
    })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.destination,
    });

    if (!planet) throw new Error('No matching planet found!');

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
};

async function populateLaunches() {
    const response = await axios.post(`${SPACEX_API_URL}/launches/query`, {
        query: {},
        options: {
            pagination: false,
            populate: [
                { path: 'rocket', select: { name: 1 } },
                { path: 'payloads', select: { customers: 1 } }
            ]
        }
    });

    if(response.status !== 200) {
        throw new Error('SpaceX Launches load failed!');
    }

    const { data: { docs } } = response;
    const spaceXLauches = docs.map(doc => {
        const {
            flight_number: flightNumber,
            name,
            rocket,
            date_local: launchDate,
            upcoming,
            success,
            payloads,
        } = doc;

        return {
            flightNumber,
            mission: name,
            rocket: rocket.name,
            launchDate,
            upcoming,
            success,
            customers: payloads.flatMap(payload => payload.customers),
        };
    });

    await Promise.all(spaceXLauches.map(launch => saveLaunch(launch)));
}

async function loadLaunchesData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    });

    if (firstLaunch) {
        console.log('Launch data already loaded!');
        return;
    }

    await populateLaunches();
}

module.exports = {
    getAllLaunches,
    abortLaunchById,
    loadLaunchesData,
    scheduleNewLaunch,
    existsLaunchWithId,
};