const assert = require('assert');
const request = require('request');

(function(){

    describe('Insured', function() {
    
        describe('List', function() {
            it('should return length 4 and http code 200', function() {
                request('http://localhost:3000/insured', { json: true }, (err, res, body) => {
                    if (err) { return console.log(err); }
                    assert.equal(body.length,4);
                    assert.equal(res.statusCode,200);
                });
            });
        });
        
        describe('Get', function() {
            it('should return not found message and http code 404', function() {
                request('http://localhost:3000/insured/123', { json: true }, (err, res, body) => {
                    if (err) { return console.log(err); }
                    assert.equal(body.message.includes("not found"),true);
                    assert.equal(res.statusCode,404);
                });
            });
            it('should return specific insured and http code 200', function() {
                request('http://localhost:3000/insured', { json: true }, (err, res, body) => {
                    if (err) { return console.log(err); }
                    let uuid = body[0].uuid;
                    request('http://localhost:3000/insured/'+uuid, { json: true }, (err, res, body) => {
                        if (err) { return console.log(err); }
                        assert.equal(body.uuid,uuid);
                        assert.equal(res.statusCode,200);
                    });
                });
            });    
        });

        describe('Delete', function() {
            it('should return not found message and http code 404', function() {
                request.del('http://localhost:3000/insured/123', { json: true }, (err, res, body) => {
                    if (err) { return console.log(err); }
                    assert.equal(body.message.includes("not found"),true);
                    assert.equal(res.statusCode,404);
                });
            });
            it('should return http code 200', function() {
                request('http://localhost:3000/insured', { json: true }, (err, res, body) => {
                    if (err) { return console.log(err); }
                    let uuid = body[0].uuid;
                    request.del('http://localhost:3000/insured/'+uuid, { json: true }, (err, res, body) => {
                        if (err) { return console.log(err); }
                        assert.equal(res.statusCode,200);
                        request('http://localhost:3000/insured/'+uuid, { json: true }, (err, res, body) => {
                            if (err) { return console.log(err); }
                            assert.equal(body.message.includes("not found"),true);
                            assert.equal(res.statusCode,404);
                        });
                    });
                });
            });    
        });
        
        describe('Update', function() {

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

            it('should return not found message and http code 404', function() {
                request.put('http://localhost:3000/insured/123', { json: data }, (err, res, body) => {
                    if (err) { return console.log(err); }
                    assert.equal(body.message.includes("not found"),true);
                    assert.equal(res.statusCode,404);
                });
            });
            it('should return insured and http code 200', function() {
                request('http://localhost:3000/insured', { json: true }, (err, res, body) => {
                    if (err) { return console.log(err); }
                    let uuid = body[0].uuid;
                    console.log(uuid)
                    request.put('http://localhost:3000/insured/'+uuid, { json: data }, (err, res, body) => {
                        if (err) { return console.log(err); }
                        console.log(body)
                        assert.equal(res.statusCode,200);


                        // request('http://localhost:3000/insured/'+uuid, { json: data }, (err, res, body) => {
                        //     if (err) { return console.log(err); }
                        //     //assert.equal(body.message.includes("not found"),true);
                        //     assert.equal(res.statusCode,200);
                        // });
                    });
                });
            });    

        });
        
    });

})();