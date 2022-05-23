const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');

const planets = [];

// Function to filter the results based on certain criteria
function isHabitablePlanet (planet) {
  return planet.koi_disposition === 'CONFIRMED' &&
    planet.koi_insol > 0.36 && planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6;
}

function loadPlanetsData () {
  return new Promise((resolve, reject) => {
    // Read data from csv file as a stream using fs module
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
      // create a 'pipe' from readable stream to writable stream
      .pipe(parse({
        comment: '#',
        columns: true
      }))
      // assign results (based on some criteria) to a variable
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          planets.push(data);
        }
      })
      // log error if needed
      .on('error', (err) => {
        reject(err);
      })
      // do something once full file is read/handled
      .on('end', () => {
        console.log(`Found ${planets.length} habitable planets!`);
        resolve();
      });
  });
}

function getPlanets () {
  return planets;
}

module.exports = {
  getPlanets,
  loadPlanetsData
};
