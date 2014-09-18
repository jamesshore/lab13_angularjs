// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var module = angular.module("helloWorld", []);
module.controller("ExampleController", ["$scope", function ($scope) {

	$scope.startingBalance="start";

}]);

module.directive("stockMarketRow", function() {
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
	}
});

module.directive("configurationField", function() {

	return {
		restrict: "E",
		transclude: true,
		scope: {},
		controller: function($scope, $element) {

		},
		template:
			'<div class="config">' +
			' <label ng-transclude></label>' +
			' <input type="text" class="invalid" title="Tooltip">' +
			'</div>',
		replace: true
	};

});