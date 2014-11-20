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
				value: "=value"
			},
			controller: function($scope, $element) {
				$scope._value = {};

				render();
				// $scope.$watch("renderedText", function() {
				// 	$scope.value = new UserEnteredDollars($scope.renderedText);
				// 	render();
				// });

				$scope.$watch("value", function (value) {
					render();
				});

				function render() {
					var target = new RenderTarget($scope, $scope.value.instance);
					$scope.value.instance.renderTo(target);
				}
			},
			template:
				'<div class="config">' +
				' <label ng-transclude></label>' +
				' <input type="text" ng-class="_value.invalidClass" ng-model="_value.renderedText" title="{{_value.title}}">' +
				'</div>',
			replace: true
		};

	});

	function RenderTarget(scope, value) {
		this._scope = scope;
		this._value = value;
	}

	RenderTarget.prototype.render = function render(values) {
		this._scope._value.renderedText = this._value.getUserText();
		this._scope._value.invalidClass = values.invalid ? "invalid" : "";
		this._scope._value.title = values.tooltip;
	};

})();
