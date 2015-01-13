// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var stockMarketCell = module.exports = angular.module("stockMarketCell", []);

stockMarketCell.directive("stockMarketCell", function() {
	return {
		restrict: "A",
		transclude: false,
		scope: {
			value: '=*'
		},
		link: function(scope, element) {
			scope.$watch("value", function() {
				var target = new RenderTarget(element);
				scope.value.renderTo(target);
			});
		}
	};
});

function RenderTarget(element) {
	this._element = element;
}

RenderTarget.prototype.render = function render(values) {
	if (values.negative) this._element.addClass("negative");
	if (values.invalid) {
		this._element.html("<img src='/invalid_dollars.png' />");
		this._element.attr("title", values.tooltip);
	}
	else {
		this._element.text(values.text);
	}
};
