const { nextISSTimesForMyLocation } = require('./iss_promised');
// fetchMyIP()
//   .then(fetchCoordByIp)
//   .then(fetchISSFlyOverTimes)
//   .then(body=>{console.log(body);})
const printPassTimes = function(passTime) {
  for (const pass of passTime) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  })





// console.log(fetchMyIP());