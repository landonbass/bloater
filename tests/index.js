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

describe('get function', function () {
  it('should return an object', function () {
		var entity = {name:'landon'},
			state = {name:'test', mapping: ['name']};
		bloater.clearStates()
				.set(entity)
				.addState(state);
		var newEntity = bloater.get('test');
		newEntity.name.should.equal(entity.name);
  });
  it('should return an object with the state set correctly', function () {
		var entity = {firstName:'landon', lastName:'bass', fullName:'landon bass'},
			state = {name:'master', mapping: ['firstName', 'lastName','fullName']},
			state2 = {name:'dto', mapping: ['firstName', 'lastName']};
		bloater.clearStates()
				.set(entity)
				.addState(state)
				.addState(state2);
		var newEntity = bloater.get('dto');
		newEntity.should.have.property('firstName');
		newEntity.should.have.property('lastName');
		newEntity.should.not.have.property('fullName');
		newEntity.firstName.should.equal(entity.firstName);
		newEntity.lastName.should.equal(entity.lastName);
		
		//this is a denormalized object
		//perhaps an aggregation from a series of nosql calls
		var denormalizedObject = {
			firstName: 'Landon'
			, lastName: 'Bass'
			, jobId: 123
			, jobName: 'developer'
			, jobCompany: 'abc corp.'
		};
		
		//these are the 'states' (or views) that drive the returned object
		var toUIDisplay = {name: 'toUIDisplay', mapping:['firstName', 'lastName', 'jobId', 'jobName']},
			toDatabase = {name: 'toDatabase', mapping:['firstName', 'lastName', 'jobId']};
			
		bloater.clearStates()
				.set(denormalizedObject)
				.addState(toUIDisplay)
				.addState(toDatabase);
		
		var uiObject = bloater.get('toUIDisplay');
		/*
			{
				firstName: 'Landon'
				, lastName: 'Bass'
				, jobId: 123
				, jobName: 'developer'
			}
		*/
		
		var dbObject = bloater.get('toDatabase');
		/*
			{
				firstName: 'Landon'
				, lastName: 'Bass'
				, jobId: 123
			}
		*/
  });
   it('should return an function as a property', function () {
		var entity = {firstName:'landon', lastName:'bass', fullName: function(){return this.firstName+' ' +this.lastName}},
			state = {name:'master', mapping: ['firstName', 'lastName','fullName']};
		bloater.clearStates()
				.set(entity)
				.addState(state);
		var e = bloater.get('master');
		e.fullName().should.equal('landon bass');
				
	});
});
