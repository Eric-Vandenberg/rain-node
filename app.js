`use strict`;

const request = require(`request`);
const yargs = require(`yargs`);

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

let encodedURI = encodeURIComponent(argv.a);

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURI}`,
    json: true
}, (err, res, body) => {
    if (err) throw err;
    
    // console.log(JSON.stringify(res, undefined, 4));
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Lat: ${body.results[0].geometry.location.lat} \nLng: ${body.results[0].geometry.location.lng}`);
});
