// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var stockMarketCell = module.exports = angular.module("stockMarketCell", []);

stockMarketCell.directive("stockMarketCell", function() {
	return {
		restrict: "A",
		transclude: false,
		scope: {
			value: '=value'
		},
		template: '{{value.toString()}}'
	};
});
