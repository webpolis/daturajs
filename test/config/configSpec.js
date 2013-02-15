var config = require('../../src/config/main');


// Configuration Spec

describe('Configuration', function() {

	it('should have loaded the test environment', function() {
		console.log("Environment: %s", process.env.NODE_ENV);
		expect(process.env.NODE_ENV).toBe('test');
	});

	// TODO: write more meaningful config tests
	
});
