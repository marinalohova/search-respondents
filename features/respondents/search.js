"use strict";

const haversine = require('./../../lib/haversine');

module.exports = {
    byDistance: byDistance
};

/**
 * Finds matching respondents by proximity.
 * @param {Array} respondents - List of respondents.
 * @param {Array} cities - List of cities for which to find matching respondents.
 * @param {Number} range - Range within which to look for matching respondents for the project in km.
 * @returns {Array} List of matching respondents sorted by name in alphabetical order.
 */
function byDistance(respondents, cities, range) {
    
    return respondents
        .reduce((memo, respondent) => {
            
            let closestCities = cities.reduce((memo, {location}) => {
                let distance = haversine(location.location, respondent);
                if (range > distance) {
                    let city = { city: location.city, distance};
                    memo.push(city);  
                }
                return memo;
            }, []);
            
            if (closestCities.length > 0) {
                memo.push({ ...respondent, closestCities });
            }
            
            return memo; 
        },[])
        .sort((a, b) => a.firstName.toLowerCase() > b.firstName.toLowerCase());
}