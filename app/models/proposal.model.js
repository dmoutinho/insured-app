const uuidv1 = require('uuid/v1');
const validate = require("validate.js");
const validateUtils = require("../utils/validate.utils");

let carConstraints = {
	plate : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	},
	chassis : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	},
	year : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	},
	model : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	}
};

let paymentConstraints = {
	price : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	}
};

let validityConstraints = {
	start : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	},
	end : {
		presence : { 
			message: validateUtils.CONST.REQUIRED
		}
	}
};

function Proposal(proposal) {
	this.uuid = uuidv1();
	if(proposal) {
		this.insuredUuid = proposal.insuredUuid;
		this.car = {};
		this.car.plate = proposal.car ? proposal.car.plate : ""; 
		this.car.chassis = proposal.car ? proposal.car.chassis : "";
		this.car.year = proposal.car ? proposal.car.year : ""; 
		this.car.model = proposal.car ? proposal.car.model : "";
		this.payment = {};
		this.payment.price = proposal.payment ? proposal.payment.price : ""; 
		this.validity = {};
		this.validity.start = proposal.validity.start;
		this.validity.end = proposal.validity.end;
	} else {
		this.car = {};
		this.payment = {};
		this.validity = {};
	}
	this.status = 0;
}

Proposal.prototype.validate = function() {
	let erros = [];
	erros = erros.concat(validateUtils.concatMessages(validate(this.car,carConstraints)));
	erros = erros.concat(validateUtils.concatMessages(validate(this.payment,paymentConstraints)));
	erros = erros.concat(validateUtils.concatMessages(validate(this.validity,validityConstraints)));
	return erros;
};

const STATUS_ENUM = Object.freeze({
	INITIAL : 0,
	ANALYSIS : 1,
	APROVED : 2, 
	DECLIDED : 3
});

Proposal.prototype.STATUS_ENUM = STATUS_ENUM;

Proposal.prototype.approve = function() {
	this.status = this.STATUS_ENUM.APROVED;
};

Proposal.prototype.decline = function() {
	this.status = this.STATUS_ENUM.DECLIDED;
};

Proposal.prototype.analyze = function() {
	this.status = this.STATUS_ENUM.ANALYSIS;
};

module.exports = Proposal;

module.exports.STATUS_ENUM = STATUS_ENUM;