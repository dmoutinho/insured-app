const uuidv1 = require('uuid/v1'); 

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
	let erros = Array();
	if(!this.insuredUuid) {
		erros.push("Insured insuredUuid can not be empty.");
	}
	if(!this.car) {
		erros.push("Insured car can not be empty.");
	}
	if(!this.payment) {
		erros.push("Insured payment can not be empty.");
	}
	if(!this.validity) {
		erros.push("Insured validity can not be empty.");
	}
	return erros;
};

Proposal.prototype.approve = function() {
	this.status = 1;
};

Proposal.prototype.decline = function() {
	this.status = 2;
};

Proposal.prototype.analyze = function() {
	this.status = 3;
};

module.exports = Proposal;