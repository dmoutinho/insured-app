const Insured = require('../models/insured.model.js');
const insuredRepository = require('../models/insured.repository.model.js');

// Create and Save a new Insured
exports.create = (req, res) => {
    try {
        
        // Validate request
        if(!req.body.name) {
            return res.status(400).send({
                message: "Insured name can not be empty"
            });
        }

        var ins = insuredRepository.create(new Insured(req.body.name));

        console.log("create: "+JSON.stringify(ins));

        res.send(ins);

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
        res.send(all);
    } catch (error) {
        console.log("findAll error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Find a single note with a insuredId
exports.findOne = (req, res) => {
    try {
        console.log("findOne id: "+req.params.insuredId);
        var ins = insuredRepository.findOneById(req.params.insuredId);
        console.log("findOne insured: "+JSON.stringify(ins));
        if( ins ) {
            res.send(ins);
        } else {
            res.status(404).send({
                message: "Insured not found with id " + req.params.insuredId
            });    
        }        
    } catch (error) {
        console.log("findOne error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Update a note identified by the insuredId in the request
exports.update = (req, res) => {
    try {
        console.log("update id: "+req.params.insuredId);
        var ins = insuredRepository.update(req.params.insuredId,req.body);
        if( ins ) {
            console.log("update insured: "+JSON.stringify(ins));
            res.send(ins);
        } else {
            res.status(404).send({
                message: "Insured not found with id " + req.params.insuredId
            });    
        }        
    } catch (error) {
        console.log("update error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }
};

// Delete a note with the specified insuredId in the request
exports.delete = (req, res) => {
    try {
        console.log("delete id: "+req.params.insuredId);
        var deleted = insuredRepository.delete(req.params.insuredId);
        if( deleted ) {
            res.status(200).send();
        } else {
            res.status(404).send({
                message: "Insured not found with id " + req.params.insuredId
            });    
        }        
    } catch (error) {
        console.log("delete error: "+error.message);
        res.status(500).send({
            message: "Some error occurred!"
        });        
    }

};