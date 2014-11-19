// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var configurationPanel = require("./ui/configuration_panel.js");
	var stockMarketTable = require("./ui/stock_market_table.js");

	var StockMarketProjection = require("./domain/stock_market_projection.js");
	var StockMarketYear = require("./domain/stock_market_year.js");
	var Year = require("./values/year.js");
	var ValidDollars = require("./values/valid_dollars.js");
	var GrowthRate = require("./values/growth_rate.js");
	var TaxRate = require("./values/tax_rate.js");

	var helloWorld = angular.module("helloWorld", [configurationPanel.name, stockMarketTable.name]);
	helloWorld.controller("ExampleController", ["$scope", function ($scope) {
		var firstYear = new StockMarketYear(
			new Year(2010),
			new ValidDollars(10000),
			new ValidDollars(3000),
			new GrowthRate(10),
			new TaxRate(25)
		);
		$scope.projection = new StockMarketProjection(firstYear, new Year(2050), new ValidDollars(36));
	}]);

})();
