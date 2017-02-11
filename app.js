`use strict`;

const yargs = require(`yargs`);

const geocode = require(`./geocode/geocode`);

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

geocode(argv.a, (errMsg, results) => {
    if (errMsg) {
        console.log(errMsg);
    }
    else {
        for (each in results) {
            console.log(`${each.toUpperCase()}: ${results[each]}`);
        }
    }
});
