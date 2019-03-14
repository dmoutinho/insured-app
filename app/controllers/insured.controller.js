const LogBuilder = require('../log/log-builder.js');
const log = new LogBuilder(__filename);
const Insured = require('../models/insured.model.js');
const insuredRepository = require('../models/insured.repository.model.js');

// Create and Save a new Insured
exports.create = (req, res) => {
    try {

        var ins = new Insured(req.body);       
        
        // Validate request
        var erros = ins.validate();
        if(erros.length>0) {
            return res.status(400).send({
                message: erros
            });
        }

        insuredRepository.create(ins);

        log.debug("create: "+JSON.stringify(ins));

        res.status(200).send(ins);

    } catch (error) {
        log.debug("create error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });               
    }
};

// Retrieve and return all Insured from the database.
exports.findAll = (req, res) => {
    try {
        console.log("=====>"+req.baseUrl);
        console.log("=====>"+req.path);
        console.log("=====>"+req.rout);


        var all = insuredRepository.findAll();
        log.debug("findAll: "+JSON.stringify(all));
        res.status(200).send(all);
    } catch (error) {
        log.debug("findAll error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Find a single note with a insuredUuid
exports.findOneByUuid = (req, res) => {
    try {
        log.debug("findOneByUuid uuid: "+req.params.insuredUuid);
        var ins = insuredRepository.findOneByUuid(req.params.insuredUuid);
        log.debug("findOneByUuid insured: "+JSON.stringify(ins));
        if( ins ) {
            res.status(200).send(ins);
        } else {
            res.status(404).send({
                message: "Insured not found with uuid " + req.params.insuredUuid
            });    
        }        
    } catch (error) {
        log.debug("findOneByUuid error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Update a note identified by the insuredUuid in the request
exports.update = (req, res) => {
    try {
        log.debug("update uuid: "+req.params.insuredUuid);
        
        let body = req.body;
       
        var ins = new Insured(body);
        ins.uuid = req.params.insuredUuid;
        // Validate request
       var erros = ins.validate();
       if(erros.length>0) {
           return res.status(400).send({
               message: erros
           });
       } else {
           ins = insuredRepository.update(ins);
           if( ins ) {
               log.debug("update insured: "+JSON.stringify(ins));
               return res.status(200).send(ins);
           } else {
               return res.status(404).send({
                   message: "1 Insured not found with uuid " + req.params.insuredUuid
               });    
           }
       }

        if( ins ) {
            log.debug("update insured: "+JSON.stringify(ins));
            return res.status(200).send(ins);
        } else {
            return res.status(404).send({
                message: " 2 Insured not found with uuid " + req.params.insuredUuid
            });    
        }        
    } catch (error) {
        log.debug("update error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Delete a note with the specified insuredUuid in the request
exports.delete = (req, res) => {
    try {
        log.debug("delete uuid: "+req.params.insuredUuid);
        var deleted = insuredRepository.delete(req.params.insuredUuid);
        if( deleted ) {
            res.status(200).send();
        } else {
            res.status(404).send({
                message: "Insured not found with uuid " + req.params.insuredUuid
            });    
        }        
    } catch (error) {
        log.debug("delete error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }

};