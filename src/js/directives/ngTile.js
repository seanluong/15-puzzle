var ngTile = function() {

	function link(scope, element, attrs) {
		var gap = 12; // size 11.6 + margin 0.4

		function findCoor(cells, value, gap) {
			var row, col, arr = [0,1,2,3];
			for (row in arr) {
				for (col in arr) {
					if (cells[row][col] === value) {
						return {
							y: row * gap,
							x: col * gap
						};
					}
				}
			}
		}

		function init() {
			var value = parseInt(element.text()) || 0,
				coor = findCoor(scope.board.cells, value, gap),
				y = coor.y,
				x = coor.x;
			element.css({
				"left": x + "rem",
				"top": y + "rem"
			});
			if (value !== 0) {
				element.attr({
					"class":"tile my-tile"
				});
				element.text(value);
			}
		}
		
		function move(args) {
			var value = parseInt(element.text()) || 0,
				y, x, coor;
			if (args.movedTiledValue) {
				if (args.movedTiledValue === value) {
					coor = findCoor(scope.board.cells, 0, gap);
					y = args.drow * gap + coor.y;
					x = args.dcol * gap + coor.x;
					element.animate({
						"left": x + "rem",
						"top": y + "rem"
					}, args.duration);
				}
			}
		}

		scope.$watch(attrs.init, function(value) {
			init();
		});

		scope.$watch(attrs.move, function(value) {
			move(value);
		});
	}

	return {
		link: link
	};

};