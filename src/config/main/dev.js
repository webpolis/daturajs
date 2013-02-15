/**
 * Sample dev configuration. Copy this file
 * to dev.js, and set the database configs to
 * match your local development database.
 *
 * @type {Object}
 */

module.exports = {

	// sanity check
	environment_name: 'DEVELOPMENT',

	db:{
        driver:'postgres',
        host:'localhost',
        username:'dev',
        password:'dev',
        database:'uncommon_development',
        port:5432
    }

};