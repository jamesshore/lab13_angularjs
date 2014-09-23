// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var configurationPanel = require("./ui/configuration_panel.js");
	var stockMarketTable = require("./ui/stock_market_table.js");

	var helloWorld = angular.module("helloWorld", [configurationPanel.name, stockMarketTable.name]);
	helloWorld.controller("ExampleController", ["$scope", function ($scope) {
		$scope.startingBalance="start";
	}]);

})();
