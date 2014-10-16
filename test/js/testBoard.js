describe("Test Board class", function() {
	var board;
	describe('Unit: Test Board won condition', function() {
		beforeEach(function() {
			board = new Board();
			board.cells = [
				[1,2,3,4],
				[5,6,7,8],
				[9,10,11,12],
				[13,14,15,0]
			];
		});

		it("should be a won game", function() {
			expect(board.won()).toBeTruthy();
		});

		it("should be an on-going game", function() {
			board.cells[0] = [3,1,2,4];
			expect(board.won()).toBeFalsy();
		});

		it("should be an on-going game", function() {
			board.cells[1] = [7,6,8,5];
			expect(board.won()).toBeFalsy();
		});
	});

	describe("Unit: test slide function", function() {
		var directionService, up, down, left, right;
		beforeEach(module('services'));
		beforeEach(function() {
			inject(function(_directionService_) {
				directionService = _directionService_;
			});
		});
		beforeEach(function() {
			board = new Board();
			board.cells = [
				[7,1,2,3],
				[4,5,6,9],
				[8,0,10,11],
				[12,13,14,15]
			];
			board.row = 2;
			board.col = 1;
			board.locked = false;
			up = directionService.getDelta("up");
			down = directionService.getDelta("down");
			left = directionService.getDelta("left");
			right = directionService.getDelta("right");
		});

		it("should move the empty cell to the left", function() {
			board.slide(left);
			expect(board.row).toBe(2);
			expect(board.col).toBe(0);
			expect(board.locked).toBeFalsy();
			// expect(board.cells).toBe([
			// 		[7,1,2,3],
			// 		[4,5,6,9],
			// 		[0,8,10,11],
			// 		[12,13,14,15]
			// ]);
		});

		it("should change nothing on the board", function() {
			board.slide(left).slide(left);
			expect(board.row).toBe(2);
			expect(board.col).toBe(0);
			expect(board.locked).toBeFalsy();
		});

		it("should move the empty cell one row down", function() {
			board.slide(down);
			expect(board.row).toBe(3);
			expect(board.col).toBe(1);
			expect(board.locked).toBeFalsy();
		});

		it("should change nothing on the board", function() {
			board.slide(down).slide(down);
			expect(board.row).toBe(3);
			expect(board.col).toBe(1);
			expect(board.locked).toBeFalsy();
		});

		it("should move the empty cell one row up", function() {
			board.slide(up);
			expect(board.row).toBe(1);
			expect(board.col).toBe(1);
			expect(board.locked).toBeFalsy();
		});

		it("should move the empty cell one row up", function() {
			board.slide(up).slide(up);
			expect(board.row).toBe(0);
			expect(board.col).toBe(1);
			expect(board.locked).toBeFalsy();
		});

		it("should change nothing on the board", function() {
			board.slide(up).slide(up).slide(up);
			expect(board.row).toBe(0);
			expect(board.col).toBe(1);
			expect(board.locked).toBeFalsy();
		});

		it("should move the empty cell to the right", function() {
			board.slide(right);
			expect(board.row).toBe(2);
			expect(board.col).toBe(2);
			expect(board.locked).toBeFalsy();
		});

		it("should move the empty cell one row up", function() {
			board.slide(right).slide(right);
			expect(board.row).toBe(2);
			expect(board.col).toBe(3);
			expect(board.locked).toBeFalsy();
		});

		it("should change nothing on the board", function() {
			board.slide(right).slide(right).slide(right);
			expect(board.row).toBe(2);
			expect(board.col).toBe(3);
			expect(board.locked).toBeFalsy();
		});

	});
});