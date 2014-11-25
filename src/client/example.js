// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var configurationPanel = require("./ui/configuration_panel.js");
	var stockMarketTable = require("./ui/stock_market_table.js");

	var UserConfiguration = require("./persistence/user_configuration.js");
	var StockMarketProjection = require("./domain/stock_market_projection.js");
	var StockMarketYear = require("./domain/stock_market_year.js");
	var Year = require("./values/year.js");
	var ValidDollars = require("./values/valid_dollars.js");
	var GrowthRate = require("./values/growth_rate.js");
	var TaxRate = require("./values/tax_rate.js");

	var example = module.exports = angular.module("example", [configurationPanel.name, stockMarketTable.name]);

	example.controller("ExampleController", ["$scope", function ($scope) {
		$scope.configuration = new UserConfiguration();
		$scope.projection = projectionFor($scope.configuration);

		$scope.configuration.onChange(function() {
			$scope.$applyAsync(function() {
				$scope.projection = projectionFor($scope.configuration);
			});
		});
	}]);

	function projectionFor(config) {
		var firstYear = new StockMarketYear(
			new Year(2010),
			config.getStartingBalance(),
			config.getStartingCostBasis(),
			new GrowthRate(10),
			new TaxRate(25)
		);
		return new StockMarketProjection(firstYear, new Year(2050), config.getYearlySpending());
	}

})();
