const LogBuilder = require('../log/log-builder.js');
const log = new LogBuilder(__filename);
const Insured = require('./insured.model.js');
const insuredList = new Array();

insuredList.push(new Insured({
    firstName : "João",
    lastName : "Silva",
    document : "12345678969",
    birthday : "1960-01-13",
    contact : {
        email : "jsilva@insured.com.br",
        phone :	"5521999988886"    	    

    },
    location : {
        country : "Brasil",
        state : "Rio de Janeiro",
        city : "Rio de Janeiro",
        street : "Rua Cosme Velho",
        number : "513",
        code : "22241125"
    },	    	
    payment : {
        cardNumber : "9999999999999999", 
        valid : "21-09"
    }
}));
insuredList.push(new Insured({
    firstName : "Maria",
    lastName : "Maria",
    document : "12345678977",
    birthday : "1960-06-17",
    contact : {
        email:"mmaria@insured.com.br",
        phone:"5521999977774"
    },
    location : {
        country : "Brasil",
        state : "Rio de Janeiro",
        city : "Niterói",
        street : "Estr. da Viração",
        number : "",
        code : "26177600"
    },	    	
    payment : {
        cardNumber : "8888888888888888", 
        valid : "20-08"
    }
}));
insuredList.push(new Insured({
    firstName : "José",
    lastName : "Santos",
    document : "12345678966",
    birthday : "1950-04-09",
    contact : {
        email:"jsantos@insured.com.br",
        phone:"5521999966655"
    },
    location : {
        country : "Brasil",
        state : "Rio de Janeiro",
        city : "Rio de Janeiro",
        street : "Av. Pres. Castelo Branco",
        number : "",
        code : "20271130"
    },	    	
    payment : {
        cardNumber : "7777777777777777", 
        valid : "19-08"
    }
}));
insuredList.push(new Insured({
    firstName : "Francisco",
    lastName : "Sousa",
    document : "12345678955",
    birthday : "2005-06-17",
    contact : {
        email:"fsousa@insured.com.br",
        phone:"5521999955555"
    },
    location : {
        country : "Brasil",
        state : "Rio de Janeiro",
        city : "Rio de Janeiro",
        street : "R. dos Arcos",
        number : "",
        code : "20230060"
    },	    	
    payment : {
        cardNumber : "6666666666666666", 
        valid : "19-08"
    }
}));

exports.create = (insured) => {
    try {
	    insuredList.push(insured);
	    return insured;
    } catch (error) {
        log.debug("repository create error: "+error.message);
    }
};

exports.findAll = () => {
    try {
    	return insuredList;
    } catch (error) {
        log.debug("repository findAll error: "+error.message);
    }
};

function findOneByUuid(uuid) {
    try {
        return insuredList.find( i => i.uuid == uuid );
    } catch (error) {
        log.debug("repository findOneByUuid error: "+error.message);
    }
};
exports.findOneByUuid = findOneByUuid; 

exports.update = (insured) => {
    try {

        var deleted = deleteByUuid(insured.uuid);
        log.debug("===> deleted "+deleted);
        log.debug("===> insured.uuid "+insured.uuid);
        if(deleted) {
            insuredList.push(insured);
        	return insured;
        } else {
            return undefined;
        }
    } catch (error) {
        log.debug("repository update error: "+error.message);
    }
};

function deleteByUuid(uuid) {
    try {
        var deleted = false;
        log.debug("for uuid: "+uuid);
        insuredList.forEach( (element,index) => {
            log.debug("for uuid: "+element.uuid);
            log.debug("compare: "+element.uuid == uuid);
            if(element.uuid == uuid) {
                insuredList.splice(index,1);
                deleted = true;
            }
        });
        return deleted;
    } catch (error) {
        log.debug("delete error: "+error.message);
    }
};
exports.delete = deleteByUuid;