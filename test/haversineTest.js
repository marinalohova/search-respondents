const { expect } = require('chai');
const haversine = require('../lib/haversine');

describe('haversine()', () => {
    
    const Newark = {
        latitude: 40.7329981,
        longitude: -74.2302686
    };
    
    const NewYork = {
        latitude: 40.7127753,
        longitude: -74.0059728
    };

    const FloralPark = {
        latitude: 40.7171226,
        longitude: -73.7340213
    };

    const Bellerose = {
        latitude: 40.7241639,
        longitude: -73.7209969
    };
    
    it('should find correct distance between two points in kilometers', () => {

        let result = haversine(Newark, NewYork);

        expect(result.toFixed(2)).to.be.equal("19.04");

        result = haversine(FloralPark, Bellerose);

        expect(result.toFixed(2)).to.be.equal("1.35");
    });

    it('should find correct distance if the two points are reversed', () => {
        let result = haversine(NewYork, Newark);

        expect(result.toFixed(2)).to.be.equal("19.04");

        result = haversine(Bellerose, FloralPark);

        expect(result.toFixed(2)).to.be.equal("1.35");
    });

    it('should find zero distance between identical points', () => {
        let result = haversine(Newark, Newark);

        expect(result.toFixed(2)).to.be.equal("0.00");
    });

    it('should throw an error if the input parameters are invalid', () => {

        expect(() => { haversine({firstName: 'Jeremy'}, {name: 'Thompson'})})
            .to.throw("Invalid parameter.");
        
        expect(() => { haversine(null, []) })
            .to.throw("Invalid parameter.");

        expect(() => { haversine({latitude: null}, {longitude: -40.456})})
            .to.throw("Invalid parameter.");
    });
});