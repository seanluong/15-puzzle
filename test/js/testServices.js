describe("Test services", function() {
	describe('Unit: Test keybardMapService', function() {
		var keybardMapService;
		beforeEach(module('keyboardInput'));
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

	describe('Unit: Test localStorageService', function() {
		var localStorageService,
			timePassed, bestTime, boardStr;
		beforeEach(module('services'));
		beforeEach(function() {
			inject(function(_localStorageService_) {
				localStorageService = _localStorageService_;
			});
		});
		beforeEach(function() { // store current data in localStorage
			timePassed = localStorage.getItem("timePassed");
			bestTime = localStorage.getItem("bestTime");
			boardStr = localStorage.getItem("board");
		});
		afterEach(function() {
			localStorage.setItem("timePassed", timePassed);
			localStorage.setItem("bestTime", bestTime);
			localStorage.setItem("board", boardStr);
		});

		it("should return true", function() {
			// TODO:
			expect(true).toBeTruthy();
		});


	});
});