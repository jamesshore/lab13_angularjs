// Copyright (c) 2012-2014 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
/*global desc, task, jake, fail, complete, directory, require, console, process */
(function () {
	"use strict";

	// Uncomment and modify the following list to cause the build to fail unless these browsers are tested.
	var REQUIRED_BROWSERS = [
		"IE 9.0.0 (Windows 7)",
		"IE 10.0.0 (Windows 7)",
		"IE 11.0.0 (Windows 7)",
		"Firefox 31.0.0 (Mac OS X 10.8)",
		"Chrome 37.0.2062 (Mac OS X 10.8.5)",
		"Safari 6.1.6 (Mac OS X 10.8.5)",
		"Mobile Safari 7.0.0 (iOS 7.1)"
	];

	var jshint = require("simplebuild-jshint");
	var shell = require("shelljs");
	var browserify = require("./build/util/browserify_runner.js");
	var karma = require("./build/util/karma_runner.js");

	var GENERATED_DIR = "generated";
	var BROWSERIFY_DIR = GENERATED_DIR + "/browserify";
	var DEPLOY_DIR = GENERATED_DIR + "/deploy";
	var CLIENT_DIR = "src/client";
	var VENDOR_DIR = "src/vendor";

	directory(BROWSERIFY_DIR);
	directory(DEPLOY_DIR);

	desc("Delete generated files");
	task("clean", function() {
		jake.rmRf(GENERATED_DIR);
	});

	desc("Lint, test, and build");
	task("default", [ "lint", "test", "build" ], function() {
		console.log("\n\nOK");
	});

	desc("Start Karma server -- run this first");
	task("karma", function() {
		karma.serve(complete, fail);
	}, {async: true});

	desc("Start HTTP server for manual testing");
	task("run", [ "build" ], function() {
		jake.exec("node ./node_modules/http-server/bin/http-server " + DEPLOY_DIR, { interactive: true }, complete);
	}, {async: true});

	desc("Test everything");
	task("test", [], function() {
		console.log("Testing client code:");
		karma.runTests(REQUIRED_BROWSERS, complete, fail);
	}, { async: true} );

	desc("Create deployable client files");
	task("build", [ DEPLOY_DIR, "browserify" ], function() {
		console.log("Building deploy dir: .");
		shell.rm("-rf", DEPLOY_DIR + "/*");
		shell.cp("-R",
				CLIENT_DIR + "/*.html",
				CLIENT_DIR + "/*.css",
				CLIENT_DIR + "/*.png",
				BROWSERIFY_DIR + "/*",
				VENDOR_DIR,
			DEPLOY_DIR
		);
	});

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

	task("browserify", [ BROWSERIFY_DIR ], function() {
		console.log("Bundling client JavaScript with Browserify: .");
		browserify.bundle(CLIENT_DIR + "/example.js", BROWSERIFY_DIR + "/bundle.js", complete, fail);
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