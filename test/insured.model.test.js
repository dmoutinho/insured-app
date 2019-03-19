const assert = require('assert');
const validate = require("validate.js");
const validateUtils = require("../app/utils/validate.utils");
const Insured = require('../app/models/insured.model.js');

describe('insured.model.test.js', function() {
    describe('firstName required', function() {
        it('should return array with FIRSTNAME_REQUIRED', function() {
            let erros = (new Insured({})).validate();
            assert.ok(erros.indexOf("FIRSTNAME_REQUIRED")!=-1);
            assert.ok(false);
        });
    });
    describe('firstName length 1', function() {
        it('should return array with FIRSTNAME_MIN_MAX', function() {
            let erros = (new Insured({ firstName : "D"})).validate();
            assert.ok(erros.indexOf("FIRSTNAME_MIN_MAX")!=-1);
        });
    });
    describe('firstName length 16', function() {
        it('should return array with out FIRSTNAME_MIN_MAX', function() {
            let erros = (new Insured({ firstName : "123456789012345"})).validate();
            assert.ok(erros.indexOf("FIRSTNAME_MIN_MAX")===-1);
        });
    });
    describe('firstName length 15', function() {
        it('should return array with out FIRSTNAME_MIN_MAX', function() {
            let erros = (new Insured({ firstName : "123456789012345"})).validate();
            assert.ok(erros.indexOf("FIRSTNAME_MIN_MAX")===-1);
        });
    
    });
    describe('all field', function() {
        it('should return array empty', function() {
            let insured = {
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
            let erros = (new Insured(insured)).validate();
            assert.ok(erros.length===0);
        });
    
    });
});
