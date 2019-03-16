const assert = require('assert');
const request = require('request');
const Proposal = require('../../app/models/proposal.model.js');

function getProposal() {
    return {
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
    }
}

function getProposal2() {
    return {
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
    }
}

describe('proposal api', function() {
    describe('create and get', function() {
        it('should create and return a proposal', function(done) {
            request.post('http://localhost:3000/proposal', { json: getProposal() }, (err, res, body) => {
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

                    done();
        
                });
            });
        });
    });
    describe('list', function() {
        it('should return all proposal', function(done) {
            request('http://localhost:3000/proposal', { json: true }, (err, res, body) => {
                if (err) assert.fail(err);
                assert.ok(body.length>0)
                assert.equal(res.statusCode,200);
                done();
            });
        });
    });
    describe('get not found', function() {
        it('should return not found', function(done) {
            request('http://localhost:3000/proposal/123', { json: true }, (err, res, body) => {
                if (err) assert.fail(err);
                assert.equal(body.message.includes("Not found"),true);
                assert.equal(res.statusCode,404);
                done();
            });
        });
    });
    describe('delete not found', function() {
        it('should return not found', function(done) {
            request.del('http://localhost:3000/proposal/123', { json: true }, (err, res, body) => {
                if (err) assert.fail(err);
                assert.equal(body.message.includes("Not found"),true);
                assert.equal(res.statusCode,404);
                done();
            });
        });
    });
    describe('delete specific insured', function() {
        it('should create and delete', function(done) {
            request.post('http://localhost:3000/proposal', { json: getProposal() }, (err, res, body) => {
                if (err) assert.fail(err);
                let uuid = body.uuid;
                request.del('http://localhost:3000/proposal/'+uuid, { json: true }, (err, res, body) => {
                    if (err) assert.fail(err);
                    assert.equal(res.statusCode,200);
                    request('http://localhost:3000/proposal/'+uuid, { json: true }, (err, res, body) => {
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
            request.put('http://localhost:3000/proposal/123', { json: getProposal() }, (err, res, body) => {
                if (err) assert.fail(err);
                assert.equal(body.message.includes("Not found"),true);
                assert.equal(res.statusCode,404);
                done();
            });
        });
    });    
    describe('create and get', function() {
        it('should create and return a proposal', function(done) {
            request.post('http://localhost:3000/proposal', { json: getProposal() }, (err, res, body) => {
                if (err) assert.fail(err);
                let uuid = body.uuid;
                request.put('http://localhost:3000/proposal/'+uuid, { json: getProposal2() }, (err, res, body) => {
                    if (err) assert.fail(err);
                    assert.equal(res.statusCode,200);
                    request.get('http://localhost:3000/proposal/'+uuid, { json: true }, (err, res, body) => {
                        if (err) assert.fail(err);
            
                        assert.equal(body.car.plate,"AZD-9999");
                        assert.equal(body.car.chassis,"87sf8a9fdfusidusaiudio9d98s0da");
                        assert.equal(body.car.year,"20009");
                        assert.equal(body.car.model,"Audi A4");
            
                        assert.equal(body.payment.price,"12000.00");
            
                        assert.equal(body.validity.start,"2019-04-17");
                        assert.equal(body.validity.end,"2020-04-17");
            
                        assert.equal(res.statusCode,200);
    
                        done();
            
                    });
                });
            });
        });
    });    
});