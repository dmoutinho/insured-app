const uuidv1 = require('uuid/v1'); 

module.exports = function(name) {
    
	    var insured = {};

	    insured.id = uuidv1();

	    insured.name = name;

	    return insured;

};