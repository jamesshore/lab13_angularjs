// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var configurationField = require("./configuration_field.js");
	var UserEnteredDollars = require("../values/user_entered_dollars.js");

	var configurationPanel = module.exports = angular.module("configurationPanel", [ configurationField.name ]);

	configurationPanel.directive("configurationPanel", function() {
		return {
			restrict: "E",
			transclude: false,
			scope: {
				configuration: "=configuration"
			},

			controller: [ "$scope", function($scope) {
				var configuration = $scope.configuration;

				function updateValues() {
					$scope.startingBalance = configuration.getStartingBalance();
					$scope.costBasis = configuration.getStartingCostBasis();
					$scope.spending = configuration.getYearlySpending();
				}

				[
					"setStartingBalance",
					"setStartingCostBasis",
					"setYearlySpending"
				].forEach(function (setter) {
					$scope[setter] = configuration[setter].bind(configuration);
				});

				configuration.onChange(updateValues);
				updateValues();
			} ],

			template:
				'<div class="config">' +
				'  <configuration-field value="startingBalance"' +
				'                       on-change="setStartingBalance">Starting Balance:</configuration-field>' +
				'  <configuration-field value="costBasis"' +
				'                       on-change="setStartingCostBasis">Cost Basis:</configuration-field>' +
				'  <configuration-field value="spending"' +
				'                       on-change="setYearlySpending">Yearly Spending:</configuration-field>' +
			  '</div>',

			replace: true
		};
	});

})();
