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

        console.log("create: "+JSON.stringify(prop));

        res.status(200).send(prop);

    } catch (error) {
        console.log("create error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });               
    }
};

// Retrieve and return all Proposal from the database.
exports.findAll = (req, res) => {
    try {
        var all = proposalRepository.findAll();
        console.log("findAll: "+JSON.stringify(all));
        res.status(200).send(all);
    } catch (error) {
        console.log("findAll error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Find a single note with a proposalUuid
exports.findOneByUuid = (req, res) => {
    try {
        console.log("findOneByUuid uuid: "+req.params.proposalUuid);
        var prop = proposalRepository.findOneByUuid(req.params.proposalUuid);
        console.log("findOneByUuid proposal: "+JSON.stringify(prop));
        if( prop ) {
            res.status(200).send(prop);
        } else {
            res.status(404).send({
                message: "Proposal not found with uuid " + req.params.proposalUuid
            });    
        }        
    } catch (error) {
        console.log("findOneByUuid error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Update a note identified by the proposalUuid in the request
exports.update = (req, res) => {
    try {

        console.log("update uuid: "+req.params.proposalUuid);
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
                console.log("update proposal: "+JSON.stringify(prop));
                res.status(200).send(prop);
            } else {
                res.status(404).send({
                    message: "Proposal not found with uuid " + req.params.proposalUuid
                });    
            }
        }
   
    } catch (error) {
        console.log("update error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// approve, decline, analyze
exports.updateStatus = (req, res) => {
    try {
        console.log("updateStatus uuid: "+req.params.proposalUuid);
        var prop = proposalRepository.findOneByUuid(req.params.proposalUuid);
        console.log("updateStatus proposal: "+JSON.stringify(prop));
        if( prop ) {
            var statusChange = req.params.statusChange;
            console.log("updateStatus statusChange: "+statusChange);
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
                console.log("update proposal: "+JSON.stringify(prop));
                res.status(200).send(prop);
            } else {
                res.status(404).send({
                    message: "Proposal not found with uuid " + req.params.proposalUuid
                });    
            }

        } else {
            res.status(404).send({
                message: "Proposal not found with uuid " + req.params.proposalUuid
            });    
        }        
    } catch (error) {
        console.log("updateStatus error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};


// Delete a note with the specified proposalUuid in the request
exports.delete = (req, res) => {
    try {
        console.log("delete id: "+req.params.proposalUuid);
        var deleted = proposalRepository.delete(req.params.proposalUuid);
        if( deleted ) {
            res.status(200).send();
        } else {
            res.status(404).send({
                message: "Proposal not found with uuid " + req.params.proposalUuid
            });    
        }        
    } catch (error) {
        console.log("delete error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }

};