const express = require("express");
const { 
    httpSaveLaunch,
    httpAbortLaunch,
    httpGetAllLaunches,
} = require('./launches.controller');

const launchesRouter = express.Router();
launchesRouter.get('/', httpGetAllLaunches);

launchesRouter.post('/', httpSaveLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;