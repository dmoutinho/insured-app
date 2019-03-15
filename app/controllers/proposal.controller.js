const LogBuilder = require('../log/log-builder.js');
const log = new LogBuilder(__filename);
const Proposal = require('../models/proposal.model.js');
const proposalRepository = require('../models/proposal.repository.model.js');

// Create and Save a new Proposal
exports.create = (req, res) => {
    try {

        var prop = new Proposal(req.body);       
        
        // Validate request
        var erros = prop.validate();
        if(erros.length>0) {
            return res.status(400).send({
                message: erros
            });
        }

        proposalRepository.create(prop);

        log.debug("create: "+JSON.stringify(prop));

        res.status(200).send(prop);

    } catch (error) {
        log.debug("create error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });               
    }
};

// Retrieve and return all Proposal from the database.
exports.findAll = (req, res) => {
    try {
        var all = proposalRepository.findAll();
        res.status(200).send(all);
    } catch (error) {
        log.debug("findAll error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Find a single note with a proposalUuid
exports.findOneByUuid = (req, res) => {
    try {
        log.debug("findOneByUuid uuid: "+req.params.proposalUuid);
        var prop = proposalRepository.findOneByUuid(req.params.proposalUuid);
        log.debug("findOneByUuid proposal: "+JSON.stringify(prop));
        if( prop ) {
            res.status(200).send(prop);
        } else {
            res.status(404).send({
                message: "Not found with uuid " + req.params.proposalUuid
            });    
        }        
    } catch (error) {
        log.debug("findOneByUuid error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Update a note identified by the proposalUuid in the request
exports.update = (req, res) => {
    try {

        log.debug("update uuid: "+req.params.proposalUuid);
        var prop = new Proposal(req.body);

        // Validate request
        var erros = prop.validate();
        if(erros.length>0) {
            return res.status(400).send({
                message: erros
            });
        } else {
           prop = proposalRepository.update(prop);
            if( prop ) {
                log.debug("update proposal: "+JSON.stringify(prop));
                res.status(200).send(prop);
            } else {
                res.status(404).send({
                    message: "Not found with uuid " + req.params.proposalUuid
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

// approve, decline, analyze
exports.updateStatus = (req, res) => {
    try {
        log.debug("updateStatus uuid: "+req.params.proposalUuid);
        var prop = proposalRepository.findOneByUuid(req.params.proposalUuid);
        log.debug("updateStatus proposal: "+JSON.stringify(prop));
        if( prop ) {
            var statusChange = req.params.statusChange;
            log.debug("updateStatus statusChange: "+statusChange);
            switch (key) {
                case "approve":
                    prop.approve();
                    break;
                case "decline":
                    prop.decline();   
                   break;
                case "analyze":
                    prop.analyze();   
                    break;           
            }

            prop = proposalRepository.update(prop);
            if( prop ) {
                log.debug("update proposal: "+JSON.stringify(prop));
                res.status(200).send(prop);
            } else {
                res.status(404).send({
                    message: "Not found with uuid " + req.params.proposalUuid
                });    
            }

        } else {
            res.status(404).send({
                message: "Not found with uuid " + req.params.proposalUuid
            });    
        }        
    } catch (error) {
        log.debug("updateStatus error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};


// Delete a note with the specified proposalUuid in the request
exports.delete = (req, res) => {
    try {
        log.debug("delete id: "+req.params.proposalUuid);
        var deleted = proposalRepository.delete(req.params.proposalUuid);
        if( deleted ) {
            res.status(200).send();
        } else {
            res.status(404).send({
                message: "Not found with uuid " + req.params.proposalUuid
            });    
        }        
    } catch (error) {
        log.debug("delete error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }

};