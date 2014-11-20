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
			scope: {},
			controller: function($scope, $element) {
				$scope.startingBalance = new UserEnteredDollars("123");
				$scope.costBasis = new UserEnteredDollars("456");
				$scope.spending = new UserEnteredDollars("789x");
			},
			template:
				'<div class="config">' +
					'<configuration-field value="startingBalance">Starting Balance:</configuration-field>' +
					'<configuration-field value="costBasis">Starting Cost Basis:</configuration-field>' +
					'<configuration-field value="spending">Yearly Spending:</configuration-field>' +
			  '</div>',
			replace: true
		};
	});

})();
