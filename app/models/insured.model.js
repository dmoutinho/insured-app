const uuidv1 = require('uuid/v1'); 

exports.create = (name) => {
    
    var insured = {};

    insured.id = uuidv1();

    insured.name = name;

    return insured;

};