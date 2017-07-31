"use strict";

require("jasmine-should-fail");
require("../src/jasmine-expect-count");

describe("jasmine-expect-count", function () {
	it("should define jasmine.expectCount", function () {
		expect(jasmine.expectCount).toEqual(jasmine.any(Function));
	});

	it("should not check count when expectCount is not specified", function () {
		expect(true).toBe(true);
	});

	it("should not check count with 0 expects when expectCount is not specified", function () {});

	it("should not throw error when expectCount is 0", function () {
		jasmine.expectCount(0);
	});

	it("should not throw error when expectCount is > 0", function () {
		jasmine.expectCount(1);
		expect(true).toBe(true);
	});

	it("should throw error when expectCount is < 0", function () {
		expect(function () {
			jasmine.expectCount(-1);
		}).toThrow();
	});

	it("should throw error when expectCount is NaN", function () {
		expect(function () {
			jasmine.expectCount(false);
		}).toThrow();
	});

	it("should count expects in async calls", function () {
		jasmine.expectCount(3);

		expect(1).toBe(1);

		var p = new Promise(function (resolve) {
			setTimeout(function () {
				expect(2).toBe(2);
				resolve();
			}, 1);
		});

		expect(3).toBe(3);

		// if returning p is forgotten only 2 expects will be called.
		return p;
	});

	zdescribe("failing tests", function () {

		it("should throw error when expectCount is > the number of expects", function () {
			jasmine.expectCount(2);
			expect(true);
		});

		it("should throw error when expectCount is > 0 and there are no expects", function () {
			jasmine.expectCount(1);
		});

		it("should throw error when expectCount is < the number of expects", function () {
			jasmine.expectCount(1);
			expect(true);
			expect(true);
		});

		it("should fail when forgetting to return the promise", function () {
			jasmine.expectCount(3);

			expect(1);

			var p = new Promise(function (resolve) {
				setTimeout(function () {
					expect(2);
					resolve();
				}, 1);
			});

			expect(3);

			// if returning p is forgotten only 2 expects will be called.
			// return p;
		});

		it("should fail when expects called in promise", function () {
			jasmine.expectCount(2);

			expect(1);

			var p = new Promise(function (resolve) {
				setTimeout(function () {
					expect(2);
					resolve();
				}, 1);
			});

			expect(3);

			// if returning p is forgotten only 2 expects will be called.
			return p;
		});

	});

});
