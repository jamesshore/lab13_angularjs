The Lab: Front-End Frameworks: AngularJS
===========

This repository contains the sample code for the [Front-End Frameworks: AngularJS](http://www.letscodejavascript.com/v3/episodes/lab/13) episodes ([Part I](http://www.letscodejavascript.com/v3/episodes/lab/13), [Part II](http://www.letscodejavascript.com/v3/episodes/lab/14)) of James Shore's screencast. Let's Code: Test-Driven JavaScript is a screencast series focused on rigorous, professional JavaScript development.

These episodes are an exploration and review of the [AngularJS](https://angularjs.org/) framework for building web applications. This repository contains an example application written in AngularJS. It demonstrates several concepts:

1. **Sample application.** The sample application code can be found in `src/client`. The main page template is in `index.html`. Its controller is in `example.js`. The AngularJS UI code consists of several directives, which may be found in `src/client/ui`.

  The application also includes a domain layer, value objects, and a (simulated) persistence layer. Those layers are in subdirectories of `src/client`. This architecture was an experiment to see how well AngularJS handled an approach outside of its comfort zone. It didn't work well, and I don't recommend following this pattern in your own application.

  See the screencast for more information about the sample app.

2. **Unit Tests.** All the code is unit tested. You can find tests of an AngularJS controller in `src/client/_example_test.js` and tests of directives in `src/client/ui/_*_test.js`. Pay particular attention to the setup code; it's tricky to get right and the test setup fails silently if it's wrong. Also see `build/config/karma.conf.js` for how the Karma test runner is configured. In particular, the `angular-mocks` file must be included, or the test setup silently fails.

3. **Modularity.** We use CommonJS `require()` statements for modularity, and we use Browserify to make it work. AngularJS isn’t designed to work with CommonJS, so see `src/client/example.js` to see how files are included, and e.g., `src/client/ui/configuration_panel.js` to see how modules are exported.

  Other than the AngularJS integration, there's nothing unusual about the CommonJS infrastructure. See the "browserify" target in `Jakefile.js` and `build/util/browserify_runner.js` for the automated build. (You can use `browserify_runner.js` in your own build scripts.) See `build/config/karma.conf.js` for the karma-commonjs configuration needed to make tests work.

For further details about how this code works, watch [the screencasts](http://www.letscodejavascript.com/v3/episodes/lab/13).


Setup
-----

To try this code on your own computer:

1. Install [Node.js](http://nodejs.org/download/).
2. Download and unzip the source code into a convenient directory.
3. All commands must run from the root of the source tree: `cd <directory>`.


Running the Sample Application
------------------------------

1. Run `./jake.sh run` (Unix/Mac) or `jake run` (Windows)
2. Open `http://localhost:8080` in a browser.


Running the Tests
-----------------

1. Run `./jake.sh karma` (Unix/Mac) or `jake karma` (Windows) to start the Karma server.
2. Start the browsers you want to test and point each one at `http://localhost:9876`.
3. Run `./jake.sh` (Unix/Mac) or `jake` (Windows) every time you want to build and test.


License
-------

MIT License. See `LICENSE.TXT`.