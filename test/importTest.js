const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
const { fromCSV } = require('../features/respondents/import');
const mock = require('mock-fs');

describe('import()', () => {
    
    afterEach(() => mock.restore());
    
    it('should import from CSV', (done) => {

        mock({'respondents.csv': 
            `firstName,gender,location,latitude,longitude\nMarko,male,"Vodnjan, Hrvatska",47.899999,13.85283949999996`
        });
        
       fromCSV('respondents.csv')
           .then(results => {
               expect(results).to.have.length(1);
               done();
           });
    });

    it('should enforce correct CSV format', (done) => {

        mock({'respondents.csv': `firstName,gender,location,longitude\n
            Marko,male,"Vodnjan, Hrvatska",13.85283949999996`
        });

        expect(fromCSV('respondents.csv')).to.eventually.be.rejectedWith("Invalid CSV format.").and.notify(done);
    });
});