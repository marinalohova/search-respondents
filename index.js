"use strict";

const importRespondents = require('./features/respondents/import');
const searchRespondents = require('./features/respondents/search');
const researchProject = require('./project.json');

let respondents = importRespondents.fromCSV('./respondents.csv')

    .then(respondents => {
        
        var results = searchRespondents.byDistance(respondents, researchProject.cities, 100);
        results.map(({firstName, location, closestCities}) => {
            console.log({ firstName, location, closestCities});
        });
        console.log(`Found ${results.length} matching respondents.`);
    })
    .catch(error => {
        console.log(error);
    });