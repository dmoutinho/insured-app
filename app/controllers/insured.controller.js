const insured = require('../models/insured.model.js');

var insuredList = new Array();
insuredList[0] = insured.create("João");
insuredList[1] = insured.create("Maria");
insuredList[2] = insured.create("Joana");
insuredList[3] = insured.create("Pedro");

// Create and Save a new Insured
exports.create = (req, res) => {
    try {
        
        // Validate request
        if(!req.body.name) {
            return res.status(400).send({
                message: "Insured name can not be empty"
            });
        }

        var ins = insured.create(req.body.name);

        insuredList[insuredList.length] = ins;

        console.log("create: "+JSON.stringify(insuredList));

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
        console.log("findAll: "+JSON.stringify(insuredList));
        res.send(insuredList);
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
        var ins = insuredList.find( i => i.id === req.params.insuredId );
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
        var ins = insuredList.find( i => i.id === req.params.insuredId );
        console.log("update insured old: "+JSON.stringify(ins));
        if( ins ) {
            ins.name = req.body.name;
            console.log("update insured new: "+JSON.stringify(ins));
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
        var deleted = false;
        insuredList.forEach( (element,index) => {
            if(element.id === req.params.insuredId) {
                insuredList.splice(index,1);
                deleted = true;
            }
        });
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