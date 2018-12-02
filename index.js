"use strict";

var importRespondents = require('./features/respondents/import');
var searchRespondents = require('./features/respondents/search');
var researchProject = require('./project.json');

importRespondents.fromCSV('./respondents.csv')
    .then(respondents => {
        
        var results = searchRespondents.byDistance(respondents, researchProject, 100);
        
        console.log(results.map(({firstName, location}) => {
            return { firstName, location }
        }));
        console.log(`Found ${results.length} matching respondents.`);
    })
    .catch(error => {
        console.log(error);
    });