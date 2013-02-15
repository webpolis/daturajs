## Installing Test Modules

I registered these modules as dependencies in package.json so you can also
install these by going to the root of the repo and using npm, which will just
examine the package.json file and download any dependencies into a node_modules
folder in the local project.

	npm install


Optionally, you can install these packages globally. (They're pretty handy.)

	npm install jasmine-node grunt grunt-exec -g


You can learn more about jasmine-node, which is a command line utility that will
run all the tests in a given directory here. There are command-line options for
changing which files get executed and a variety of other goodies.

	https://github.com/mhevery/jasmine-node


One jasmine option I did NOT use was the built-in file watcher because it only
examines files inside the indicated directory. That makes it less useful when
you want tests to  run every time your source changes as well. (Because source
files are typically stored outside the test directory).

To solve that problem, I installed grunt, is a great tool for automating a
variety of tasks. You can cause LESS or SASS css files to compile, build
minified versions of client-side javascript cleanup temp directories, reset
databases, or whatever. Check out the docs. Essentially it's like writing a
Makefile but with an automated file-watcher built-in.
	
	http://gruntjs.com/

	


## Starting the file watcher

After you've got all the packages, either globally or locally, then any of these
commands should work to start the auto-test watcher...

    ./watch.sh

or
    grunt watch

or
    node ./node_modules/grunt/bin/grunt watch

...and from then on, whenever you change a source file or a test spec the jasmine
specs will run in your terminal window.



If you want to run the tests manually:

	npm test

or

	grunt exec:run_jasmine_tests



Mason Houtz
mason@clevertech.biz
