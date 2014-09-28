var ngBoardAnimate = function() {

	return function(scope, element, attrs) {
		var size = 110,
			margin = 12,
			gap = size + margin,
			tile = element.find("#zero-tile"),
			lastRow, lastCol, y, x;

		tile.on("update", function() {
			lastRow = scope.board.row;
			lastCol = scope.board.col;
			y = lastRow * (size + margin); 
			x = lastCol * (size + margin);
			tile.css({
				"margin-top": y + "px",
				"margin-left": x + "px"
			});
		});
	};
};