const {
    launches
} = require("../../models/launches.model");

function getAllLaunches(req, res) {
    const formattedLaunches = Array.from(launches.values());
    return res.status(200).json(formattedLaunches);
};

module.exports = {
    getAllLaunches,
};