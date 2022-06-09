const launches = new Map();

let nextFlightNumber = 100;

const launch = {
    flightNumber: nextFlightNumber,
    rocket: 'Explorer IS1',
    mission: 'Kepler Exploration X',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

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
}

module.exports = {
    addNewLaunch,
    getAllLaunches,
};