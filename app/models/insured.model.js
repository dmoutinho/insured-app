const uuidv1 = require('uuid/v1'); 

module.exports = function(firstName,lastName,document,birthday,contact,location,payment) {
    
	    this.id = uuidv1();

	    this.firstName = firstName;
	    this.lastName = lastName;
		this.document = document;
	    this.birthday = birthday;

	    this.contact = {};
		this.contact.email = contact.email;
		this.contact.phone = contact.phone;	    	    

	    this.location = {};	    	
		this.location.country = location.country;
		this.location.state = location.state;
		this.location.city = location.city;
		this.location.street = location.street;
		this.location.number = location.number;
		this.location.code = location.code;

		this.payment = {};
		this.payment.cardNumber = payment.cardNumber; 
		this.payment.valid = payment.valid;

		this.validate = () => {
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

};