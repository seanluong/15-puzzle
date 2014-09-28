var ngZeroTile = function($interval) {

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

		function repaint(timeoutId) {
			if (oldY < y) {
				oldY += 2;
			} else if (oldY > y) {
				oldY -= 2;
			} else {
				if (oldX < x) {
					oldX += 2;
				} else if (oldX > x) {
					oldX -= 2;
				} else {
					console.log("Here: " + timeoutId);
					$interval.cancel(timeoutId);
				}
			}			
			element.css({
				"margin-top": oldY + "px",
				"margin-left": oldX + "px"
			});
		}

		scope.$on("init", function(event) {
			event.stopPropagation();
			y = scope.board.row * (size + margin); 
			x = scope.board.col * (size + margin);
			oldX = x;
			oldY = y;
			element.css({
				"margin-top": y + "px",
				"margin-left": x + "px"
			});
		});

		scope.$on("update", function(event) {
			event.stopPropagation();
			y = scope.board.row * (size + margin); 
			x = scope.board.col * (size + margin);
			var timeoutId = $interval(function() {
				repaint(timeoutId);
			},5,0,true);
		});
	};
};