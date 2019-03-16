const LogBuilder = require('../app/log/log-builder.js');
const log = new LogBuilder(__filename);
const server = require('../server.js');

describe("insured-app",function(){
    require('./insured.model.test.js');
    require('./api/insured.test.js');
    require('./api/proposal.test.js');
    after(function(done) {
        server.close(done);
    });
});