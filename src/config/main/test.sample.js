/**
 * Sample test configuration. Copy this file
 * to test.js, and set the database configs to
 * match your test database.
 *
 * @type {Object}
 */

module.exports = {

	// sanity check
	environment_name: 'TEST',

	db:{
        driver:'postgres',
        host:'localhost',
        username:'mason',
        password:'mason',
        database:'uncommon_test',
        port:5432
    }

};