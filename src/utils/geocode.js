const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWJhbm91YmFhYSIsImEiOiJja2Zic3A5eW8xOHdyMnJxc3p6enJkMHQwIn0.N-gdqfSIvb569D9h6NFLXQ";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to internet ", undefined);
    } else if (response.body.features.length === 0) {
      callback("Location is invalid TRY AGAIN", undefined);
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[0],
        lon: response.body.features[0].center[1],
        loc: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
