module.exports = (app) => {

    const insuredController = require('../controllers/insured.controller.js');

    // Create a new Insured
    app.post('/insured', insuredController.create);

    // Retrieve all Insured
    app.get('/insured', insuredController.findAll);

    // Retrieve a single Insured with insuredId
    app.get('/insured/:insuredId', insuredController.findOne);

    // Update a Insured with insuredId
    app.put('/insured/:insuredId', insuredController.update);

    // Delete a Insured with insuredId
    app.delete('/insured/:insuredId', insuredController.delete);

}