const http = require('http');

const app = require('./app.js');
const { loadPlanetsData } = require('./models/planets.model.js');

const PORT = process.env.PORT || 8001;

const server = http.createServer(app);

(async function () {
  try {
    await loadPlanetsData();

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (err) {
    console.log('err', err);
  }
})();
