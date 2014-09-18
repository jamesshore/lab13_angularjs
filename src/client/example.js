// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var module = angular.module("helloWorld", []);
module.controller("ExampleController", ["$scope", function ($scope) {

	$scope.constructed = function() {
		return $scope.first + ": " + $scope.second
	}

}]);