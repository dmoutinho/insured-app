const LogBuilder = require('./app/log/log-builder.js');
const log = new LogBuilder(__filename);
const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to insured-app!"});
});

require('./app/routes/insured.routes.js')(app);
require('./app/routes/proposal.routes.js')(app);

// listen for requests
const server = app.listen(3000, () => {
    log.debug("Server is listening on port 3000");
});

module.exports = server;