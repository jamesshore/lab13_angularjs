// Copyright (c) 2012-2014 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
/*global desc, task, jake, fail, complete, directory, require, console, process */
(function () {
	"use strict";

	// Uncomment and modify the following list to cause the build to fail unless these browsers are tested.
	var REQUIRED_BROWSERS = [
//		"IE 8.0.0 (Windows 7)",
//		"IE 9.0.0 (Windows 7)",
//		"Firefox 31.0.0 (Mac OS X 10.8)",
//		"Chrome 37.0.2062 (Mac OS X 10.8.5)",
//		"Safari 6.1.6 (Mac OS X 10.8.5)",
//		"Mobile Safari 7.0.0 (iOS 7.1)"
	];

	var jshint = require("simplebuild-jshint");

	var GENERATED_DIR = "generated";
	var CLIENT_DIR = "src/client";

	desc("Delete generated files");
	task("clean", function() {
		jake.rmRf(GENERATED_DIR);
	});

	desc("Lint, test, and build");
	task("default", [ "lint" ], function() {
		console.log("\n\nOK");
	});

	desc("Start HTTP server for manual testing");
	task("run", function() {
		jake.exec("node ./node_modules/http-server/bin/http-server src/client", { interactive: true }, complete);
	}, {async: true});

	desc("Lint everything");
	task("lint", [ "lintNode", "lintClientJs" ]);

	task("lintNode", function() {
		process.stdout.write("Linting Node.js code: ");
		jshint.checkFiles({
			files: [ "Jakefile.js", "src/server/**/*.js", "build/util/**/*.js" ],
			options: nodeLintOptions(),
			globals: nodeLintGlobals()
		}, complete, fail);
	}, { async: true });

	task("lintClientJs", function() {
		process.stdout.write("Linting client-side JavaScript code: ");
		jshint.checkFiles({
			files: [ CLIENT_DIR + "/**/*.js", "!" + CLIENT_DIR + "/vendor/**/*" ],
			options: clientLintOptions(),
			globals: clientLintGlobals()
		}, complete, fail);
	}, { async: true });


	function clientJsFiles() {
		return new jake.FileList(CLIENT_DIR + "/**/*.js").toArray();
	}

	function globalLintOptions() {
		return {
			bitwise: true,
			curly: false,
			eqeqeq: true,
			forin: true,
			immed: true,
			latedef: false,
			newcap: true,
			noarg: true,
			noempty: true,
			nonew: true,
			regexp: true,
			undef: true,
			strict: true,
			globalstrict: true,     // "global" stricts are okay when using CommonJS modules
			trailing: true
		};
	}

	function nodeLintOptions() {
		var options = globalLintOptions();
		options.node = true;
		return options;
	}

	function clientLintOptions() {
		var options = globalLintOptions();
		options.browser = true;
		options.newcap = false;
		return options;
	}

	function globalLintGlobals() {
		return {
			// Mocha
			beforeEach: false,
			afterEach: false,
			describe: false,
			it: false,

			// Expect
			expect: false
		};
	}

	function nodeLintGlobals() {
		return globalLintGlobals();
	}

	function clientLintGlobals() {
		var globals = globalLintGlobals();

		// Angular
		globals.angular = false;

		// Karma
		globals.console = false;
		globals.dump = false;

		// CommonJS
		globals.exports = false;
		globals.require = false;
		globals.module = false;

		return globals;
	}

}());