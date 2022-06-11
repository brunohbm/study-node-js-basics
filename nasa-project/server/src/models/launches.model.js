const launches = new Map();

let nextFlightNumber = 100;

const launch = {
    success: true,
    upcoming: true,
    rocket: 'Explorer IS1',
    customer: ['ZTM', 'NASA'],
    destination: 'Kepler-442 b',
    flightNumber: nextFlightNumber,
    mission: 'Kepler Exploration X',
    launchDate: new Date('December 27, 2030'),
};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launchData) {
    nextFlightNumber++;

    const newLaunch = Object.assign(launchData, {
        success: true,
        upcoming: true,
        flightNumber: nextFlightNumber,
        customer: ['Zero to Master', 'NASA'],
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