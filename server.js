const LogBuilder = require('./app/log/log-builder.js');
const log = new LogBuilder(__filename);
const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to insured-app!"});
});

// create express insured-app
const apiInsuredApp = express();
const apiVersion = "v1"
const apiContext = "insured-app"
const apiCotextRoot = apiContext + "/" + apiVersion;

// parse requests of content-type - application/x-www-form-urlencoded
apiInsuredApp.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
apiInsuredApp.use(bodyParser.json())

require('./app/routes/insured.routes.js')(apiInsuredApp);
require('./app/routes/proposal.routes.js')(apiInsuredApp);

apiInsuredApp.on('mount', function (parent) {
    console.log('Admin Mounted');
    // console.log(parent); // refers to the parent app
  });

app.use("/"+apiCotextRoot,apiInsuredApp);

console.log(apiInsuredApp);

// listen for requests
const server = app.listen(3000, () => {
    log.debug("Server is listening on port 3000");
});

module.exports = server;