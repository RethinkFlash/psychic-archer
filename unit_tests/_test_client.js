(function() {
	"use strict";

	mocha.setup({ignoreLeaks: true});

	describe("Test run", function() {
		it("tests the basket", function() {
			expect(client.mathAdd(5,2)).to.equal(7);
			expect(client.mathAdd(10,20)).to.not.equal(5);
		});
	});

	describe("Testing again",function() {
		it("another test",function() {
			expect("stuff").to.not.equal("stuff!");
		});
	});
})();