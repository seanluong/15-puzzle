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
		// this.shuffle();
	}
};

Board.prototype.getValue = function(delta) {
	var nrow = this.row + delta.drow,
		ncol = this.col + delta.dcol,
		temp;
	if (nrow >=0 && nrow <= 3 && ncol >=0 && ncol <= 3) {
		return this.cells[nrow][ncol];
	}
	return null;
};

Board.prototype.shuffle = function(nsteps) {
	var step = nsteps || 100,
		drs = [0,0,-1,1],
		dcs = [1,-1,0,0],
		idx;
	while (step > 0) {
		idx = parseInt(Math.random() * 4);
		this.slide({
			drow: drs[idx],
			dcol: dcs[idx]
		});
		step--;
	}
};

Board.prototype.slide = function(delta) {
	var nrow = this.row + delta.drow,
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