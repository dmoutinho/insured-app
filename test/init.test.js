const LogBuilder = require('../app/log/log-builder.js');
const log = new LogBuilder(__filename);
const server = require('../server.js');

//require('./insured.model.test.js');
require('./api/insured.test.js');
require('./api/proposal.test.js');

// after(done proposal {
//     server.close(done);
// });