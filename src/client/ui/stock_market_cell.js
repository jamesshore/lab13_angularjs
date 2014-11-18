// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var stockMarketCell = module.exports = angular.module("stockMarketCell", []);

stockMarketCell.directive("stockMarketCell", function() {
	return {
		restrict: "A",
		transclude: false,
		link: function(scope, element, attrs) {
			scope.$watch("value", function() {
				var target = new RenderTarget();

			  scope.value.renderTo(target);
				scope.renderedValue = target.text();
				if (target.isNegative()) element.addClass("negative");

				if (target.isInvalid()) {
					element.html("<img src='/invalid_dollars.png' />");
					element.attr("title", target.tooltip());
				}
				else {
					element.text(target.text());
				}
			});
		},
		scope: {
			value: '=value'
		}
	};
});



function RenderTarget() {}

RenderTarget.prototype.render = function render(values) {
	this._rendering = values;
};

RenderTarget.prototype.text = function text() {
	return this._rendering.text;
};

RenderTarget.prototype.isNegative = function isNegative() {
	return this._rendering.negative;
};

RenderTarget.prototype.isInvalid = function isInvalid() {
	return this._rendering.invalid;
};

RenderTarget.prototype.tooltip = function tooltip() {
	return this._rendering.tooltip;
};

//
//RenderTarget.prototype.createComponent = function createComponent() {
//	if (this._rendering.invalid) {
//		return <td title={this._rendering.tooltip}><img src="/invalid_dollars.png" /></td>;
//	}
//	else {
//		var negativeClass = this._rendering.negative ? "negative" : null;
//		return <td className={negativeClass} >{this._rendering.text}</td>;
//	}
//};
//
