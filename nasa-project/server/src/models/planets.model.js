const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const planets = require("./planets.mongo");

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

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        const dataLocation = path.join(__dirname, '..', '..', 'data', 'kepler_data.csv');
        
        fs.createReadStream(dataLocation)
            .pipe(parser)
            .on('data', async planet => {
                if (isPlanetHabitable(planet)) {
                    const newPlanet = { keplerName: planet.kepler_name };
                    await planets.updateOne(newPlanet, newPlanet, {
                        upsert: true
                    });
                }
            })
            .on('error', error => { 
                console.log(error); 
                reject();
            })
            .on('end', async () => { 
                const planetsAmount = (await getAllPlanets()).length;
                console.log({ planetsAmount }); 
                resolve();
            });
    })
}

async function getAllPlanets() {
    const allPlanets = await planets.find({}, {
        "_id": 0, "__v": 0,
    });
    return allPlanets;
}

module.exports = {
    getAllPlanets,
    loadPlanetsData,
};