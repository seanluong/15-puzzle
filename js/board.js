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
	} else {
		console.log("slide left has no effect.");
	}
};