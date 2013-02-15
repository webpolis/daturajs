var config = require('../../src/config/main'),
	auth = require('../../lib/components/auth');


// Auth Component Spec

describe('Auth Component', function() {


	it('should reference the correct specs', function() {
		expect(process.env.NODE_ENV).toBe('test');
	});

	it('should have a db config property', function() {
		expect(config.db).not.toBe(null);
	});

	// TODO: make this useful...

});
