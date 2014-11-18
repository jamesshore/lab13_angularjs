// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var stockMarketRow = require("./stock_market_row.js");

	var stockMarketTable = module.exports = angular.module("stockMarketTable", [ stockMarketRow.name ]);

	stockMarketTable.directive("stockMarketTable", function() {
		return {
			restrict: "E",
			transclude: false,
			scope: {},
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
	          '<tr stock-market-row balance="42"></tr>' +
	          '<tr stock-market-row></tr>' +
	          '<tr stock-market-row></tr>' +
	        '</tbody>' +
	      '</table>',
			replace: true
		};
	});

})();

