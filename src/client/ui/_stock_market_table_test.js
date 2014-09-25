// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

//var stockMarketTable = require("./stock_market_table.js");

describe("StockMarketTable", function() {

	var $compile;
	var $rootScope;

	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;

		angular.module("stockMarketTable");
	}));

	it("does nothing", function() {
		expect($compile).to.be.ok();
		expect($rootScope).to.be.ok();

		var element = $compile("<div><stock-market-row></stock-market-row></div>")($rootScope);
		$rootScope.$digest();
		dump(element, element.html());
	});

});