describe("Test myServices", function() {
	describe('Unit: Test keybardMapService', function() {
		var keybardMapService;
		beforeEach(module('myServices'));
		beforeEach(function() {
			inject(function(_keyboardMapService_) {
				keybardMapService = _keyboardMapService_;
			});
		});

		it("should return 'up'", function() {
			expect(keybardMapService(38)).toEqual("up");
			expect(keybardMapService(83)).toEqual("up");
		});

		it("should return 'down'", function() {
			expect(keybardMapService(40)).toEqual("down");
			expect(keybardMapService(87)).toEqual("down");
		});

		it("should return 'left'", function() {
			expect(keybardMapService(37)).toEqual("left");
			expect(keybardMapService(68)).toEqual("left");
		});

		it("should return 'right'", function() {
			expect(keybardMapService(39)).toEqual("right");
			expect(keybardMapService(65)).toEqual("right");
		});

		it("should be undefined", function() {
			expect(keybardMapService(1)).not.toBeDefined();
			expect(keybardMapService(11)).not.toBeDefined();
		});

	});
});