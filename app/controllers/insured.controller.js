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

        console.log("create: "+JSON.stringify(ins));

        res.status(200).send(ins);

    } catch (error) {
        console.log("create error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });               
    }
};

// Retrieve and return all Insured from the database.
exports.findAll = (req, res) => {
    try {
        var all = insuredRepository.findAll();
        console.log("findAll: "+JSON.stringify(all));
        res.status(200).send(all);
    } catch (error) {
        console.log("findAll error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Find a single note with a insuredUuid
exports.findOneByUuid = (req, res) => {
    try {
        console.log("findOneByUuid uuid: "+req.params.insuredUuid);
        var ins = insuredRepository.findOneByUuid(req.params.insuredUuid);
        console.log("findOneByUuid insured: "+JSON.stringify(ins));
        if( ins ) {
            res.status(200).send(ins);
        } else {
            res.status(404).send({
                message: "Insured not found with uuid " + req.params.insuredUuid
            });    
        }        
    } catch (error) {
        console.log("findOneByUuid error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Update a note identified by the insuredUuid in the request
exports.update = (req, res) => {
    try {
        console.log("update uuid: "+req.params.insuredUuid);
        
        req.body.uuid = req.params.insuredUuid;
        
        var ins = new Insured(req.body);

        // Validate request
       var erros = ins.validate();
       if(erros.length>0) {
           return res.status(400).send({
               message: erros
           });
       } else {
           ins = insuredRepository.update(new Insured(req.body));
           if( ins ) {
               console.log("update insured: "+JSON.stringify(ins));
               res.status(200).send(ins);
           } else {
               res.status(404).send({
                   message: "Insured not found with uuid " + req.params.proposalUuid
               });    
           }
       }

        if( ins ) {
            console.log("update insured: "+JSON.stringify(ins));
            res.status(200).send(ins);
        } else {
            res.status(404).send({
                message: "Insured not found with uuid " + req.params.insuredUuid
            });    
        }        
    } catch (error) {
        console.log("update error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Delete a note with the specified insuredUuid in the request
exports.delete = (req, res) => {
    try {
        console.log("delete uuid: "+req.params.insuredUuid);
        var deleted = insuredRepository.delete(req.params.insuredUuid);
        if( deleted ) {
            res.status(200).send();
        } else {
            res.status(404).send({
                message: "Insured not found with uuid " + req.params.insuredUuid
            });    
        }        
    } catch (error) {
        console.log("delete error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }

};