var Board = function(board) {
	if (board) {
		this.cells = board.cells;
		this.row = board.row;
		this.col = board.col;
		this.target = board.target;
		this.locked = board.locked;
	} else {
		this.cells = [
			[1,2,3,4],
			[5,6,7,8],
			[9,10,11,12],
			[13,14,15,0]
		];
		this.row = 3;
		this.col = 3;
		this.target = [
			[1,2,3,4],
			[5,6,7,8],
			[9,10,11,12],
			[13,14,15,0]
		];
		this.locked = false;
		this.shuffle();
	}
};

Board.prototype.getLeft = function() {
	if (this.col <= 0) {
		return null;
	} else {
		return {
			myTile: {
				drow:0, dcol:1
			},
			row: this.row, col: this.col-1
		};
	}
};

Board.prototype.getRight = function() {
	if (this.col >= 3) {
		return null;
	} else {
		return {
			myTile: {
				drow:0, dcol:-1
			},
			row: this.row, col: this.col+1
		};
	}
};

Board.prototype.getUp = function() {
	if (this.row <= 0) {
		return null;
	} else {
		return {
			myTile: {
				drow:+1, dcol:0
			},
			row: this.row-1, col: this.col
		};
	}
};

Board.prototype.getDown = function() {
	if (this.row >= 3) {
		return null;
	} else {
		return {
			myTile: {
				drow:-1, dcol:0
			},
			row: this.row+1, col: this.col
		};
	}
};

Board.prototype.shuffle = function(nsteps) {
	var step = nsteps || 100,
		direction;
	while (step > 0) {
		direction = parseInt(Math.random() * 4);
		switch (direction) {
			case 0: this.slideLeft(); break;
			case 1: this.slideRight(); break;
			case 2: this.slideUp(); break;
			case 3: this.slideDown(); break;
		}
		step--;
	}
};

Board.getDelta = function(direction) {
	var delta = {};
	if (direction === "up") {
		delta.drow = -1;
		delta.dcol = 0;
	} else if (direction === "down") {
		delta.drow = 1;
		delta.dcol = 0;
	} else if (direction === "left") {
		delta.drow = 0;
		delta.dcol = -1;
	} else if (direction === "right") {
		delta.drow = 0;
		delta.dcol = 1;
	} else {
		delta = null;
	}
	return delta;
};

Board.getReverseDirection = function(direction) {
	if (direction === "up") {
		return "down";
	} else if (direction === "down") {
		return "up";
	} else if (direction === "left") {
		return "right";
	} else if (direction === "right") {
		return "left";
	} else {
		return null;
	}
};

Board.prototype.slide = function(direction) {
	var delta = Board.getDelta(direction),
		nrow = this.row + delta.drow,
		ncol = this.col + delta.dcol,
		temp;
	if (nrow >=0 && nrow <= 3 && ncol >=0 && ncol <= 3) {
		temp = this.cells[this.row][this.col];
		this.cells[this.row][this.col] = this.cells[nrow][ncol];
		this.cells[nrow][ncol] = temp;
		this.row = nrow;
		this.col = ncol;
	}
	return this;
};

Board.prototype.slideLeft = function() {
	var temp;
	if (this.col !== 0) {
		temp = this.cells[this.row][this.col];
		this.cells[this.row][this.col] = this.cells[this.row][this.col-1];
		this.cells[this.row][this.col-1] = temp;
		this.col -= 1;
	}
	return this;
};

Board.prototype.slideRight = function() {
	var temp;
	if (this.col !== 3) {
		temp = this.cells[this.row][this.col];
		this.cells[this.row][this.col] = this.cells[this.row][this.col+1];
		this.cells[this.row][this.col+1] = temp;
		this.col += 1;
	}
	return this;
};

Board.prototype.slideUp = function() {
	var temp;
	if (this.row !== 0) {
		temp = this.cells[this.row][this.col];
		this.cells[this.row][this.col] = this.cells[this.row-1][this.col];
		this.cells[this.row-1][this.col] = temp;
		this.row -= 1;
	}
	return this;
};

Board.prototype.slideDown = function() {
	var temp;
	if (this.row !== 3) {
		temp = this.cells[this.row][this.col];
		this.cells[this.row][this.col] = this.cells[this.row+1][this.col];
		this.cells[this.row+1][this.col] = temp;
		this.row += 1;
	}
	return this;
};

Board.prototype.won = function() {
	var row, col;
	for (row in this.cells) {
		for (col in this.cells[row]) {
			if (this.cells[row][col] !== this.target[row][col]) {
				return false;
			}
		}
	}
	return true;
};