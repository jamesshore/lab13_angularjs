// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var stockMarketTable = require("./stock_market_table.js");
var StockMarketProjection = require("../domain/stock_market_projection.js");
var StockMarketYear = require("../domain/stock_market_year.js");
var Year = require("../values/year.js");
var ValidDollars = require("../values/valid_dollars.js");
var GrowthRate = require("../values/growth_rate.js");
var TaxRate = require("../values/tax_rate.js");

describe("StockMarketTable", function() {

	var $compile;
	var $rootScope;
	var firstYear;
	var parentScope;
	var table;

	beforeEach(angular.mock.module(stockMarketTable.name));

	beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;

		firstYear = new StockMarketYear(
			new Year(2010),
			new ValidDollars(10000),
			new ValidDollars(3000),
			new GrowthRate(10),
			new TaxRate(25)
		);
		var projection = new StockMarketProjection(firstYear, new Year(2050), new ValidDollars(36));

		parentScope = $rootScope.$new();
		parentScope.projection = projection;
		table = createTable("projection");
	}));

	it("renders first year", function() {
		checkDirective(
			rows()[0],
			'<tr stock-market-row value="year"></tr>',
			"year",
			firstYear
		);
	});

	it("renders multiple years", function() {
		expect(rows().length).to.equal(41);
	});

	it("renders each year differently", function() {
		var lastYearCell = rows().eq(40).find("td");
		expect(lastYearCell.html()).to.equal("2050");
	});

	it("updates table when projection changes", function() {
		parentScope.projection = new StockMarketProjection(firstYear, new Year(2020), new ValidDollars(999));
		$rootScope.$digest();

		expect(rows().length).to.equal(11);
	});

	function rows() {
		return table.find("tbody").find("tr");
	}

	function createTable(property) {
		var html = "<stock-market-table projection='" + property + "'></stock-market-table>";
		var element = $compile(html)(parentScope);
		$rootScope.$digest();
		return element;
	}

	function checkDirective(actual, expectedHtml, propertyName, expectedValue) {
		var expectedRendering = renderRow(expectedHtml, propertyName, expectedValue);
		var actualRendering = actual.innerHTML;
		expect(actualRendering).to.equal(expectedRendering);
	}

	function renderRow(html, propertyName, expectedValue) {
		var expectedScope = $rootScope.$new();
		expectedScope[propertyName] = expectedValue;
		var element = $compile("<table><tbody>" + html + "</tbody></table>")(expectedScope);
		expectedScope.$digest();
		return element.find("tr")[0].innerHTML;
	}
});