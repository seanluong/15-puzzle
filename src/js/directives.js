var ngZeroTile = function() {

	return function(scope, element, attrs) {
		var size = 110,
			margin = 12,
			gap = size + margin,
			y = scope.board.row * (size + margin), 
			x = scope.board.col * (size + margin),
			oldY = y, oldX = x;

		element.css({
			"margin-top": y + "px",
			"margin-left": x + "px"
		});

		function move() {
			window.requestAnimationFrame(move);
			repaint();
		}

		function repaint() {
			if (oldY < y) {
				oldY++;
			} else if (oldY > y) {
				oldY--;
			}
			if (oldX < x) {
				oldX++;
			} else if (oldX > x) {
				oldX--;
			}
			element.css({
				"margin-top": oldY + "px",
				"margin-left": oldX + "px"
			});
		}

		scope.$on("update", function(event) {
			event.stopPropagation();
			y = scope.board.row * (size + margin); 
			x = scope.board.col * (size + margin);
			move();
		});
	};
};