const uuidv1 = require('uuid/v1'); 
const validate = require("validate.js");
const validateUtils = require("../utils/validate.utils");

let insuredConstraints = {
	firstName : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		},
		length: {
			minimum: 2,
			maximum: 15,
			message: validateUtils.CONST.MIN_MAX
		}
	},
	lastName : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		},
		length: {
			minimum: 2,
			maximum: 15,
			message: validateUtils.CONST.MIN_MAX
		}
	},
	document : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	},
	birthday : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	}
};

let contactConstraints = {
	email : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	},
	phone : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	}
};

let locationConstraints = {
	country : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	},
	state : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	},
	city : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	},
	street : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	},
	number : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	},
	code : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	}
};

let paymentConstraints = {
	cardNumber : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	},
	valid : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	}
};

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
	let erros = [];
	erros = erros.concat(validateUtils.concatMessages(validate(this,insuredConstraints)));
	erros = erros.concat(validateUtils.concatMessages(validate(this.contact,contactConstraints)));
	erros = erros.concat(validateUtils.concatMessages(validate(this.location,locationConstraints)));
	erros = erros.concat(validateUtils.concatMessages(validate(this.payment,paymentConstraints))); 
	return erros;
};

module.exports = Insured;