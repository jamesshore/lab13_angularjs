// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var StockMarketCell = require("./stock_market_cell.js");

	var stockMarketRow = module.exports = angular.module("stockMarketRow", [StockMarketCell.name]);

	stockMarketRow.directive("stockMarketRow", function() {
		return {
			restrict: "A",
			transclude: false,
			scope: {
				value: "=value"
			},
			controller: [ "$scope", function($scope) {
				$scope.$watch("value", function() {
					var value = $scope.value;

					$scope.year = value.year();
					$scope.startingBalance = value.startingBalance();
					$scope.costBasis = value.startingCostBasis();
					$scope.sellOrders = value.totalSellOrders().flipSign();
					$scope.taxes = value.capitalGainsTaxIncurred().flipSign();
					$scope.growth = value.growth();
					$scope.endingBalance = value.endingBalance();
				});
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

})();

