/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const request = require('request');
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordByIp(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, nextpasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(error, nextpasses);
      });
    });
  });
};
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, JSON.parse(body).ip);
  });
};
const fetchCoordByIp = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coords by IP: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, JSON.parse(body));
  });
};
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss/v1/?lat=${Number(coords.latitude)}&lon=${Number(coords.longitude)}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, JSON.parse(body));
  });
};

module.exports = { fetchMyIP, fetchCoordByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation };