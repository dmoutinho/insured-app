const uuidv1 = require('uuid/v1'); 

module.exports = function(proposal) {

	try {
		
		this.uuid = uuidv1();
		
		this.insuredUuid = proposal.insuredUuid;

		this.car = {};
		this.car.plate = proposal.car.plate; 
		this.car.chassis = proposal.car.chassis;
		this.car.year = proposal.car.year; 
		this.car.model = proposal.car.model;

		this.payment = {};
		this.payment.price = proposal.payment.price; 

		this.validity = {};
		this.validity.start = proposal.validity.start;
		this.validity.end = proposal.validity.end;

		this.status = 0;

	} catch (error) {
		log.debug("proposal.model error: "+error.message);
	}
		
	this.validate = () => {
		var erros = Array();
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
		if(!this.status) {
			erros.push("Insured status can not be empty.");
		}
	};

	this.approve = () => {
		this.status = 1;
	};

	this.decline = () => {
		this.status = 2;
	};

	this.analyze = () => {
		this.status = 3;
	};

};