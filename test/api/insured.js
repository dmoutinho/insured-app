const assert = require('assert');
const request = require('request');

(function(){

    //List
    request('http://localhost:3000/insured', { json: true }, (err, res, body) => {
        if (err) assert.fail(err);
        assert.ok(res.statusCode,200);
    });

    //Get not found
    request('http://localhost:3000/insured/123', { json: true }, (err, res, body) => {
        if (err) assert.fail(err);
        assert.equal(body.message.includes("Not found"),true);
        assert.equal(res.statusCode,404);
    });

    //Get specific insured
    request('http://localhost:3000/insured', { json: true }, (err, res, body) => {
        if (err) assert.fail(err);
        let uuid = body[0].uuid;
        request('http://localhost:3000/insured/'+uuid, { json: true }, (err, res, body) => {
            if (err) assert.fail(err);
            assert.equal(body.uuid,uuid);
            assert.equal(res.statusCode,200);
        });
    });
    
    //Delete not found
    request.del('http://localhost:3000/insured/123', { json: true }, (err, res, body) => {
        if (err) assert.fail(err);
        assert.equal(body.message.includes("Not found"),true);
        assert.equal(res.statusCode,404);
    });

    //Delete specific insured
    request('http://localhost:3000/insured', { json: true }, (err, res, body) => {
        if (err) assert.fail(err);
        let uuid = body[0].uuid;
        request.del('http://localhost:3000/insured/'+uuid, { json: true }, (err, res, body) => {
            if (err) assert.fail(err);
            assert.equal(res.statusCode,200);
            request('http://localhost:3000/insured/'+uuid, { json: true }, (err, res, body) => {
                if (err) assert.fail(err);
                assert.equal(body.message.includes("Not found"),true);
                assert.equal(res.statusCode,404);
            });
        });
    });

    let data = {
        firstName : "João",
        lastName : "Silva",
        document : "12345678969",
        birthday : "1960-01-13",
        contact : {
            email : "jsilva@insured.com.br",
            phone :	"5521999988886"    	    

        },
        location : {
            country : "Brasil",
            state : "Rio de Janeiro",
            city : "Rio de Janeiro",
            street : "Rua Cosme Velho",
            number : "513",
            code : "22241125"
        },	    	
        payment : {
            cardNumber : "9999999999999999", 
            valid : "21-09"
        }
    };

    //Update not found
    request.put('http://localhost:3000/insured/123', { json: data }, (err, res, body) => {
        if (err) assert.fail(err);
        assert.equal(body.message.includes("Not found"),true);
        assert.equal(res.statusCode,404);
    });

    //Update specific insured
    request('http://localhost:3000/insured', { json: true }, (err, res, body) => {
        if (err) assert.fail(err);
        let uuid = body[1].uuid;
        request.put('http://localhost:3000/insured/'+uuid, { json: data }, (err, res, body) => {
            if (err) assert.fail(err);
            assert.equal(res.statusCode,200);
            request('http://localhost:3000/insured/'+uuid, { json: data }, (err, res, body) => {
                if (err) assert.fail(err);

                assert.equal(body.firstName,"João");
                assert.equal(body.lastName,"Silva");
                assert.equal(body.document,"12345678969");
                assert.equal(body.birthday,"1960-01-13");

                assert.equal(body.contact.email,"jsilva@insured.com.br");
                assert.equal(body.contact.phone,"5521999988886");

                assert.equal(body.location.country,"Brasil");
                assert.equal(body.location.state,"Rio de Janeiro");
                assert.equal(body.location.city,"Rio de Janeiro");
                assert.equal(body.location.street,"Rua Cosme Velho");
                assert.equal(body.location.number,"513");
                assert.equal(body.location.code,"22241125");

                assert.equal(body.payment.cardNumber,"9999999999999999");
                assert.equal(body.payment.valid,"21-09");

                assert.equal(res.statusCode,200);
            });
        });
    });

    //Create
    request.post('http://localhost:3000/insured', { json: data }, (err, res, body) => {
        if (err) assert.fail(err);
        let uuid = body.uuid;
        request.get('http://localhost:3000/insured/'+uuid, { json: data }, (err, res, body) => {
            if (err) assert.fail(err);
 
            assert.equal(body.firstName,"João");
            assert.equal(body.lastName,"Silva");
            assert.equal(body.document,"12345678969");
            assert.equal(body.birthday,"1960-01-13");

            assert.equal(body.contact.email,"jsilva@insured.com.br");
            assert.equal(body.contact.phone,"5521999988886");

            assert.equal(body.location.country,"Brasil");
            assert.equal(body.location.state,"Rio de Janeiro");
            assert.equal(body.location.city,"Rio de Janeiro");
            assert.equal(body.location.street,"Rua Cosme Velho");
            assert.equal(body.location.number,"513");
            assert.equal(body.location.code,"22241125");

            assert.equal(body.payment.cardNumber,"9999999999999999");
            assert.equal(body.payment.valid,"21-09");

            assert.equal(res.statusCode,200);

        });
    });

})();