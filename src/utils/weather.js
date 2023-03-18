const request = require("postman-request");

const weather = (lattitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=627b98b36245d9c5d4f21f58957c6a58&query=" +
    lattitude +
    "," +
    longitude +
    "&units=m";

  request({ url: url, json: true }, (err, {body}) => {
    if (err) {
      callback("Unable to connect the server", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        precipetate : body.current.precip
      });
    }
  });
};

module.exports = weather;
