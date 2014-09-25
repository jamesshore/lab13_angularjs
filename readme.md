The Lab: Front-End Frameworks: AngularJS
===========

This repository contains the sample code for the forthcoming Front-End Frameworks: AngularJS episodes of James Shore's screencast. Let's Code: Test-Driven JavaScript is a screencast series focused on rigorous, professional JavaScript development.

This code will be livestreamed! Check out http://www.letscodejavascript.com/v3/blog/2014/09/angular_livestream for details. 


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