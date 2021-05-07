const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
}
const fetchCoordByIp = function(body) {
  const ip = JSON.parse(body)['ip'];
  return request(`https://freegeoip.app/json/${ip}`);
}
const fetchISSFlyOverTimes = function(body) {
  const longitude = Number(JSON.parse(body).longitude);
  const latitude = Number(JSON.parse(body).latitude);
  return request(`http://api.open-notify.org/iss/v1/?lat=${latitude}&lon=${longitude}`);
}
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordByIp)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      return JSON.parse(data).response;
    });
}
module.exports = { nextISSTimesForMyLocation };

