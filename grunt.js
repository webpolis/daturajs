module.exports = function(grunt) {

	// Project configuration.
	
	grunt.initConfig({

		pkg: '<json:package.json>',

		testfiles: {
			files: ['src/**/*.js', 'lib/**/*.js', 'test/**/*.js']
		},

		watch: {
			files: '<config:testfiles.files>',
			tasks: 'exec:run_jasmine_tests'
		},

		exec: {

			// Clears screen, sets environment variable in node to "test",
			// Runs jasmine-node against all specs inside the test folder.
			// You can control which specs get run by sending in different
			// options to jasmine-node.

			run_jasmine_tests: {
				command: 'clear; NODE_ENV=test node ./node_modules/jasmine-node/bin/jasmine-node test/',
				stdout: true
			}
		}

	});

	// Grunt shell seems to have a bug which is making
	// it unusable on my system, using exec instead
	grunt.loadNpmTasks('grunt-exec');

};