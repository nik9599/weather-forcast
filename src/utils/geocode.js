const request = require("postman-request");

const geolocation = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibmlraGlsLTIwMDAiLCJhIjoiY2xldjlsZ2EwMDc0dDN4amRoemhtMXJ2aSJ9.IRCa2x_ZB8MJA8R0Iaf2cw&limit=1";
  request({ url: url, json: true }, (err, {body}) => {
    if (err) {
      callback("Server Not respondig", undefined);
    } else if (body.message) {
      callback("location Not Found,try another location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geolocation;
