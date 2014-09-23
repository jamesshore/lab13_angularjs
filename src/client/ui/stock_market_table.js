// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	helloWorld.directive("stockMarketTable", function() {
		return {
			restrict: "E",
			transclude: false,
			scope: {},
			controller: function($scope, $element) {

			},
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
	          '<tr stock-market-row></tr>' +
	          '<tr stock-market-row></tr>' +
	          '<tr stock-market-row></tr>' +
	        '</tbody>' +
	      '</table>',
			replace: true
		};
	});

	helloWorld.directive("stockMarketRow", function() {
		return {
			restrict: "A",
			transclude: false,
			scope: {},
			controller: function($scope, $element) {

			},
			template:
				'<td>2010</td>' +
	      '<td>{{startingBalance}}</td>' +
	      '<td>$7,000</td>' +
				'<td class="negative">($695)</td>' +
				'<td class="negative">($232)</td>' +
				'<td>$907</td>' +
	      '<td>$9,981</td>'
		};
	});

})();

