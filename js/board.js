var Board = function() {
	this.cells = [
		[1,2,3,4],
		[5,6,7,8],
		[9,10,11,12],
		[13,14,15,0]
	];
	this.row = 3; // current row of 0
	this.col = 3; // current col of 0
};

Board.prototype.getCells = function() {
	return this.cells;
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
		this.cells[this.row][this.col-1] = temp;
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