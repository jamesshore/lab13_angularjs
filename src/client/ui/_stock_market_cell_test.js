// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var stockMarketCell = require("./stock_market_cell.js");
var Year = require("../values/year.js");
var ValidDollars = require("../values/valid_dollars.js");
var InvalidDollars = require("../values/invalid_dollars.js");

describe("StockMarketCell", function() {

	var $compile;
	var $rootScope;
	var parentScope;

	beforeEach(angular.mock.module(stockMarketCell.name));

	beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		parentScope = $rootScope.$new();
	}));

	it("render a value that's in the parent scope", function() {
		parentScope.year = new Year(1984);
		var cell = createCell("year");

		expect(cell.html()).to.equal("1984");
		expect(cell.hasClass("negative")).to.be(false);
	});

	it("renders negative values", function() {
		parentScope.dollars = new ValidDollars(-30);
		var cell = createCell("dollars");

		expect(cell.html()).to.equal(parentScope.dollars.toString());
		expect(cell.hasClass("negative")).to.be(true);
	});

	it("renders invalid values", function() {
		parentScope.dollars = new InvalidDollars();
		var cell = createCell("dollars");
		var img = cell.find("img");

		expect(img.attr("src")).to.equal("/invalid_dollars.png");
		expect(cell.hasClass("negative")).to.be(false);
		expect(cell.attr("title")).to.be("Invalid dollar amount");
	});

	it("updates cell when underlying value changes", function() {
		parentScope.year = new Year(1984);
		var cell = createCell("year");

		parentScope.year = new Year(2001);
		$rootScope.$digest();

		expect(cell.html()).to.equal("2001");
	});

	it("sanitizes text", function() {
		parentScope.evil = new EvilValueObject();
		var cell = createCell("evil");

		expect(cell.html()).to.equal(EvilValueObject.sanitizedText);
	});

	function createCell(valueProperty) {
		var html = "<table><tbody><tr><td stock-market-cell value='" + valueProperty + "'></td></tr></tbody></table>";
		var element = $compile(html)(parentScope);
		$rootScope.$digest();
		return element.find("td").eq(0);
	}

	function EvilValueObject() {}

	EvilValueObject.sanitizedText = "&lt;a&gt;&lt;/a&gt;";

	EvilValueObject.prototype.renderTo = function renderTo(target) {
		target.render({
			text: "<a></a>",
			negative: false,
			invalid: false
		});
	};

});