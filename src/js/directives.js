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
			gap = size + margin;

		function findCoor(cells, value) {
			var row, col;
			for (row in [0,1,2,3]) {
				for (col in [0,1,2,3]) {
					if (cells[row][col] === value) {
						return {
							y: row * gap + margin,
							x: col * gap + margin
						};
					}
				}
			}
		}

		element.on("init", function() {
			var value = parseInt(element.text()) || 0,
				coor = findCoor(scope.board.cells, value),
				y = coor.y,
				x = coor.x;
			element.css({
				"left": x + "px",
				"top": y + "px"
			});
			if (value === 0) {
				element.attr({
					"class": "tile zero-tile"
				});
				element.text("");
			} else {
				element.attr({
					"class":"tile my-tile"
				});
				element.text(value);
			}
		});

		element.on("move", function(event, args) {
			var value = parseInt(element.text()) || 0,
				y, x, coor;
			if (args.movedTile) {
				if (args.value === value) {
					coor = findCoor(scope.board.cells, 0);
					y = args.movedTile.myTile.drow * gap + coor.y;
					x = args.movedTile.myTile.dcol * gap + coor.x;
					element.animate({
						"left": x + "px",
						"top": y + "px"
					},args.duration);
				} else if (value === 0) {
					coor = findCoor(scope.board.cells, args.value);
					y = args.movedTile.zeroTile.drow * gap + coor.y;
					x = args.movedTile.zeroTile.dcol * gap + coor.x;
					element.css({
						"left": x + "px",
						"top": y + "px"
					});
				}
			}
		});
	};

};