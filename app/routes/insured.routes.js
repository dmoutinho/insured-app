module.exports = (app) => {

    const insured = require('../controllers/insured.controller.js');

    // Create a new Insured
    app.post('/insured', insured.create);

    // Retrieve all Insured
    app.get('/insured', insured.findAll);

    // Retrieve a single Insured with insuredId
    app.get('/insured/:insuredId', insured.findOne);

    // Update a Insured with insuredId
    app.put('/insured/:insuredId', insured.update);

    // Delete a Insured with insuredId
    app.delete('/insured/:insuredId', insured.delete);

}