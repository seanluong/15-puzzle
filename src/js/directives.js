var ngZeroTile = function() {

	return function(scope, element, attrs) {
		var size = 110,
			margin = 12,
			gap = size + margin,
			y = scope.board.row * (size + margin), 
			x = scope.board.col * (size + margin),
			dy, dx;

		element.css({
			"margin-top": y + "px",
			"margin-left": x + "px"
		});

		scope.$on("init", function(event) {
			event.stopPropagation();
			y = scope.board.row * (size + margin); 
			x = scope.board.col * (size + margin);
			element.css({
				"margin-top": y + "px",
				"margin-left": x + "px"
			});
		});

		scope.$on("move", function(event, args) {
			event.stopPropagation();
			dy = scope.board.row * (size + margin) - y;
			dx = scope.board.col * (size + margin) - x;
			y = scope.board.row * (size + margin); 
			x = scope.board.col * (size + margin);
			element.animate({
				"margin-top": y + "px",
				"margin-left": x + "px"
			}, args.duration, "linear");
		});
	};
};

var ngTile = function() {

	return function (scope, element, attrs) {
		var size = 110,
			margin = 12,
			gap = size + margin,
			row = parseInt(attrs.ngRow),
			col = parseInt(attrs.ngCol);

		element.on("init", function() {
			var value = scope.board.cells[row][col];
			if (value === 0) {
				element.attr({
					"class": "tile zero-tile",
				});
				element.text("");
			} else {
				element.attr({
					"class": "tile my-tile",
				});
				element.text(value);
			}
		});

		element.on("move", function(event, args) {
			var value = parseInt(element.text()) || 0;
			if (args.movedTile) {
				if (args.value === value) {
					element.attr({
						"class": "tile zero-tile"
					});
					element.text("");
				} else if (value === 0) {
					element.attr({
						"class": "tile my-tile"
					});
					element.text(args.value);
				}
			}
		});
	};

};