const LogBuilder = require('../log/log-builder.js');
const log = new LogBuilder(__filename);
const Insured = require('../models/insured.model.js');
const insuredRepository = require('../models/insured.repository.model.js');