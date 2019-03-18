const LogBuilder = require('./app/log/log-builder.js');
const log = new LogBuilder(__filename);
const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
const appPort = "3000";

// create express insured-app
const apiInsuredApp = express();
const apiVersion = "v1"
const apiContext = "insured-app"
//const apiCotextRoot =  "/" + apiContext + "/" + apiVersion;
const apiCotextRoot =  "";
const apiEndpoint =  "http://localhost:" + appPort + apiCotextRoot;
module.exports.apiEndpoint = apiEndpoint;

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to insured-app!"});
});

// parse requests of content-type - application/x-www-form-urlencoded
apiInsuredApp.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
apiInsuredApp.use(bodyParser.json())

require('./app/routes/insured.routes.js')(apiInsuredApp);
require('./app/routes/proposal.routes.js')(apiInsuredApp);

apiInsuredApp.on('mount', function (parent) {
    log.debug("insured-app API: "+apiEndpoint);
});

app.use(apiCotextRoot,apiInsuredApp);

// listen for requests
const server = app.listen(appPort, () => {
    log.debug("Server is listening on port "+appPort);
});

module.exports.server = server;