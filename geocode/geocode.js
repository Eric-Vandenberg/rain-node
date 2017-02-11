`use strict`;

const request = require(`request`);

let geocodeAddress = (address, cb) => {
    let encodedURI = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURI}`,
        json: true
    }, (err, res, body) => {
        if (err || res.statusCode !== 200) {
            cb(`Unable to connect to Google's servers`);
        }
        else if (body.status === 'ZERO_RESULTS') {
            cb(`Unable to retrieve info for that address`);
        }
        else if (body.status === 'OK') {
            cb(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports = geocodeAddress;
