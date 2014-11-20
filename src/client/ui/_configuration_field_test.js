// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var configurationField = require("./configuration_field.js");
var UserEnteredDollars = require("../values/user_entered_dollars.js");

describe.only("ConfigurationField", function() {

	var $compile;
	var $rootScope;

	beforeEach(angular.mock.module(configurationField.name));

	beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it("defaults to an initial value", function() {
		var parentScope = $rootScope.$new();
		parentScope.initialValue = {
			instance: new UserEnteredDollars("123")
		};

		var html = "<configuration-field value='initialValue'>Title:</configuration-field>";
		var element = $compile(html)(parentScope);
		$rootScope.$digest();

		var inputField = element.find("input");
		expect(inputField.val()).to.be("123");
		expect(inputField.hasClass("invalid")).to.be(false);
		expect(inputField.attr("title")).to.be("");
	});

	it("renders invalid values with a warning icon", function() {
		var parentScope = $rootScope.$new();
		parentScope.initialValue = {
			instance: new UserEnteredDollars("xxx")
		};

		var html = "<configuration-field value='initialValue'>Title:</configuration-field>";
		var element = $compile(html)(parentScope);
		$rootScope.$digest();

		var inputField = element.find("input");
		expect(inputField.val()).to.be("xxx");
		expect(inputField.hasClass("invalid")).to.be(true);
		expect(inputField.attr("title")).to.be("Invalid dollar amount");
	});

	it("changes rendering when user input changes", function() {
		var parentScope = $rootScope.$new();
		parentScope.initialValue = {
			instance: new UserEnteredDollars("123")
		};

		var html = "<configuration-field value='initialValue'>Title:</configuration-field>";
		var element = $compile(html)(parentScope);
		$rootScope.$digest();
		var inputField = element.find("input");

		parentScope.initialValue = {
			instance: new UserEnteredDollars("xxx")
		};
		$rootScope.$apply();

		expect(inputField.hasClass("invalid")).to.be(true);
	});


	it("renders a label and field", function() {
		// TODO
	});

	it("stores user's input in the scope", function() {
		// TODO
	});

	it("changes scope when user input changes", function() {
		// TODO
	});

	it("displays warning icon when a bad value is inputted", function() {
		// TODO
	});

});
