// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var configurationField = module.exports = angular.module("configurationField", []);
	var UserEnteredDollars = require("../values/user_entered_dollars.js");

	configurationField.directive("configurationField", function() {

		return {
			restrict: "E",
			transclude: true,
			scope: {
				value: "=value",
				onChange: "=onChange"
			},

			controller: [ "$scope", function($scope) {
				$scope.$watch("value", updateValue);
				$scope.$watch("text", triggerChange);

				function updateValue(value) {
					function render(values) {
						$scope.text = value.getUserText();
						$scope.inputClass = values.invalid ? "invalid" : "";
						$scope.tooltip = values.tooltip;
					}

					value.renderTo({render: render});
				}

				function triggerChange(text) {
					$scope.onChange(new UserEnteredDollars(text));
				}
			} ],

			template:
				'<div class="config">' +
				' <label ng-transclude></label>' +
				' <input type="text" ng-model="text" ng-class="inputClass" title="{{tooltip}}">' +
				'</div>',

			replace: true
		};

	});

})();
