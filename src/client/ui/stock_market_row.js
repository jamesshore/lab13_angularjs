// Copyright (c) 2014-2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var StockMarketCell = require("./stock_market_cell.js");

	var stockMarketRow = module.exports = angular.module("stockMarketRow", [StockMarketCell.name]);

	stockMarketRow.directive("stockMarketRow", function() {
		return {
			restrict: "A",
			transclude: false,
			scope: {
				value: "="
			},
			template:
				'<tr>' +
					'<td stock-market-cell value="value.year()"></td>' +
					'<td stock-market-cell value="value.startingBalance()"></td>' +
					'<td stock-market-cell value="value.startingCostBasis()"></td>' +
					'<td stock-market-cell value="value.totalSellOrders().flipSign()"></td>' +
					'<td stock-market-cell value="value.capitalGainsTaxIncurred().flipSign()"></td>' +
					'<td stock-market-cell value="value.growth()"></td>' +
					'<td stock-market-cell value="value.endingBalance()"></td>' +
				'</tr>',
			replace: true
		};
	});
})();

