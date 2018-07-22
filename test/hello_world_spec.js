//var assert = require('assert');
//describe('Array', function() {
//  describe('#  ()', function() {
//    it('should return -1 when the value is not present', function() {
//      assert.equal(-1, [1,2,3].indexOf(4));
//    });
//  });
//});
//

let express = require('express');
let app = express();

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
let expect = require('chai').expect;
let server= require('../server');
describe('test registration', function(){
    console.log(" In test registration test case");
    it('this is a description ',function(){
    console.log(" Inside it description");
        
    })
})



describe('/GET dropdowns' ,()=>{
    it('it should get all the dropdown values', (done)=>{
        chai.request(app).get('/').end((err,res)=>{
                          //  res.should.have.status(200);
            res.body.should.be.a('object');
res.body.length.should.have.property('typeid');

            done();

            
        })
    })
})