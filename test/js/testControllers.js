describe("Test controllers", function() {
	beforeEach(module("main"));
	describe('Test bodyController', function() {
		var scope, keybardMapService;
		beforeEach(module('keyboardInput'));
		beforeEach(function() {
			inject(function(_keyboardMapService_) {
				keybardMapService = _keyboardMapService_;
			});
		});
		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			$controller("bodyController", {
				$scope: scope,
				keybardMapService: keybardMapService
			});
		}));

		describe("Unit: test handleKeyDown", function() {
			var event = {};
			beforeEach(function() {
				event = {
					altKey: false,
					ctrlKey: false,
					metaKey: false,
					shiftKey: false,
					which: 0,
					preventDefault: function() {}
				};
			});
			it("should return 'undefined'", function() {
				event.altKey = true;
				expect(scope.handleKeyDown(event)).not.toBeDefined();
			});
			it("should return 'undefined'", function() {
				event.ctrlKey = true;
				expect(scope.handleKeyDown(event)).not.toBeDefined();
			});
			it("should return 'undefined'", function() {
				event.metaKey = true;
				expect(scope.handleKeyDown(event)).not.toBeDefined();
			});
			it("should return 'undefined'", function() {
				event.shiftKey = true;
				expect(scope.handleKeyDown(event)).not.toBeDefined();
			});
			it("should return 'undefined'", function() {
				event.which = 100;
				expect(scope.handleKeyDown(event)).not.toBeDefined();
			});
			it("should return direction 'up' and duration 75", function() {
				event.which = 38;
				var data = scope.handleKeyDown(event);
				expect(data.direction).toEqual("up");
				expect(data.duration).toEqual(75);
			});
		});
	});
});