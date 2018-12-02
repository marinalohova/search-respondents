"use strict";
const haversine = require('haversine');

module.exports = {
    byDistance: byDistance
};

/**
 * Finds matching respondents by proximity.
 * @param {Array} respondents - List of respondents.
 * @param {Object} project - Research projects for which to find matching respondents.
 * @param {Number} range - Range within which to look for matching respondents for the project.
 * @param {String} [unit=km] - Unit for range, defaults to km.
 * @returns {Array} List of matching respondents sorted by name in alphabetical order.
 */
function byDistance(respondents, project, range, unit='km') {
    var researchLocations = project.cities.map( ({ ...city }) => city.location.location);
    
    return respondents
        .filter(({latitude, longitude}) => {
            var respondentLocation = { latitude, longitude };
            return researchLocations.some(researchLocation => {
                return haversine(researchLocation, respondentLocation, {threshold: range, unit: unit});
            });
        })
        .sort((a, b) => a.firstName.toLowerCase() > b.firstName.toLowerCase());
}