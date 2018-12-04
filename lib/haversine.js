"use strict";

/** Earth radius in km
 * @constant
 * @type {Number}
 */
const R = 6371;

/**
 * Convert degrees to radians.
 * @param {Number} degrees - Degrees to convert.
 * @returns {Number} Converted Radians.
 */
const toRadians = (degrees) => degrees * (Math.PI/180);

/**
 * Calculate distance between two locations in km.
 * @param {Object} start - The starting point.
 * @param {Number} start.latitude - Latitude of the starting point.
 * @param {Number} start.longitude - Longitude of the starting point.
 * @param {Object} end - The end point.
 * @param {Number} end.latitude - Latitude of the end point.
 * @param {Number} end.longitude - Longitude of the end point.
 * @returns {Number} Distance in km.
 */
function haversine(start, end) {
    if (!(!!start && !!end && !!start.latitude && !!start.longitude && !!end.latitude && !!end.longitude)) {
        throw new Error('Invalid parameter.');
    }
    let startLat = toRadians(start.latitude);
    let endLat = toRadians(end.latitude);
    let deltaLat = toRadians(end.latitude - start.latitude);
    let deltaLon = toRadians(end.longitude - start.longitude);

    let a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2)
        + Math.cos(startLat) * Math.cos(endLat) * Math.sin(deltaLon/2) * Math.sin(deltaLon/2) ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}

module.exports = haversine;