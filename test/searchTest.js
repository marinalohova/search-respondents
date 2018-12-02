const { expect } = require('chai');
var { byDistance } = require('../features/respondents/search');

describe('search()', () => {

    const respondents = [
        {
            firstName: 'John',
            location: 'Newark, NY, USA',
            latitude: 40.7329981,
            longitude: -74.2302686
        },
        {
            firstName: 'Anna',
            location: 'Oxnard, CA, USA',
            latitude: 34.19750479999999,
            longitude: -119.17705160000003 }
    ];

    const researchProject = {
        description: 'Looking for people who drive Prius to discuss their experiences',
        cities: [{
            location : {
                city: 'New York',
                location : {
                    latitude: 40.7127753,
                    longitude: -74.0059728
                }
            }
        }]
    };

    
    it('should find respondents within the specified range in kilometers', () => {
        
        var result = byDistance(respondents, researchProject, 100);

        expect(result).to.have.length(1);
        expect(result).to.have.deep.nested.property('[0].firstName', 'John');

        result = byDistance(respondents, researchProject, 4500);

        expect(result).to.have.length(2);

        result = byDistance(respondents, researchProject, 10);

        expect(result).to.be.an('array').that.is.empty;
    });

    it('should find respondents who live on the edge of the range', () => {
        var respondents = [
            {
                firstName: 'John',
                location: 'Floral Park, NY, USA',
                latitude: 40.7171226,
                longitude: -73.7340213
            }];

        var researchProject = {
            cities: [{
                location : {
                    city: 'Bellerose, NY, USA',
                    location : {
                        latitude: 40.7241639,
                        longitude: -73.7209969
                    }
                }
            }]
        };

        var result = byDistance(respondents, researchProject, 1.35, 'km');

        expect(result).to.have.length(1);
        expect(result).to.have.deep.nested.property('[0].firstName', 'John');

        result = byDistance(respondents, researchProject, 1.34, 'km');

        expect(result).to.have.length(0);
    });


    it('should sort respondents alphabetically by name', () => {
        
        var result = byDistance(respondents, researchProject, 4500);

        expect(result).to.have.length(2);
        expect(result).to.have.deep.nested.property('[0].firstName', 'Anna');
        expect(result).to.have.deep.nested.property('[1].firstName', 'John');
    });
});
