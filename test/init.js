const LogBuilder = require('../app/log/log-builder.js');
const log = new LogBuilder(__filename);
const server = require('../server.js');
require('./api/insured.js');

// after(done => {
//     server.close(done);
// });
