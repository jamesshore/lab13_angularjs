// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

//var stockMarketTable = require("./stock_market_table.js");

describe("StockMarketTableRow", function() {

	var $compile;
	var $rootScope;

	beforeEach(angular.mock.module("stockMarketTable"));

	beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it("it hard-codes starting balance", function() {
		var element = $compile("<table><tbody><tr stock-market-row></tr></tbody></table>")($rootScope);
		$rootScope.$digest();

		var row = element.find("tr").eq(0);
		var startingBalanceCell = element.find("td").eq(1);

		// we can get starting balance from HTML
		expect(startingBalanceCell.html()).to.equal("9876");

		// or from scope
		expect(row.isolateScope().startingBalance).to.equal("9876");
	});

	it("allows starting balance to be changed", function() {
		var element = $compile("<table><tbody><tr stock-market-row></tr></tbody></table>")($rootScope);

		var rowScope = element.find("tr").eq(0).isolateScope();

		rowScope.setStartingBalance("foo");
		expect(rowScope.startingBalance).to.equal("foo");
	});

//	it("renders as HTML", function() {
//		var element = $compile("<table><tr stock-market-row></tr></table>")($rootScope);
//		$rootScope.$digest();
//		expect(element.html()).to.equal(
//			'<tbody>' +
//				'<tr stock-market-row="" class="ng-isolate-scope">' +
//					'<td>2010</td>' +
//					'<td class="ng-binding"></td>' +
//					'<td>$7,000</td>' +
//					'<td class="negative">($695)</td>' +
//					'<td class="negative">($232)</td>' +
//					'<td>$907</td>' +
//					'<td>$9,981</td>' +
//				'</tr>' +
//			'</tbody>');
//	});

});