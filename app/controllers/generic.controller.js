const LogBuilder = require('../log/log-builder.js');
const log = new LogBuilder(__filename);

function getRepository(path) {
    if(path.includes("insured")) {
        return require('../models/insured.repository.model.js');
    } else if(path.includes("proposal")) {
        return require('../models/proposal.repository.model.js');
    }
}

function getModel(path,body) {
    if(path.includes("insured")) {
        let Insured = require('../models/insured.model.js');
        return new Insured(body);
    } else if (path.includes("proposal")) {
        let Proposal = require('../models/proposal.model.js');
        return new Proposal(body);
    }
}

// Create and Save new
exports.create = (req, res) => {
    try {
        let model = getModel(req.path,req.body); 
        // Validate request
        let erros = model.validate();
        if(erros.length>0) {
            return res.status(400).send({
                message: erros
            });
        }
        getRepository(req.path).create(model);
        log.debug("create: "+JSON.stringify(model));
        res.status(200).send(model);
    } catch (error) {
        log.debug("create error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });               
    }
};

// Retrieve and return all
exports.findAll = (req, res) => {
    try {
        let all = getRepository(req.path).findAll();
        log.debug("findAll: "+JSON.stringify(all));
        res.status(200).send(all);
    } catch (error) {
        log.debug("findAll error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Find a single
exports.findOneByUuid = (req, res) => {
    try {
        log.debug("findOneByUuid uuid: "+req.params.uuid);
        let model = getRepository(req.path).findOneByUuid(req.params.uuid);
        log.debug("findOneByUuid: "+JSON.stringify(model));
        if(model) {
            res.status(200).send(model);
        } else {
            res.status(404).send({
                message: "Not found with uuid " + req.params.uuid
            });    
        }        
    } catch (error) {
        log.debug("findOneByUuid error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Update
exports.update = (req, res) => {
    try {
        log.debug("update uuid: "+req.params.uuid);
        let body = req.body;
        let model = getModel(req.path,body);
        model.uuid = req.params.uuid;

        // Validate request
       let erros = model.validate();
       if(erros.length>0) {
           return res.status(400).send({
               message: erros
           });
       } else {
            model = getRepository(req.path).update(model);
           if(model) {
               log.debug("update: "+JSON.stringify(model));
               return res.status(200).send(model);
           } else {
               return res.status(404).send({
                   message: "Not found with uuid " + req.params.uuid
               });    
           }
       }
    } catch (error) {
        log.debug("update error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Delete
exports.delete = (req, res) => {
    try {
        log.debug("delete uuid: "+req.params.uuid);
        let deleted = getRepository(req.path).delete(req.params.uuid);
        if(deleted) {
            res.status(200).send();
        } else {
            res.status(404).send({
                message: "Not found with uuid " + req.params.uuid
            });    
        }        
    } catch (error) {
        log.debug("delete error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }

};