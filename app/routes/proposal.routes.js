module.exports = (app) => {

    const proposalController = require('../controllers/proposal.controller.js');

    // Create a new Proposal
    app.post('/proposal', proposalController.create);

    // Retrieve all Proposal
    app.get('/proposal', proposalController.findAll);

    // Retrieve a single Proposal with proposalUuid
    app.get('/proposal/:proposalUuid', proposalController.findOneByUuid);

    // Update a Insured with proposalUuid
    app.put('/proposal/:proposalUuid', proposalController.update);

    // Approve
    app.put('/proposal/:proposalUuid/:statusChange', proposalController.updateStatus);

    // Decline
    app.put('/proposal/:proposalUuid/:statusChange', proposalController.updateStatus);

    // Analyze
    app.put('/proposal/:proposalUuid/:statusChange', proposalController.updateStatus);

    // Delete a Insured with proposalUuid
    app.delete('/proposal/:proposalUuid', proposalController.delete);

}