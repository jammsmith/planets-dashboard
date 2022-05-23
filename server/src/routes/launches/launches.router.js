const express = require('express');

const { httpGetLaunches, httpAddLaunch, httpDeleteLaunch } = require('./launches.controller.js');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetLaunches);
launchesRouter.post('/', httpAddLaunch);
launchesRouter.delete('/', httpDeleteLaunch);

module.exports = launchesRouter;
