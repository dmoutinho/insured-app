const assert = require('assert');
const request = require('request');
const Proposal = require('../../app/models/proposal.model.js');

(function(){

    let proposal = new Proposal({
        car : {
            plate : "AZD-9897",
            chassis : "87sf8a9fdfa8d98f7asd987f9sd",    	    
            year :	"2010",
            model :	"Audi A3"
        },
        payment : {
            price : "10000.00"
        },	    	
        validity : {
            start : "2019-03-15", 
            end : "2020-03-15"
        }
    });

    //Create
    request('http://localhost:3000/insured', { json: true }, (err, res, body) => {
        if (err) assert.fail(err);
        proposal.insuredUuid = body[0].uuid;
        request.post('http://localhost:3000/proposal', { json: proposal }, (err, res, body) => {
            if (err) assert.fail(err);
            let uuid = body.uuid;
            request.get('http://localhost:3000/proposal/'+uuid, { json: true }, (err, res, body) => {
                if (err) assert.fail(err);
     
                assert.equal(body.car.plate,"AZD-9897");
                assert.equal(body.car.chassis,"87sf8a9fdfa8d98f7asd987f9sd");
                assert.equal(body.car.year,"2010");
                assert.equal(body.car.model,"Audi A3");
    
                assert.equal(body.payment.price,"10000.00");
    
                assert.equal(body.validity.start,"2019-03-15");
                assert.equal(body.validity.end,"2020-03-15");
    
                assert.equal(res.statusCode,200);
    
            });
        });
    });

    //List
    request('http://localhost:3000/proposal', { json: true }, (err, res, body) => {
        if (err) assert.fail(err);
        assert.ok(body.length>0)
        assert.equal(res.statusCode,200);
    });

    //Get not found
    request('http://localhost:3000/proposal/123', { json: true }, (err, res, body) => {
        if (err) assert.fail(err);
        assert.equal(body.message.includes("Not found"),true);
        assert.equal(res.statusCode,404);
    });

    //Get specific insured
    request('http://localhost:3000/proposal', { json: true }, (err, res, body) => {
        if (err) assert.fail(err);
        let uuid = body[0].uuid;
        request('http://localhost:3000/proposal/'+uuid, { json: true }, (err, res, body) => {
            if (err) assert.fail(err);
            assert.equal(body.uuid,uuid);
            assert.equal(res.statusCode,200);
        });
    });
    
    //Delete not found
    request.del('http://localhost:3000/proposal/123', { json: true }, (err, res, body) => {
        if (err) assert.fail(err);
        assert.equal(body.message.includes("Not found"),true);
        assert.equal(res.statusCode,404);
    });

    //Delete specific insured
    request('http://localhost:3000/proposal', { json: true }, (err, res, body) => {
        if (err) assert.fail(err);
        let uuid = body[0].uuid;
        request.del('http://localhost:3000/proposal/'+uuid, { json: true }, (err, res, body) => {
            if (err) assert.fail(err);
            assert.equal(res.statusCode,200);
            request('http://localhost:3000/proposal/'+uuid, { json: true }, (err, res, body) => {
                if (err) assert.fail(err);
                assert.equal(body.message.includes("Not found"),true);
                assert.equal(res.statusCode,404);
            });
        });
    });

    let proposalUpdate = new Proposal({
        insuredUuid : "1111",
        car : {
            plate : "AZD-9999",
            chassis : "87sf8a9fdfusidusaiudio9d98s0da",    	    
            year :	"20009",
            model :	"Audi A4"
        },
        payment : {
            price : "12000.00"
        },	    	
        validity : {
            start : "2019-04-17", 
            end : "2020-04-17"
        }
    });

    //Update not found
    request.put('http://localhost:3000/proposal/123', { json: proposalUpdate }, (err, res, body) => {
        if (err) assert.fail(err);
        assert.equal(body.message.includes("Not found"),true);
        assert.equal(res.statusCode,404);
    });

    //Update specific insured
    // request('http://localhost:3000/proposal', { json: true }, (err, res, body) => {
    //     if (err) assert.fail(err);
    //     let uuid = body[0].uuid;
    //     request.put('http://localhost:3000/proposal/'+uuid, { json: proposalUpdate }, (err, res, body) => {
    //         if (err) assert.fail(err);
    //         assert.equal(res.statusCode,200);
    //         request('http://localhost:3000/proposal/'+uuid, { json: data }, (err, res, body) => {
    //             if (err) assert.fail(err);

    //             // assert.equal(body.firstName,"João");
    //             // assert.equal(body.lastName,"Silva");
    //             // assert.equal(body.document,"12345678969");
    //             // assert.equal(body.birthday,"1960-01-13");

    //             // assert.equal(body.contact.email,"jsilva@insured.com.br");
    //             // assert.equal(body.contact.phone,"5521999988886");

    //             // assert.equal(body.location.country,"Brasil");
    //             // assert.equal(body.location.state,"Rio de Janeiro");
    //             // assert.equal(body.location.city,"Rio de Janeiro");
    //             // assert.equal(body.location.street,"Rua Cosme Velho");
    //             // assert.equal(body.location.number,"513");
    //             // assert.equal(body.location.code,"22241125");

    //             // assert.equal(body.payment.cardNumber,"9999999999999999");
    //             // assert.equal(body.payment.valid,"21-09");

    //             assert.equal(res.statusCode,200);
    //         });
    //     });
    // });

})();
