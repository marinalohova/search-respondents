"use strict";

const haversine = require('./../../lib/haversine');

module.exports = {
    byDistance: byDistance
};

/**
 * Finds matching respondents by proximity.
 * @param {Array} respondents - List of respondents.
 * @param {Object} project - Research projects for which to find matching respondents.
 * @param {Number} range - Range within which to look for matching respondents for the project in km.
 * @returns {Array} List of matching respondents sorted by name in alphabetical order.
 */
function byDistance(respondents, project, range) {
    let researchLocations = project.cities.map( ({ ...city }) => city.location.location);
    
    return respondents
        .filter(({latitude, longitude}) => {
            let respondentLocation = { latitude, longitude };
            return researchLocations.some(researchLocation => {
                return range > haversine(researchLocation, respondentLocation);
            });
        })
        .sort((a, b) => a.firstName.toLowerCase() > b.firstName.toLowerCase());
}