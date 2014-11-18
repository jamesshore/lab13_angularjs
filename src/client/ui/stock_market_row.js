// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var stockMarketRow = module.exports = angular.module("stockMarketRow", []);

	stockMarketRow.directive("stockMarketRow", function() {
		return {
			restrict: "A",
			transclude: false,
			scope: {},
			link: function(scope, element, attrs) {
				var i = 0;

				scope.startingBalance = attrs.balance;
				if (scope.startingBalance === undefined) scope.startingBalance = "9876";

				scope.setStartingBalance = function setStartingBalance(balance) {
					scope.startingBalance = balance;
				};

				scope.handleClick = function handleClick() {
					scope.startingBalance = "click" + (++i);
				};
			},

			//link: function($scope, $element) {
			//	$element.on("click", function(event) {
			//		$scope.startingBalance = "(" + event.pageX + ", " + event.pageY + ")";
			//		$scope.$apply();
			//	});
			//},

			template:
				'<tr ng-click="handleClick()">' +
				//'<tr>' +
					'<td>2010</td>' +
		      '<td>{{startingBalance}}</td>' +
		      '<td>$7,000</td>' +
					'<td class="negative">($695)</td>' +
					'<td class="negative">($232)</td>' +
					'<td>$907</td>' +
		      '<td>$9,981</td>' +
				'</tr>',
			replace: true
		};
	});

})();

