const launches = new Map();

let currentFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true
};

launches.set(launch.flightNumber, launch);

function launchExistsWithId (id) {
  return !!(launches.get(id));
}

function getLaunches () {
  return Array.from(launches.values());
}

function addLaunch (newLaunch) {
  currentFlightNumber++;

  launches.set(
    currentFlightNumber,
    Object.assign(newLaunch, {
      flightNumber: currentFlightNumber,
      upcoming: true,
      success: true,
      customer: ['James Brown']
    })
  );
}

function deleteLaunch (id) {
  return new Promise((resolve) => {
    const aborted = launches.get(id);

    aborted.upcoming = false;
    aborted.success = false;

    resolve(aborted);
  });
}

module.exports = {
  launchExistsWithId,
  getLaunches,
  addLaunch,
  deleteLaunch
};
