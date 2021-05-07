// const { fetchMyIP, fetchCoordByIp, fetchISSFlyOverTimes } = require('./iss');
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });


// fetchCoordByIp('209.121.43.119', (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   const geo = {
//     latitude: data.latitude,
//     longtitude: data.longitude
//   };
//   console.log('It worked! Returned geo coordinates :', geo);
// });


// const coords = { latitude: '49.27670', longitude: '-123.13000' };
// fetchISSFlyOverTimes(coords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//    console.log('It worked! Returned flyover times:' , passTimes);
// });


const { nextISSTimesForMyLocation } = require('./iss');
const printPassTimes = function(passTime) {
  for (const pass of passTime) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes.response);
});