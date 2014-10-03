module("Test Board won condition", {
	board: new Board(),
	setup: function() {},
	teardown: function() {}
});

test("Test Board.prototype.won", function (assert) {
	this.board.cells = [
		[1,2,3,4],
		[5,6,7,8],
		[9,10,11,12],
		[13,14,15,0]
	];
	assert.equal(this.board.won(), true, "This game is won");
	this.board.cells[0] = [3,1,2,4];
	assert.equal(this.board.won(), false, "This game is still on-going");
	this.board.cells[1] = [7,6,8,5];
	assert.equal(this.board.won(), false, "This game is still on-going");
});

module("Test Board sliding functions", {
	board: new Board(),
	setup: function() {
		this.board.cells = [
			[7,1,2,3],
			[4,5,6,9],
			[8,0,10,11],
			[12,13,14,15]
		];
		this.board.row = 2;
		this.board.col = 1;
		this.board.locked = false;
	},
	teardown: function() { }
});

test("Test Board.prototype.slideLeft", function( assert ) {
	this.board.slideLeft();
	assert.equal(this.board.row, 2, "The empty cell should be on the same row.");
	assert.equal(this.board.col, 0, "The empty cell should be one column to the left.");
	assert.equal(this.board.locked, false, "The board should still be not locked.");
	assert.deepEqual(this.board.cells, [
			[7,1,2,3],
			[4,5,6,9],
			[0,8,10,11],
			[12,13,14,15]
	], "The board is changed.");

	this.board.slideLeft();
	assert.equal(this.board.row, 2, "The empty cell should be on the same row.");
	assert.equal(this.board.col, 0, "The empty cell should be on the same column.");
	assert.equal(this.board.locked, false, "The board should still be not locked.");
	assert.deepEqual(this.board.cells, [
			[7,1,2,3],
			[4,5,6,9],
			[0,8,10,11],
			[12,13,14,15]
	], "The board is changed.");
});

test("Test Board.prototype.slideDown", function( assert ) {
	this.board.slideDown();
	assert.equal(this.board.row, 3, "The empty cell should be one row lower.");
	assert.equal(this.board.col, 1, "The empty cell should be on the same column.");
	assert.equal(this.board.locked, false, "The board should still be not locked.");
	assert.deepEqual(this.board.cells, [
			[7,1,2,3],
			[4,5,6,9],
			[8,13,10,11],
			[12,0,14,15]
	], "The board is changed.");

	this.board.slideDown();
	assert.equal(this.board.row, 3, "The empty cell should be on the same row.");
	assert.equal(this.board.col, 1, "The empty cell should be on the same column.");
	assert.equal(this.board.locked, false, "The board should still be not locked.");
	assert.deepEqual(this.board.cells, [
			[7,1,2,3],
			[4,5,6,9],
			[8,13,10,11],
			[12,0,14,15]
	], "The board is changed.");
});

test("Test Board.prototype.slideUp", function( assert ) {
	this.board.slideUp();
	assert.equal(this.board.row, 1, "The empty cell should be one row higher.");
	assert.equal(this.board.col, 1, "The empty cell should be on the same column.");
	assert.equal(this.board.locked, false, "The board should still be not locked.");
	assert.deepEqual(this.board.cells, [
			[7,1,2,3],
			[4,0,6,9],
			[8,5,10,11],
			[12,13,14,15]
	], "The board is changed.");

	this.board.slideUp();
	assert.equal(this.board.row, 0, "The empty cell should be one row higher.");
	assert.equal(this.board.col, 1, "The empty cell should be on the same column.");
	assert.equal(this.board.locked, false, "The board should still be not locked.");
	assert.deepEqual(this.board.cells, [
			[7,0,2,3],
			[4,1,6,9],
			[8,5,10,11],
			[12,13,14,15]
	], "The board is changed.");

	this.board.slideUp();
	assert.equal(this.board.row, 0, "The empty cell should be on the same row.");
	assert.equal(this.board.col, 1, "The empty cell should be on the same column.");
	assert.equal(this.board.locked, false, "The board should still be not locked.");
	assert.deepEqual(this.board.cells, [
			[7,0,2,3],
			[4,1,6,9],
			[8,5,10,11],
			[12,13,14,15]
	], "The board is changed.");
});

test("Test Board.prototype.slideRight", function( assert ) {
	this.board.slideRight();
	assert.equal(this.board.row, 2, "The empty cell should be on the same row.");
	assert.equal(this.board.col, 2, "The empty cell should be one row to the right.");
	assert.equal(this.board.locked, false, "The board should still be not locked.");
	assert.deepEqual(this.board.cells, [
			[7,1,2,3],
			[4,5,6,9],
			[8,10,0,11],
			[12,13,14,15]
	], "The board is changed.");

	this.board.slideRight();
	assert.equal(this.board.row, 2, "The empty cell should be on the same row.");
	assert.equal(this.board.col, 3, "The empty cell should be one row to the right.");
	assert.equal(this.board.locked, false, "The board should still be not locked.");
	assert.deepEqual(this.board.cells, [
			[7,1,2,3],
			[4,5,6,9],
			[8,10,11,0],
			[12,13,14,15]
	], "The board is changed.");

	this.board.slideRight();
	assert.equal(this.board.row, 2, "The empty cell should be on the same row.");
	assert.equal(this.board.col, 3, "The empty cell should be on the same column.");
	assert.equal(this.board.locked, false, "The board should still be not locked.");
	assert.deepEqual(this.board.cells, [
			[7,1,2,3],
			[4,5,6,9],
			[8,10,11,0],
			[12,13,14,15]
	], "The board is changed.");
});