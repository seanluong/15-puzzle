var ngZeroTile = function() {

	return function(scope, element, attrs) {
		var size = 110,
			margin = 12,
			gap = size + margin,
			lastRow, lastCol, y, x;

		element.on("update", function() {
			lastRow = scope.board.row;
			lastCol = scope.board.col;
			y = lastRow * (size + margin); 
			x = lastCol * (size + margin);
			element.css({
				"margin-top": y + "px",
				"margin-left": x + "px"
			});
		});
	};
};