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
				$scope.container = {};

				$scope.$watchCollection("configuration", function() {
					$scope.container.startingBalance = $scope.configuration.getStartingBalance();
					$scope.container.costBasis = $scope.configuration.getStartingCostBasis();
					$scope.container.spending = $scope.configuration.getYearlySpending();
				});

				$scope.$watchCollection("container", function() {
					$scope.configuration.setStartingBalance($scope.container.startingBalance);
					$scope.configuration.setStartingCostBasis($scope.container.costBasis);
					$scope.configuration.setYearlySpending($scope.container.spending);
				});
			} ],
			template:
				'<div class="config">' +
					'<configuration-field value="container.startingBalance">Starting Balance:</configuration-field>' +
					'<configuration-field value="container.costBasis">Cost Basis:</configuration-field>' +
					'<configuration-field value="container.spending">Yearly Spending:</configuration-field>' +
			  '</div>',
			replace: true
		};
	});

})();
