module.exports = (app) => {

    const genericController = require('../controllers/generic.controller.js');
    const proposalController = require('../controllers/proposal.controller.js');

    // Create a new Proposal
    app.post('/proposal', genericController.create);

    // Retrieve all Proposal
    app.get('/proposal', genericController.findAll);

    // Retrieve a single Proposal with proposalUuid
    app.get('/proposal/:uuid', genericController.findOneByUuid);

    // Update a Insured with proposalUuid
    app.put('/proposal/:uuid', genericController.update);

    // Delete a Insured with proposalUuid
    app.delete('/proposal/:uuid', genericController.delete);

    // Approve
    app.put('/proposal/:proposalUuid/:statusChange', proposalController.updateStatus);

    // Decline
    app.put('/proposal/:proposalUuid/:statusChange', proposalController.updateStatus);

    // Analyze
    app.put('/proposal/:proposalUuid/:statusChange', proposalController.updateStatus);

}