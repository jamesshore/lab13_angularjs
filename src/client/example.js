// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var helloWorld = angular.module("helloWorld", ["configurationPanel", "stockMarketTable"]);
	helloWorld.controller("ExampleController", ["$scope", function ($scope) {
		$scope.startingBalance="start";
	}]);

})();
