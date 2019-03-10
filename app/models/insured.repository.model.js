const Insured = require('./insured.model.js');
const insuredList = new Array();

insuredList.push(new Insured("João"));
insuredList.push(new Insured("Maria"));
insuredList.push(new Insured("Joana"));
insuredList.push(new Insured("Pedro"));

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

function findOneById(id) {
    try {
        return insuredList.find( i => i.id == id );
    } catch (error) {
        console.log("repository findOneById error: "+error.message);
    }
};
exports.findOneById = findOneById;

exports.update = (id,insured) => {
    try {
        console.log("===> teste: "+JSON.stringify(id));
        var ins = findOneById(id);
        if(ins) {
        	ins.name = insured.name;
        }
        console.log("===> teste: "+JSON.stringify(ins));
        return ins;
    } catch (error) {
        console.log("repository update error: "+error.message);
    }
};

exports.delete = (id) => {
    try {
        var deleted = false;
        insuredList.forEach( (element,index) => {
            if(element.id == id) {
                insuredList.splice(index,1);
                deleted = true;
            }
        });
        return deleted;
    } catch (error) {
        console.log("delete error: "+error.message);
    }
};