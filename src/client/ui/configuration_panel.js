// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var configurationField = require("./configuration_field.js");

	var configurationPanel = module.exports = angular.module("configurationPanel", [ configurationField.name ]);

	configurationPanel.directive("configurationPanel", function() {
		return {
			restrict: "E",
			transclude: false,
			scope: {
				configuration: "=configuration"
			},
			controller: [ "$scope", function($scope) {
				$scope.$watch("configuration", function() {
					$scope.startingBalance = $scope.configuration.getStartingBalance();
					$scope.costBasis = $scope.configuration.getStartingCostBasis();
					$scope.spending = $scope.configuration.getYearlySpending();
				});
			} ],
			template:
				'<div class="config">' +
					'<configuration-field value="startingBalance">Starting Balance:</configuration-field>' +
					'<configuration-field value="costBasis">Cost Basis:</configuration-field>' +
					'<configuration-field value="spending">Yearly Spending:</configuration-field>' +
			  '</div>',
			replace: true
		};
	});

})();
