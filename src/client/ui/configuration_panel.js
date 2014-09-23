// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var configurationPanel = angular.module("configurationPanel", []);

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


	configurationPanel.directive("configurationField", function() {

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

})();
