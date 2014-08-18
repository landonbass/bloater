var should = require('chai').should(),
    bloater = require('../index');
	
	
describe('states', function() {
  it('has states', function() {
	bloater.should.have.property('states');
  });
});