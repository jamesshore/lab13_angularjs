// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var stockMarketCell = require("./stock_market_cell.js");
var Year = require("../values/year.js");
var ValidDollars = require("../values/valid_dollars.js");

describe("StockMarketCell", function() {

	var $compile;
	var $rootScope;

	beforeEach(angular.mock.module(stockMarketCell.name));

	beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it("render a value that's in the parent scope", function() {
		var parentScope = $rootScope.$new();

		parentScope.year = new Year(1984);

		var html = "<table><tbody><tr><td stock-market-cell value='year'></td></tr></tbody></table>";
		var element = $compile(html)(parentScope);
		$rootScope.$digest();

		var cell = element.find("td").eq(0);
		expect(cell.html()).to.equal("1984");
		expect(cell.hasClass("negative")).to.be(false);
	});

	it("renders negative values", function() {
		var parentScope = $rootScope.$new();

		parentScope.dollars = new ValidDollars(-30);

		var html = "<table><tbody><tr><td stock-market-cell value='dollars'></td></tr></tbody></table>";
		var element = $compile(html)(parentScope);
		$rootScope.$digest();

		var cell = element.find("td").eq(0);
		expect(cell.html()).to.equal(parentScope.dollars.toString());
		expect(cell.hasClass("negative")).to.be(true);
	});

	

});