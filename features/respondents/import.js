"use strict";

const fs = require('fs');
const csv = require('csv-parser');
const REQUIRED_HEADERS = ['firstName', 'gender', 'location', 'latitude', 'longitude'];

module.exports = {
    fromCSV: fromCSV
};

/**
 * Import respondent from a CSV file.
 * @param {String} inputFilePath - Path to a file.
 * @returns {Promise} Promise resolving with the list of imported respondents.
 * @throws {Error} Invalid CSV format if file is not CSV or required headers are not present.
 */
function fromCSV(inputFilePath) {
    
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(inputFilePath)
            .pipe(csv())
            .on('headers', (headers) => {
                if (!REQUIRED_HEADERS.every(header => headers.includes(header))) {
                    reject("Invalid CSV format.");
                }
            })
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            })
            .on('error', function(error) {
                reject(error);
            });
    });
}
