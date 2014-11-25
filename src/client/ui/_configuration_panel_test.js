// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var configurationPanel = require("./configuration_panel.js");
var UserConfiguration = require("../persistence/user_configuration.js");
var UserEnteredDollars = require("../values/user_entered_dollars.js");

describe("ConfigurationPanel", function() {

	var $compile;
	var $rootScope;
	var parentScope;
	var panel;
	var fields;
	var config;

	beforeEach(angular.mock.module(configurationPanel.name));

	beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		parentScope = $rootScope.$new();

		config = new UserConfiguration();
		parentScope.configuration = config;
		panel = createPanel();
		fields = panel.find("div");
	}));

	it("contains three fields", function() {
		checkDirective(
			fields[0],
			'<configuration-field value="startingBalance">Starting Balance:</configuration-field>',
			"startingBalance",
			UserConfiguration.DEFAULT_STARTING_BALANCE
		);
		checkDirective(
			fields[1],
			'<configuration-field value="costBasis">Cost Basis:</configuration-field>',
			"costBasis",
			UserConfiguration.DEFAULT_STARTING_COST_BASIS
		);
		checkDirective(
			fields[2],
			'<configuration-field value="spending">Yearly Spending:</configuration-field>',
			"spending",
			UserConfiguration.DEFAULT_YEARLY_SPENDING
		);
	});

	it("initializes fields from user configuration", function() {
		var scope = panel.isolateScope();
		expect(scope.container.startingBalance).to.eql(UserConfiguration.DEFAULT_STARTING_BALANCE);
		expect(scope.container.costBasis).to.eql(UserConfiguration.DEFAULT_STARTING_COST_BASIS);
		expect(scope.container.spending).to.eql(UserConfiguration.DEFAULT_YEARLY_SPENDING);
	});

	it("updates when user configuration is replaced", function() {
		var foo = new UserEnteredDollars("foo");
		var bar = new UserEnteredDollars("bar");
		var baz = new UserEnteredDollars("baz");

		var newConfig = new UserConfiguration();
		newConfig.setStartingBalance(foo);
		newConfig.setStartingCostBasis(bar);
		newConfig.setYearlySpending(baz);

		parentScope.configuration = newConfig;
		$rootScope.$digest();

		var panelScope = panel.isolateScope();
		expect(panelScope.container.startingBalance).to.eql(foo);
	});

	it("updates user configuration when user input changes", function() {
		fields.eq(0).isolateScope().setText("foo");
		fields.eq(1).isolateScope().setText("bar");
		fields.eq(2).isolateScope().setText("baz");
		$rootScope.$digest();

		expect(config.getStartingBalance()).to.eql(new UserEnteredDollars("foo"));
		expect(config.getStartingCostBasis()).to.eql(new UserEnteredDollars("bar"));
		expect(config.getYearlySpending()).to.eql(new UserEnteredDollars("baz"));
	});

	it("update configuration fields when user configuration changes", function() {
		var newValue = new UserEnteredDollars("98765");

		config.setStartingBalance(newValue);
		$rootScope.$digest();

		expect(panel.isolateScope().container.startingBalance).to.eql(newValue);
	});

	function createPanel() {
		var html = "<configuration-panel configuration='configuration'></configuration-panel>";
		var element = $compile(html)(parentScope);
		$rootScope.$digest();
		return element;
	}

	function checkDirective(actualDom, expectedHtml, propertyName, expectedValue) {
		var expectedRendering = renderField(expectedHtml, propertyName, expectedValue);
		var actualRendering = actualDom.innerHTML;
		expect(actualRendering).to.equal(expectedRendering);
	}

	function renderField(html, propertyName, expectedValue) {
		var expectedScope = $rootScope.$new();
		expectedScope[propertyName] = expectedValue;
		var element = $compile(html)(expectedScope);
		expectedScope.$digest();
		return element[0].innerHTML;
	}

});