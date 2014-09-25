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
		var element = $compile("<table><tr stock-market-row></tr></table>")($rootScope);
		$rootScope.$digest();
		var startingBalanceCell = element.find("td").eq(1);
		expect(startingBalanceCell.html()).to.equal("9876");
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