`use strict`;

const request = require(`request`);

const keys = require(`../api-keys/config`);

let getForecast = (lat, lng, cb) => {

    return request({
        url: `https://api.darksky.net/forecast/${keys.darksky}/${lat},${lng}`,
        json: true
    }, (err, res, body) => {
        if (err || res.statusCode !== 200) {
            cb(`Unable to connect to the Forecast.io api`);
        }
        else if (body.code === 400) {
            cb(`The geolocation is incorrect`);
        }
        else {
            cb(undefined, {
                summary: body.currently.summary,
                temp: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
}

module.exports = getForecast;
