const API_URL = 'http://localhost:8001';

const { fetch } = window;

async function httpGetPlanets () {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

async function httpGetLaunches () {
  const response = await fetch(`${API_URL}/launches`);
  const launches = await response.json();
  return launches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch (launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(launch)
    });
  } catch (error) {
    return {
      ok: false,
      error
    };
  }
}

async function httpAbortLaunch (id) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
  } catch (error) {
    return {
      ok: false,
      error
    };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch
};
