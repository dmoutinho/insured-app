module.exports = (app) => {

    const insuredController = require('../controllers/insured.controller.js');

    // Create a new Insured
    app.post('/insured', insuredController.create);

    // Retrieve all Insured
    app.get('/insured', insuredController.findAll);

    // Retrieve a single Insured with insuredUuid
    app.get('/insured/:insuredUuid', insuredController.findOneByUuid);

    // Update a Insured with insuredUuid
    app.put('/insured/:insuredUuid', insuredController.update);

    // Delete a Insured with insuredUuid
    app.delete('/insured/:insuredUuid', insuredController.delete);

}