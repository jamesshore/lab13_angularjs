// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var example = require("./example.js");
var UserConfiguration = require("./persistence/user_configuration.js");
var StockMarketProjection = require("./domain/stock_market_projection.js");
var StockMarketYear = require("./domain/stock_market_year.js");
var Year = require("./values/year.js");
var UserEnteredDollars = require("./values/user_entered_dollars.js");
var ValidDollars = require("./values/valid_dollars.js");
var GrowthRate = require("./values/growth_rate.js");
var TaxRate = require("./values/tax_rate.js");

describe("ExampleController", function() {

	var controller;
	var scope;

	beforeEach(angular.mock.module(example.name));

	beforeEach(angular.mock.inject(function(_$controller_) {
		var $controller = _$controller_;
		scope = { $applyAsync: function(callback) { callback(); } };
		controller = $controller("ExampleController", { $scope: scope });
	}));

	it("initializes configuration with default values", function() {
		expect(scope.configuration.getStartingBalance()).to.eql(UserConfiguration.DEFAULT_STARTING_BALANCE);
		expect(scope.configuration.getStartingCostBasis()).to.eql(UserConfiguration.DEFAULT_STARTING_COST_BASIS);
		expect(scope.configuration.getYearlySpending()).to.eql(UserConfiguration.DEFAULT_YEARLY_SPENDING);
	});

	it("initialize projection based on configuration", function() {
		expect(scope.projection).to.eql(projectionFor(scope.configuration));
	});

	it("updates projection when configuration changes", function() {
		scope.configuration.setStartingBalance(new UserEnteredDollars("123987"));
		expect(scope.projection).to.eql(projectionFor(scope.configuration));
	});

	function projectionFor(config) {
		var firstYear = new StockMarketYear(
			UserConfiguration.STARTING_YEAR,
			config.getStartingBalance(),
			config.getStartingCostBasis(),
			UserConfiguration.INTEREST_RATE,
			UserConfiguration.CAPITAL_GAINS_TAX_RATE
		);
		return new StockMarketProjection(firstYear, UserConfiguration.ENDING_YEAR, config.getYearlySpending());
	}

});