const uuidv1 = require('uuid/v1'); 

module.exports = function(firstName,lastName,document,birthday,contact,location,payment) {
    
	    var insured = {};

	    insured.id = uuidv1();

	    insured.firstName = firstName;
	    insured.lastName = lastName;
		insured.document = document;
	    insured.birthday = birthday;

	    insured.contact = {
		    email : "",
		    phone : ""	    	    
	    };
		insured.contact	= contact;

	    insured.location = {
	    	country : "",
	    	state : "",
	    	city : "",
	    	street : "",
	    	number : "",
	    	code : ""
	    };	    	
		insured.location = location;

	    insured.payment = {
	    	cardNumber : "", 
	    	valid : ""
	    };
		insured.payment = payment;
		''
	    insured.validate = () => {
	    	var erros = Array();
		    if(!insured.firstName) {
		    	erros.push("Insured firstName can not be empty.");
	        }
		    if(!insured.lastName) {
		    	erros.push("Insured lastName can not be empty.");
	        }
		    if(!insured.document) {
		    	erros.push("Insured document can not be empty.");
	        }
		    if(!insured.birthday) {
		    	erros.push("Insured birthday can not be empty.");
	        }
		    if(!insured.contact) {
		    	erros.push("Insured contact can not be empty.");
	        }
		    if(!insured.location) {
		    	erros.push("Insured location can not be empty.");
	        }
		    if(!insured.payment) {
		    	erros.push("Insured payment can not be empty.");
	        }
	        return erros;
	    };

	    return insured;

};