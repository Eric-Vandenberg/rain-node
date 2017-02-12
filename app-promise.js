`use strict`;

const yargs = require(`yargs`);
const axios = require(`axios`);

const keys = require(`./api-keys/config`);

const argv = yargs
    .options({
        address: {
            describe: `Address for lookup`,
            demand: true,
            alias: `a`,
            string: true
        }
    })
    .help()
    .alias(`help`, `h`)
    .argv;

let encodedURI = encodeURIComponent(argv.address);

let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURI}`;

axios.get(geocodeURL)
    .then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error(`Unable to find that address`);
        }
        var lat = response.data.results[0].geometry.location.lat,
            lng = response.data.results[0].geometry.location.lng,
            weatherUrl = `https://api.darksky.net/forecast/${keys.darksky}/${lat},${lng}`
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
    }).then((response) => {
        var summary = response.data.currently.summary,
            temperature = response.data.currently.temperature,
            apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${summary} at ${temperature} degrees.`);
    }).catch((e) => {
        console.log(e.message);
    });
