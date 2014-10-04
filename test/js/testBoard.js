describe('Unit: Test Board won condition', function() {
	var board;

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

describe("Unit: Test Board sliding functions", function() {
	var board;
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
	});


	it("should move the empty cell to the left", function() {
		board.slideLeft();
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
		board.slideLeft().slideLeft();
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


	it("should move the empty cell one row down", function() {
		board.slideDown();
		expect(board.row).toBe(3);
		expect(board.col).toBe(1);
		expect(board.locked).toBeFalsy();
		// expect.deepEqual(board.cells, [
		// 		[7,1,2,3],
		// 		[4,5,6,9],
		// 		[8,13,10,11],
		// 		[12,0,14,15]
		// ], "The board is changed.");
	});

	it("should change nothing on the board", function() {
		board.slideDown().slideDown();
		expect(board.row).toBe(3);
		expect(board.col).toBe(1);
		expect(board.locked).toBeFalsy();
		// expect.deepEqual(board.cells, [
		// 		[7,1,2,3],
		// 		[4,5,6,9],
		// 		[8,13,10,11],
		// 		[12,0,14,15]
		// ], "The board is changed.");
	});

	it("should move the empty cell one row up", function() {
		board.slideUp();
		expect(board.row).toBe(1);
		expect(board.col).toBe(1);
		expect(board.locked).toBeFalsy();
		// 	expect.deepEqual(board.cells, [
		// 		[7,1,2,3],
		// 		[4,0,6,9],
		// 		[8,5,10,11],
		// 		[12,13,14,15]
		// ], "The board is changed.");
	});

	it("should move the empty cell one row up", function() {
		board.slideUp().slideUp();
		expect(board.row).toBe(0);
		expect(board.col).toBe(1);
		expect(board.locked).toBeFalsy();
		// expect.deepEqual(board.cells, [
		// 		[7,0,2,3],
		// 		[4,1,6,9],
		// 		[8,5,10,11],
		// 		[12,13,14,15]
		// ], "The board is changed.");
	});

	it("should change nothing on the board", function() {
		board.slideUp().slideUp().slideUp();
		expect(board.row).toBe(0);
		expect(board.col).toBe(1);
		expect(board.locked).toBeFalsy();
		// expect.deepEqual(board.cells, [
		// 		[7,0,2,3],
		// 		[4,1,6,9],
		// 		[8,5,10,11],
		// 		[12,13,14,15]
		// ], "The board is changed.");
	});

	it("should move the empty cell to the right", function() {
		board.slideRight();
		expect(board.row).toBe(2);
		expect(board.col).toBe(2);
		expect(board.locked).toBeFalsy();
		// 	expect.deepEqual(board.cells, [
	// 			[7,1,2,3],
	// 			[4,5,6,9],
	// 			[8,10,0,11],
	// 			[12,13,14,15]
	// 	], "The board is changed.");
	});

	it("should move the empty cell one row up", function() {
		board.slideRight().slideRight();
		expect(board.row).toBe(2);
		expect(board.col).toBe(3);
		expect(board.locked).toBeFalsy();
	// 	expect.deepEqual(board.cells, [
	// 			[7,1,2,3],
	// 			[4,5,6,9],
	// 			[8,10,11,0],
	// 			[12,13,14,15]
	// 	], "The board is changed.");
	});

	it("should change nothing on the board", function() {
		board.slideRight().slideRight().slideRight();
		expect(board.row).toBe(2);
		expect(board.col).toBe(3);
		expect(board.locked).toBeFalsy();
		// 	expect.deepEqual(board.cells, [
	// 			[7,1,2,3],
	// 			[4,5,6,9],
	// 			[8,10,11,0],
	// 			[12,13,14,15]
	// 	], "The board is changed.");
	});
});