'use strict';
/*jslint node: true */
/*global it, beforeEach, afterEach */

var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var Troll=require('../lib/troll-avg');


var clock;
beforeEach(function () {
   // Wait for a new second before starting the tests
   var ms=0;
    do {
      ms=new Date().getMilliseconds();
    } while (ms>50);
     clock = sinon.useFakeTimers();
 });

afterEach(function () {
    clock.restore();
});


//
// Test a single average
//
// Check that that the average is zero until a full second has passed.
// Then fill the bins with 1,10,100,1000,10000, one number per second
// and check tat the returned arverages are ok.
// Then let the data be "bumped out" over five seconds and check
// that the averages are ok.
//
it("Tetsting 5-bin named foo ", function() {
  var troll=new Troll(['foo'],1,5);

  expect(troll.average('foo')).to.be.equal(0);
  troll.update('foo',1);
  expect(troll.average('foo')).to.be.equal(0);
  clock.tick(1500);
  expect(troll.average('foo')).to.be.equal(1);
  troll.update('foo',10);
  clock.tick(1000);
  expect(troll.average('foo')).to.be.equal((1+10)/2);
  troll.update('foo',100);
  clock.tick(1000);
  expect(troll.average('foo')).to.be.equal((1+10+100)/3);
  troll.update('foo',1000);
  clock.tick(1000);
  expect(troll.average('foo')).to.be.equal((1+10+100+1000)/4);
  troll.update('foo',10000);
  clock.tick(1000);
  expect(troll.average('foo')).to.be.equal((1+10+100+1000+10000)/5);
  expect(troll.averages()).to.be.eql({'foo':(1+10+100+1000+10000)/5});
  clock.tick(1000);
  expect(troll.average('foo')).to.be.equal((10+100+1000+10000)/5);
  clock.tick(1000);
  expect(troll.average('foo')).to.be.equal((100+1000+10000)/5);
  clock.tick(1000);
  expect(troll.average('foo')).to.be.equal((1000+10000)/5);
  clock.tick(1000);
  expect(troll.average('foo')).to.be.equal(10000/5);
  clock.tick(1000);
  expect(troll.average('foo')).to.be.equal(0);
});


//
// Test multiple averages
//
// Check that that the average is zero until a full second has passed.
// Then fill the bins with 1,10,100,1000,10000, one number per second
// and check tat the returned arverages are ok.
// Then let the data be "bumped out" over five seconds and check
// that the averages are ok.
//
it("Testing 3-bin with nameds foo and bar ", function() {
  var troll=new Troll(['foo','bar'],1,3);

  expect(troll.average('foo')).to.be.equal(0);
  expect(troll.average('bar')).to.be.equal(0);
  troll.update('foo',17);
  troll.update('bar',42);
  clock.tick(1500);
  expect(troll.average('foo')).to.be.equal(17);
  expect(troll.average('bar')).to.be.equal(42);
  clock.tick(1000);
  expect(troll.average('foo')).to.be.equal(17/2);
  expect(troll.average('bar')).to.be.equal(42/2);
  expect(troll.averages()).to.be.eql({'foo':17/2,'bar':42/2});
});



