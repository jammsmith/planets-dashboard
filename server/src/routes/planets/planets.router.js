const express = require('express');

const { httpGetPlanets } = require('./planets.controller.js');

const planetsRouter = express.Router();

// Middleware here

// Routes
planetsRouter.get('/', httpGetPlanets);

module.exports = planetsRouter;
