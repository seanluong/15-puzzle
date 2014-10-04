describe("Test myFilters", function() {
	describe('Unit: Test durationFilter', function() {
		beforeEach(module('myFilters'));

		it("should return 00:00:00", inject(function($filter) {
			expect($filter("duration")("0")).toEqual("00:00:00");
		}));

		it("should return 00:01:00", inject(function($filter) {
			expect($filter("duration")("60")).toEqual("00:01:00");
		}));

		it("should return 01:00:00", inject(function($filter) {
			expect($filter("duration")("3600")).toEqual("01:00:00");
		}));

		it("should return 00:02:30", inject(function($filter) {
			expect($filter("duration")("150")).toEqual("00:02:30");
		}));

		it("should return --:--:--", inject(function($filter) {
			expect($filter("duration")(null)).toEqual("--:--:--");
		}));
	});
});