var ngZeroTile = function() {

	return function(scope, element, attrs) {
		var size = 110,
			margin = 12,
			gap = size + margin,
			lastRow = scope.board.row, 
			lastCol = scope.board.col, 
			y = lastRow * (size + margin), 
			x = lastCol * (size + margin);
		element.css({
			"margin-top": y + "px",
			"margin-left": x + "px"
		});

		scope.$on("update", function(event) {
			event.stopPropagation();
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