const { getLaunches, addLaunch, deleteLaunch, launchExistsWithId } = require('../../models/launches.model.js');

function httpGetLaunches (_, res) {
  res.status(200).json(getLaunches());
}

function httpAddLaunch (req, res) {
  const newLaunch = req.body;

  newLaunch.launchDate = new Date(newLaunch.launchDate);

  // Validate input
  if (
    !newLaunch.mission ||
    !newLaunch.rocket ||
    !newLaunch.launchDate ||
    !newLaunch.target
  ) {
    return res.status(400).json({ error: 'New launch is missing required fields' });
  }
  if (isNaN(newLaunch.launchDate)) {
    return res.status(400).json({ error: 'Launch date is invalid' });
  }

  // add launch to launches Map
  addLaunch(newLaunch);

  // send success status and attach the new launch
  return res.status(201).json(newLaunch);
}

async function httpDeleteLaunch (req, res) {
  const launchId = req.body.id;

  if (!launchExistsWithId(launchId)) {
    return res.status(404).json({ error: 'No launch found' });
  }

  const aborted = await deleteLaunch(launchId);

  return res.status(200).json(aborted);
}

module.exports = {
  httpGetLaunches,
  httpAddLaunch,
  httpDeleteLaunch
};
