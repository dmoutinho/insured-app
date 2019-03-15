const uuidv1 = require('uuid/v1'); 

function Insured(insured) {
	this.uuid = uuidv1();
	if(insured) {
		this.firstName = insured.firstName;
		this.lastName = insured.lastName;
		this.document = insured.document;
		this.birthday = insured.birthday;
		this.contact = {};
		this.contact.email = insured.contact ? insured.contact.email : undefined;
		this.contact.phone = insured.contact ? insured.contact.phone : undefined;	    	    
		this.location = {};	    	
		this.location.country = insured.location ? insured.location.country : undefined;
		this.location.state = insured.location ?  insured.location.state : undefined;
		this.location.city = insured.location ? insured.location.city : undefined;
		this.location.street = insured.location ? insured.location.street : undefined;
		this.location.number = insured.location ? insured.location.number : undefined;
		this.location.code = insured.location ? insured.location.code : undefined;
		this.payment = {};
		this.payment.cardNumber = insured.payment ? insured.payment.cardNumber : undefined; 
		this.payment.valid = insured.payment ? insured.payment.valid : undefined;
	} else {
		this.contact = {};
		this.location = {};
		this.payment = {};
	
	}
}

Insured.prototype.validate = function() {
	var erros = Array();
	if(!this.firstName) {
		erros.push("Insured firstName can not be empty.");
	}
	if(!this.lastName) {
		erros.push("Insured lastName can not be empty.");
	}
	if(!this.document) {
		erros.push("Insured document can not be empty.");
	}
	if(!this.birthday) {
		erros.push("Insured birthday can not be empty.");
	}
	if(!this.contact) {
		erros.push("Insured contact can not be empty.");
	}
	if(!this.location) {
		erros.push("Insured location can not be empty.");	
	}
	if(!this.payment) {
		erros.push("Insured payment can not be empty.");
	}
	return erros;
};

module.exports = Insured;