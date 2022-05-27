const { parse } = require("csv-parse");
const fs = require("fs");

const results = [];

const parser = parse({
    comment: '#',
    columns: true,
});

const isPlanetHabitable = planet => {
    const hasRightSize = planet.koi_prad < 1.6;
    const isConfirmed = planet.koi_disposition === 'CONFIRMED';
    const rightTemperature = planet.koi_insol > 0.36 && planet.koi_insol < 1.11;

    return hasRightSize && isConfirmed && rightTemperature;
}

fs.createReadStream('kepler_data.csv')
    .pipe(parser)
    .on('data', planet => {
        if (isPlanetHabitable(planet)) {
            results.push(planet);
        }
    })
    .on('error', error => { console.log(error); })
    .on('end', () => { console.log({ results: results.length }); })