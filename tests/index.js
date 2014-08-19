var should = require('chai').should(),
    bloater = require('../index');
	
	
describe('properties', function () {
  it('has states', function () {
	bloater.should.have.property('states');
  });
  it('has entity', function () {
	bloater.should.have.property('entity');
  });  
  it('has set()', function () {
	bloater.should.have.property('set');
  });
  	it('has clearStates()', function () {
	bloater.should.have.property('clearStates');
  });
	it('has addState()', function () {
	bloater.should.have.property('addState');
  });
  	it('has get()', function () {
	bloater.should.have.property('get');
  });
});

describe('set function', function () {
  it('should set the entity', function () {
		var entity = {name:'test'};
		bloater.set(entity);
		bloater.entity.name.should.equal(entity.name);
  });
	it('should be chainable', function () {
		var entity = {name:'test'},
			entity2 = {name:'test2'};
		bloater.set(entity)
			   .set(entity2);
		bloater.entity.name.should.equal(entity2.name);
  });
});

describe('clearState function', function () {
  it('should clear states', function () {
		var state = {name:'test', mapping: ['f1', 'f2']};
		bloater.addState(state);
		bloater.clearStates();
		bloater.states.length.should.equal(0);
  });
  it('should be chainable', function () {
		var state = {name:'test', mapping: ['f1', 'f2']};
		
		bloater.clearStates()
			   .addState(state);
		bloater.states.length.should.equal(1);
  });
});

describe('addState function', function () {
  it('should add a state', function () {
		var state = {name:'test', mapping: ['f1', 'f2']};
		bloater.clearStates();
		bloater.addState(state);
		bloater.states.length.should.equal(1);
  });
  it('should be chainable', function () {
		var state = {name:'test', mapping: ['f1', 'f2']},
			state2 = {name:'test2', mapping: ['f1', 'f2', 'f3']};
		bloater.clearStates()
				.addState(state)
			   .addState(state2);
		bloater.states.length.should.equal(2);
  });
});