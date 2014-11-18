// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var stockMarketRow = require("./stock_market_row.js");
	var StockMarketYear = require("../domain/stock_market_year.js");
	var Year = require("../values/year.js");
	var ValidDollars = require("../values/valid_dollars.js");
	var GrowthRate = require("../values/growth_rate.js");
	var TaxRate = require("../values/tax_rate.js");

	var stockMarketTable = module.exports = angular.module("stockMarketTable", [ stockMarketRow.name ]);

	stockMarketTable.directive("stockMarketTable", function() {
		return {
			restrict: "E",
			transclude: false,
			scope: {},
			controller: [ "$scope", function($scope) {
				$scope.year = new StockMarketYear(
					new Year(1984),
					new ValidDollars(986),
					new ValidDollars(20),
					new GrowthRate(10),
					new TaxRate(30)
				);
			} ],
			template:
				'<table class="stockmarket">' +
	        '<thead>' +
	          '<tr>' +
	            '<th>Year</th>' +
	            '<th>Starting Balance</th>' +
	            '<th>Cost Basis</th>' +
	            '<th>Sell Orders</th>' +
	            '<th>Taxes</th>' +
	            '<th>Growth</th>' +
	            '<th>Ending Balance</th>' +
	          '</tr>' +
	        '</thead>' +
	        '<tbody>' +
	          '<tr stock-market-row value="year"></tr>' +
	          '<tr stock-market-row value="year"></tr>' +
	          '<tr stock-market-row value="year"></tr>' +
	        '</tbody>' +
	      '</table>',
			replace: true
		};
	});

})();

