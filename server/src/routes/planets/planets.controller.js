const { getPlanets } = require('../../models/planets.model.js');

function httpGetPlanets (_, res) {
  res.status(200).json(getPlanets());
}

module.exports = {
  httpGetPlanets
};
