var directionMap = {
	up: [-1,0],
	down: [1,0],
	left: [0,-1],
	right: [0,1]
};

var ngBoardAnimate = function($document) {

	return function(scope, element, attrs) {
		var size = 110,
			margin = 12,
			gap = size + margin,
			tile = element.find("#zero-tile"),
			lastRow = scope.board.row,
			lastCol = scope.board.col,
			y = lastRow * (size + margin), 
			x = lastCol * (size + margin);

		tile.css({
			"margin-top": y + "px",
			"margin-left": x + "px"
		});

		function move(row, col, dir) {
			var dst = [row,col],
				src = [row - dir[0], col - dir[1]];
			lastRow = scope.board.row;
			lastCol = scope.board.col;
			console.log(src, dst);
			if (dst[0] !== src[0] || dst[1] !== src[1]) {
				y += dir[0] * gap;
				x += dir[1] * gap;
				tile.css({
					"margin-top": y + "px",
					"margin-left": x + "px"
				});
			}
			
		}

		$document.on("keydown", function(event) {
			var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
        	if (!modifiers) {
        		console.log(lastRow, lastCol);
				switch (event.which) {
	        		case 38: //up
	        			event.preventDefault();
	        			if (lastRow > 0) {
	        				move(scope.board.row, scope.board.col, directionMap.up);
	        			}
	        			break;
	        		case 40: //down
	        			event.preventDefault();
	        			if (lastRow < 3) {
	        				move(scope.board.row, scope.board.col, directionMap.down);
	        			}
	        			break;
	        		case 37: //left
	        			event.preventDefault();
	        			if (lastCol > 0) {
	        				move(scope.board.row, scope.board.col, directionMap.left);
	        			}
	        			break;
	        		case 39: //right
	        			event.preventDefault();
	        			if (lastCol < 3) {
	        				move(scope.board.row, scope.board.col, directionMap.right);
	        			}
	        			break;
	        		default: break;
	        	}
			}
		});
	};
};