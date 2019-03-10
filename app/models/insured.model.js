const uuidv1 = require('uuid/v1'); 

module.exports = function(name) {
    
	    var insured = {};

	    insured.id = uuidv1();

	    insured.name = name;

	    insured.validate = () => {
	    	var erros = Array();
		    if(!insured.name) {
		    	erros.push("Insured name can not be empty");
	        }
	        return erros;
	    };

	    return insured;

};