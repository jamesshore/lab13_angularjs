// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var configurationField = require("./configuration_field.js");

	var configurationPanel = module.exports = angular.module("configurationPanel", [ configurationField.name ]);

	configurationPanel.directive("configurationPanel", function() {
		return {
			restrict: "E",
			transclude: false,
			scope: {},
			controller: function($scope, $element) {

			},
			template:
				'<div class="config">' +
					'<configuration-field>Starting Balance:</configuration-field>' +
					'<configuration-field>Starting Cost Basis:</configuration-field>' +
					'<configuration-field>Yearly Spending:</configuration-field>' +
			  '</div>',
			replace: true
		};
	});

})();
