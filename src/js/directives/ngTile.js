var ngTile = function() {

	return function (scope, element, attrs) {
		var size = 116,
			margin = 4,
			gap = size + margin;

		function findCoor(cells, value) {
			var row, col;
			for (row in [0,1,2,3]) {
				for (col in [0,1,2,3]) {
					if (cells[row][col] === value) {
						return {
							y: row * gap,
							x: col * gap
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
			if (value !== 0) {
				element.attr({
					"class":"tile my-tile"
				});
				element.text(value);
			}
		});

		element.on("move", function(event, args) {
			var value = parseInt(element.text()) || 0,
				y, x, coor;
			if (args.value) {
				if (args.value === value) {
					coor = findCoor(scope.board.cells, 0);
					y = args.delta.drow * gap + coor.y;
					x = args.delta.dcol * gap + coor.x;
					element.animate({
						"left": x + "px",
						"top": y + "px"
					}, args.duration);
				}
			}
		});
	};

};