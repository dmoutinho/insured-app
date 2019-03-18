const assert = require('assert');
const request = require('request');
const apiEndpoint = require('../../server').apiEndpoint;

function getInsured() {
    return {
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
};

function getInsured2() {
    return {
        firstName : "Pedro",
        lastName : "Cardosao",
        document : "9999999",
        birthday : "1969-09-19",
        contact : {
            email : "pedro@insured.com.br",
            phone :	"999988989898"    	    

        },
        location : {
            country : "Uruguai",
            state : "State",
            city : "City",
            street : "Street",
            number : "514",
            code : "99999"
        },	    	
        payment : {
            cardNumber : "888888888888888", 
            valid : "22-10"
        }
    };
};

describe('insured api', function() {
    describe('create and get', function() {
        it('should create and return an insured', function(done) {
            request.post(apiEndpoint+'/insured', { json: getInsured() }, (err, res, body) => {
                if (err) assert.fail(err);
                let uuid = body.uuid;
                request.get(apiEndpoint+'/insured/'+uuid, { json: true }, (err, res, body) => {
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

                    done();
        
                });
            });
            });
    });
    describe('list all', function() {
        it('should return an insured list', function(done) {
            request(apiEndpoint+'/insured', { json: true }, (err, res, body) => {
                if (err) assert.fail(err);
                assert.ok(body.length>0)
                assert.equal(res.statusCode,200);
                done();                    
            });
        });
    });
    describe('get not found', function() {
        it('should return not found', function(done) {
            request(apiEndpoint+'/insured/123', { json: true }, (err, res, body) => {
                if (err) assert.fail(err);
                assert.equal(body.message.includes("Not found"),true);
                assert.equal(res.statusCode,404);
                done();
            });
        });
    });
    describe('delete not found', function() {
        it('should return not found', function(done) {
            request.del(apiEndpoint+'/insured/123', { json: true }, (err, res, body) => {
                if (err) assert.fail(err);
                assert.equal(body.message.includes("Not found"),true);
                assert.equal(res.statusCode,404);
                done();
            });
        });
    });
    describe('create and delete specific insured', function() {
        it('should create and delete insured', function(done) {
            request.post(apiEndpoint+'/insured', { json: getInsured() }, (err, res, body) => {
                if (err) assert.fail(err);
                let uuid = body.uuid;
                request.del(apiEndpoint+'/insured/'+uuid, { json: true }, (err, res, body) => {
                    if (err) assert.fail(err);
                    assert.equal(res.statusCode,200);
                    request(apiEndpoint+'/insured/'+uuid, { json: true }, (err, res, body) => {
                        if (err) assert.fail(err);
                        assert.equal(body.message.includes("Not found"),true);
                        assert.equal(res.statusCode,404);
                        done();
                    });
                });
            });
        });
    });
    describe('update not found', function() {
        it('should return not found', function(done) {
            request.put(apiEndpoint+'/insured/123', { json: getInsured() }, (err, res, body) => {
                if (err) assert.fail(err);
                assert.equal(body.message.includes("Not found"),true);
                assert.equal(res.statusCode,404);
                done();
            });
        });
    });
    describe('create and update specific insured', function() {
        it('should return insured update', function(done) {
            request.post(apiEndpoint+'/insured', { json: getInsured() }, (err, res, body) => {
                if (err) assert.fail(err);
                let uuid = body.uuid;
                request.put(apiEndpoint+'/insured/'+uuid, { json: getInsured2() }, (err, res, body) => {
                    if (err) assert.fail(err);
                    assert.equal(res.statusCode,200);
                    request(apiEndpoint+'/insured/'+uuid, { json: true }, (err, res, body) => {
                        if (err) assert.fail(err);

                        assert.equal(body.firstName,"Pedro");
                        assert.equal(body.lastName,"Cardosao");
                        assert.equal(body.document,"9999999");
                        assert.equal(body.birthday,"1969-09-19");
        
                        assert.equal(body.contact.email,"pedro@insured.com.br");
                        assert.equal(body.contact.phone,"999988989898");
        
                        assert.equal(body.location.country,"Uruguai");
                        assert.equal(body.location.state,"State");
                        assert.equal(body.location.city,"City");
                        assert.equal(body.location.street,"Street");
                        assert.equal(body.location.number,"514");
                        assert.equal(body.location.code,"99999");
        
                        assert.equal(body.payment.cardNumber,"888888888888888");
                        assert.equal(body.payment.valid,"22-10");
        
                        assert.equal(res.statusCode,200);

                        done();
                    });
                });
            });

        });
    });
});