module.exports = (app) => {

    const genericController = require('../controllers/generic.controller.js');
    //const insuredController = require('../controllers/insured.controller.js');

    // Create a new Insured
    app.post('/insured', genericController.create);

    // Retrieve all Insured
    app.get('/insured', genericController.findAll);

    // Retrieve a single Insured with insuredUuid
    app.get('/insured/:uuid', genericController.findOneByUuid);

    // Update a Insured with insuredUuid
    app.put('/insured/:uuid', genericController.update);

    // Delete a Insured with insuredUuid
    app.delete('/insured/:uuid', genericController.delete);

}