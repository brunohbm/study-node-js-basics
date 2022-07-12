const {
    getAllLaunches,
    abortLaunchById,
    scheduleNewLaunch,
    existsLaunchWithId,
} = require("../../models/launches.model");

const NEW_LAUNCH_REQUIRED_VALUES = [
    'mission',
    'rocket',
    'launchDate',
    'destination',
];

async function httpGetAllLaunches(req, res) {
    const launches = await getAllLaunches();
    return res.status(200).json(launches);
};

async function httpSaveLaunch(req, res) {
    const newLaunch = req.body;

    const invalidFields = NEW_LAUNCH_REQUIRED_VALUES.filter(field => {
        return !newLaunch[field];
    });

    if (invalidFields.length) {
        return res.status(400).json({
            error: `Missing required launch properties: ${invalidFields.join(', ')}`
        });
    }

    newLaunch.launchDate = new Date(newLaunch.launchDate);

    if (isNaN(newLaunch.launchDate)) {
        return res.status(400).json({ error: 'Invalid launch date' });
    }

    await scheduleNewLaunch(newLaunch);

    return res.status(201).json(newLaunch);
};

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
    const existLaunch = await existsLaunchWithId(launchId);

    if (!existLaunch) {
        return res.status(404).json({
            error: 'Launch not found',
        });
    }

    const aborted = abortLaunchById(launchId);

    if(!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted ',
        });
    }

    return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    httpSaveLaunch,
    httpAbortLaunch,
    httpGetAllLaunches,
};