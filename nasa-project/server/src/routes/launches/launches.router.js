const express = require("express");
const { 
    httpSaveLaunch,
    httpGetAllLaunches,
} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpSaveLaunch);

module.exports = launchesRouter;