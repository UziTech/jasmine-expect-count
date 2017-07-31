"use strict";

(function (global) {

	if (!global.jasmine) {
		throw new Error("jasmine must be loaded before jasmine2-focused");
	}

	var numExpects = 0;
	var expectedExpects = null;
	global.jasmine.expectCount = function (num) {
		if ((typeof num !== "number" && !isNaN(num)) || num < 0) {
			throw new Error("jasmine.expectCount expects a number >= 0 as the first argument.");
		}

		expectedExpects = num;
	};

	global.beforeEach(function () {
		numExpects = 0;
		expectedExpects = null;
	});

	var origExpect = global.expect;
	global.expect = function () {
		numExpects++;
		return origExpect.apply(this, arguments);
	};

	var origIt = global.it;
	global.it = function () {
		var args = [].slice.call(arguments);
		var origFunc = args[1];

		if (typeof origFunc === "function") {
			args[1] = function () {
				var origReturn = origFunc.call(this);
				if (origReturn && origReturn.then) {
					origReturn = origReturn.then(function () {
						if (expectedExpects !== null && numExpects !== expectedExpects) {
							throw "Expected " + expectedExpects + " expect" + (expectedExpects !== 1 ? "s" : "") + " to be called, " + numExpects + " expect" + (numExpects !== 1 ? "s were" : " was") + " actually called.";
						}
					});
				} else {
					if (expectedExpects !== null && numExpects !== expectedExpects) {
						throw "Expected " + expectedExpects + " expect" + (expectedExpects !== 1 ? "s" : "") + " to be called, " + numExpects + " expect" + (numExpects !== 1 ? "s were" : " was") + " actually called.";
					}
				}
				return origReturn;
			};
		}

		return origIt.apply(this, args);
	};

	// global.afterEach(function () {
	// 	if (expectedExpects !== null && numExpects !== expectedExpects) {
	// 		throw "Expected " + expectedExpects + " expect" + (expectedExpects !== 1 ? "s" : "") + " to be called, " + numExpects + " expect" + (numExpects !== 1 ? "s were" : " was") + " actually called.";
	// 	}
	// });

})(typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
