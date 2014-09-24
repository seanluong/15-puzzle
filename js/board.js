var Board = function() {
	this.cells = [
		[0,1,2,3],
		[4,5,6,7],
		[8,9,10,11],
		[12,13,14,15]
	];
	this.row = 0; // current row of 0
	this.col = 0; // current col of 0
};

Board.prototype.slideLeft = function() {
	var temp;
	if (this.col !== 0) {
		temp = this.cells[this.row][this.col];
		this.cells[this.row][this.col] = this.cells[this.row][this.col-1];
		this.cells[this.row][this.col-1] = temp;
		this.col -= 1;
	} else {
		console.log("slide left has no effect.");
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
	} else {
		console.log("slide right has no effect.");
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
	} else {
		console.log("slide up has no effect.");
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
	} else {
		console.log("slide down has no effect.");
	}
	return this;
};

Board.prototype.won = function() {
	var index = [0,1,2,3],
		row, col;
	if (this.cells[3][3] === 0) {
		for (row in index) {
			for (col in index) {
				if (row !== 3 && col !== 3) {
					if (this.cells[row][col] != row * 4 + col) {
						return false;
					}
				}
			}
		}
		return true;
	}
	return false;
};

Board.prototype.print = function() {
	var row, col, rowStr = "";
	for (row in this.cells) {
		for (col in this.cells[row]) {
			rowStr += this.cells[row][col] + ",";
		}
		console.log(rowStr);
		rowStr = "";
	}
};