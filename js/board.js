var Board = function() {
	this.cells = [
		[1,2,3,4],
		[5,6,7,8],
		[9,10,11,12],
		[13,14,15,0]
	];
	this.row = 3; // current row of 0
	this.col = 3; // current col of 0
	this.target = [
		[1,2,3,4],
		[5,6,7,8],
		[9,10,11,12],
		[13,14,15,0]
	];
	// this.shuffle();
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
	this.print();
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
	for (row in this.cells) {
		for (col in this.cells[row]) {
			if (this.cells[row][col] !== this.target[row][col]) {
				return false;
			}
		}
	}
	return true;
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