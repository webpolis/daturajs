var Sample = require('./sample');

describe('Sample Module', function() {

	var sample;
	
	beforeEach(function() {
		sample = new Sample();
	});

	it('instance should not be null', function() {
		expect(sample).not.toBe(null);
		expect(sample.foo).toBe(123);
	});

});