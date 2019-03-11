const Insured = require('./insured.model.js');
const insuredList = new Array();


//module.exports = function(firstName,lastName,birthday,contact,location,payment) {

insuredList.push(new Insured("João",
    "Silva",
    "12345678969",
    "1960-01-13",
    {
        email:"jsilva@insured.com.br",
        phone:"5521999988886"
    },
    {
        country : "Brasil",
        state : "Rio de Janeiro",
        city : "Rio de Janeiro",
        street : "Rua Cosme Velho",
        number : "513",
        code : "22241125"
    },
    {
        cardNumber : "9999999999999999", 
        valid : "21-09"
    }
));
insuredList.push(new Insured("Maria",
    "Maria",
    "12345678977",
    "1960-06-17",
    {
        email:"mmaria@insured.com.br",
        phone:"5521999977774"
    },
    {
        country : "Brasil",
        state : "Rio de Janeiro",
        city : "Niterói",
        street : "Estr. da Viração",
        number : "",
        code : "26177600"
    },
    {
        cardNumber : "8888888888888888", 
        valid : "20-08"
    }
));
insuredList.push(new Insured("José",
    "Santos",
    "12345678966",
    "1950-04-09",
    {
        email:"jsantos@insured.com.br",
        phone:"5521999966655"
    },
    {
        country : "Brasil",
        state : "Rio de Janeiro",
        city : "Rio de Janeiro",
        street : "Av. Pres. Castelo Branco",
        number : "",
        code : "20271130"
    },
    {
        cardNumber : "7777777777777777", 
        valid : "19-08"
    }
));
insuredList.push(new Insured("Francisco",
    "Sousa",
    "12345678955",
    "2005-06-17",
    {
        email:"fsousa@insured.com.br",
        phone:"5521999955555"
    },
    {
        country : "Brasil",
        state : "Rio de Janeiro",
        city : "Rio de Janeiro",
        street : "R. dos Arcos",
        number : "",
        code : "20230060"
    },
    {
        cardNumber : "6666666666666666", 
        valid : "19-08"
    }
));

exports.create = (insured) => {
    try {
	    insuredList.push(insured);
	    return insured;
    } catch (error) {
        console.log("repository create error: "+error.message);
    }
};

exports.findAll = () => {
    try {
    	return insuredList;
    } catch (error) {
        console.log("repository findAll error: "+error.message);
    }
};

function findOneByUuid(uuid) {
    try {
        return insuredList.find( i => i.uuid == uuid );
    } catch (error) {
        console.log("repository findOneByUuid error: "+error.message);
    }
};
exports.findOneByUuid = findOneByUuid; 

exports.update = (insured) => {
    try {

        var deleted = deleteByUuid(insured.uuid);
        if(deleted) {
            insuredList.push(insured);
        	return insured;
        } else {
            return undefined;
        }
    } catch (error) {
        console.log("repository update error: "+error.message);
    }
};

function deleteByUuid(uuid) {
    try {
        var deleted = false;
        insuredList.forEach( (element,index) => {
            if(element.uuid == uuid) {
                insuredList.splice(index,1);
                deleted = true;
            }
        });
        return deleted;
    } catch (error) {
        console.log("delete error: "+error.message);
    }
};
exports.delete = deleteByUuid;