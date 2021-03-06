import {expect} from '../test';
import EventObject from '../../src/tabris/EventObject';

describe('EventObject', function() {

  let target;

  beforeEach(function() {
    target = {};
  });

  describe('constructor', function() {

    it('throws for missing parameter', function() {
      expect(() => new EventObject()).to.throw(Error, 'Not enough arguments');
      expect(() => new EventObject('foo')).to.throw(Error, 'Not enough arguments');
    });

    it('sets type from parameter', function() {
      let event = new EventObject('foo', target);
      expect(event.type).to.equal('foo');
    });

    it('sets target from parameter', function() {
      let event = new EventObject('type', target);
      expect(event.target).to.equal(target);
    });

    it('sets current timestamp', function() {
      let event = new EventObject('type', target);

      expect(event.timeStamp).to.be.above(0);
      expect(event.timeStamp).to.be.closeTo(Date.now(), 100);
    });

    it('copies data into instance', function() {
      let event = new EventObject('type', target, {foo: 23});

      expect(event.foo).to.equal(23);
    });

    it('includes data as read-only properties', function() {
      let event = new EventObject('type', target, {foo: 23});

      event.foo = 42;

      expect(event.foo).to.equal(23);
    });

    it('does not copy target, type, or timeStamp from data', function() {
      let event = new EventObject('bar', target, {foo: 23, type: 'foo', target: {}, timeStamp: 42});

      expect(event.foo).to.equal(23);
      expect(event.type).to.equal('bar');
      expect(event.target).to.equal(target);
      expect(event.timeStamp).to.not.equal(42);
    });

  });

  describe('instance', function() {

    let event;

    beforeEach(function() {
      event = new EventObject('foo', target);
    });

    describe('type', function() {

      it('is read-only', function() {
        event.type = 'bar';
        expect(event.type).to.equal('foo');
      });

      it('is enumerable', function() {
        expect(Object.keys(event)).to.include('type');
      });

    });

    describe('target', function() {

      it('is read-only', function() {
        event.target = {};
        expect(event.target).to.equal(target);
      });

      it('is enumerable', function() {
        expect(Object.keys(event)).to.include('target');
      });

    });

    describe('timeStamp', function() {

      it('is read-only', function() {
        event.timeStamp = 23;
        expect(event.timeStamp).to.be.closeTo(Date.now(), 100);
      });

      it('is enumerable', function() {
        expect(Object.keys(event)).to.include('timeStamp');
      });

    });

    describe('defaultPrevented', function() {

      it('is read-only', function() {
        event.defaultPrevented = true;
        expect(event.defaultPrevented).to.be.false;
      });

    });

    describe('preventDefault', function() {

      it('sets defaultPrevented', function() {
        event.preventDefault();
        expect(event.defaultPrevented).to.be.true;
      });

    });

  });

});
