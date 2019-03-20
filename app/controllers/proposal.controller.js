const LogBuilder = require('../log/log-builder.js');
const log = new LogBuilder(__filename);
const Proposal = require('../models/proposal.model.js');
const proposalRepository = require('../models/proposal.repository.model.js');
const message = require("../utils/message.utils.js");

// approve, decline, analyze
exports.updateStatus = (req, res) => {
    try {
        log.debug("updateStatus uuid: "+req.params.proposalUuid);
        let prop = proposalRepository.findOneByUuid(req.params.proposalUuid);
        log.debug("updateStatus proposal: "+JSON.stringify(prop));
        if( prop ) {
            let statusChange = req.params.statusChange;
            log.debug("updateStatus statusChange: "+statusChange);
            switch (key) {
                case "approve":
                    prop.approve();
                    break;
                case "decline":
                    prop.decline();   
                   break;
                case "analyze":
                    prop.analyze();   
                    break;           
            }

            prop = proposalRepository.update(prop);
            if( prop ) {
                log.debug("update proposal: "+JSON.stringify(prop));
                res.status(200).send(prop);
            } else {
                res.status(404).send({
                    message: message.CONST.NOT_FOUND
                });    
            }

        } else {
            res.status(404).send({
                message: message.CONST.NOT_FOUND
            });    
        }        
    } catch (error) {
        log.debug("updateStatus error: "+error.message);
        res.status(500).send({
            message: message.CONST.INTERNAL_ERROR
        });        
    }
};