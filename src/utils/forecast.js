const request = require("request");

const forecast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=5db2d054c390fb76104d6e6a46afc683&query=" +
    address +
    "";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to internet ", undefined);
    } else if (response.body.error) {
      callback("Location is invalid TRY AGAIN", undefined);
    } else {
      callback(undefined, response.body.current.temperature);
    }
  });
};

module.exports = forecast;
