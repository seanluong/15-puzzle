var directionMap = {
	up: [-1,0],
	down: [1,0],
	left: [0,-1],
	right: [0,1]
};

var ngBoardAnimate = function($animate) {

	function move(row, col, dir) {
		var dst = [row,col],
			src = [row - dir[0], col - dir[1]];
		if (dst[0] !== src[0] || dst[1] !== src[1]) {

		}
		console.log(src, dst);
	}

	return function(scope, element, attrs) {
		element.on("keydown", function(event) {
			var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
        	if (!modifiers) {
				switch (event.which) {
	        		case 38: //up
	        			event.preventDefault();
	        			move(scope.board.row, scope.board.col, directionMap.up);
	        			break;
	        		case 40: //down
	        			event.preventDefault();
	        			move(scope.board.row, scope.board.col, directionMap.down);
	        			break;
	        		case 37: //left
	        			event.preventDefault();
	        			move(scope.board.row, scope.board.col, directionMap.left);
	        			break;
	        		case 39: //right
	        			event.preventDefault();
	        			move(scope.board.row, scope.board.col, directionMap.right);
	        			break;
	        		default: break;
	        	}
			}
		});
	};
};