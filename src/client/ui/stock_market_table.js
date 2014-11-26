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
			scope: {
				projection: "="
			},
			controller: [ "$scope", function($scope) {
				$scope.$watch("projection", function() {
					$scope.years = [];
				  for (var i = 0; i < ($scope.projection.numberOfYears()); i++) {
					  $scope.years.push($scope.projection.getYearOffset(i));
			    }
				});
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
	          '<tr stock-market-row ng-repeat="year in years" value="year"></tr>' +
	        '</tbody>' +
	      '</table>',
			replace: true
		};
	});

})();

