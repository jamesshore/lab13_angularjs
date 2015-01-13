// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var stockMarketRow = require("./stock_market_row.js");

var StockMarketYear = require("../domain/stock_market_year.js");
var Year = require("../values/year.js");
var ValidDollars = require("../values/valid_dollars.js");
var GrowthRate = require("../values/growth_rate.js");
var TaxRate = require("../values/tax_rate.js");

describe("StockMarketRow", function() {

	var $compile;
	var $rootScope;
	var parentScope;
	var cells;

	beforeEach(angular.mock.module(stockMarketRow.name));

	beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		parentScope = $rootScope.$new();

		parentScope.year = new StockMarketYear(
			new Year(1984),
			new ValidDollars(986),
			new ValidDollars(20),
			new GrowthRate(10),
			new TaxRate(30)
		);
		parentScope.year.sell(new ValidDollars(100));

		var row = createRow("year");
		cells = row.find("td");
	}));

	it("renders a stock market year", function() {
		// This is a very poor test; ideally, it would describe the exact values we expect to see from each cell,
		// but I couldn't figure out how to do that without relying on cell implementation details. So this is just
		// a duplication of the production code, which is pretty nasty.
		checkDirective(cells[0], '<td stock-market-cell value="value.year()"></td>');
		checkDirective(cells[1], '<td stock-market-cell value="value.startingBalance()"></td>');
		checkDirective(cells[2], '<td stock-market-cell value="value.startingCostBasis()"></td>');
		checkDirective(cells[3], '<td stock-market-cell value="value.totalSellOrders().flipSign()"></td>');
		checkDirective(cells[4], '<td stock-market-cell value="value.capitalGainsTaxIncurred().flipSign()"></td>');
		checkDirective(cells[5], '<td stock-market-cell value="value.growth()"></td>');
		checkDirective(cells[6], '<td stock-market-cell value="value.endingBalance()"></td>');
	});

	it("updates when year changes", function() {
		parentScope.year = new StockMarketYear(
			new Year(2948),
			new ValidDollars(1),
			new ValidDollars(2),
			new GrowthRate(3),
			new TaxRate(4)
		);
		$rootScope.$digest();

		checkDirective(cells[0], '<td stock-market-cell value="value.year()"></td>');
	});

	function createRow(valueProperty) {
		var html = "<table><tbody><tr stock-market-row value='" + valueProperty + "'></tr></tbody></table>";
		var element = $compile(html)(parentScope);
		$rootScope.$digest();
		return element.find("tr").eq(0);
	}

	function checkDirective(actualRow, expectedHtml) {
		var expectedRendering = renderCell(expectedHtml, "value", parentScope.year);
		var actualRendering = actualRow.outerHTML;
		expect(actualRendering).to.equal(expectedRendering);
	}

	function renderCell(cellHtml, propertyName, expectedValue) {
		var expectedScope = $rootScope.$new();
		expectedScope[propertyName] = expectedValue;
		var element = $compile("<table><tbody><tr>" + cellHtml + "</tr></tbody></table>")(expectedScope);
		expectedScope.$digest();
		return element.find("td")[0].outerHTML;
	}

});