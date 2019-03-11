const proposalList = new Array();

exports.create = (proposal) => {
    try {
	    proposalList.push(proposal);
	    return proposal;
    } catch (error) {
        console.log("repository create error: "+error.message);
    }
};

exports.findAll = () => {
    try {
    	return proposalList;
    } catch (error) {
        console.log("repository findAll error: "+error.message);
    }
};

function findOneByUuid(uuid) {
    try {
        return proposalList.find( i => i.uuid == uuid );
    } catch (error) {
        console.log("repository findOneByUuid error: "+error.message);
    }
};
exports.findOneByUuid = findOneByUuid;

exports.update = (proposal) => {
    try {
        var deleted = deleteByUuid(proposal.uuid);
        if(deleted) {
            proposalList.push(proposal);
        	return proposal;
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
        proposalList.forEach( (element,index) => {
            if(element.uuid == uuid) {
                proposalList.splice(index,1);
                deleted = true;
            }
        });
        return deleted;
    } catch (error) {
        console.log("delete error: "+error.message);
    }
};
exports.delete = deleteByUuid;