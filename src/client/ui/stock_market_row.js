// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var StockMarketCell = require("./stock_market_cell.js");
	var Year = require("../values/year.js");
	var ValidDollars = require("../values/valid_dollars.js");
	var InvalidDollars = require("../values/invalid_dollars.js");

	var stockMarketRow = module.exports = angular.module("stockMarketRow", [StockMarketCell.name]);

	stockMarketRow.directive("stockMarketRow", function() {
		return {
			restrict: "A",
			transclude: false,
			scope: {},
			controller: [ "$scope", function($scope) {
				$scope.year = new Year(2010);
				//$scope.startingBalance = new UserEnteredDollars(10000);
				$scope.startingBalance = new EvilValueObject();
				$scope.costBasis = new ValidDollars(7000);
				$scope.sellOrders = new InvalidDollars();
				$scope.taxes = new ValidDollars(-232);
				$scope.growth = new ValidDollars(907);
				$scope.endingBalance = new ValidDollars(9981);
			} ],

			template:
				'<tr>' +
					'<td stock-market-cell value="year"></td>' +
					'<td stock-market-cell value="startingBalance"></td>' +
					'<td stock-market-cell value="costBasis"></td>' +
					'<td stock-market-cell value="sellOrders"></td>' +
					'<td stock-market-cell value="taxes"></td>' +
					'<td stock-market-cell value="growth"></td>' +
					'<td stock-market-cell value="endingBalance"></td>' +
				'</tr>',
			replace: true
		};
	});

	function EvilValueObject() {}

	EvilValueObject.prototype.renderTo = function renderTo(target) {
		target.render({
			text: "<a href='javascript:alert(\"Gotcha!\")'>Click me</a>",
			negative: false,
			invalid: false
		});
	};

})();

