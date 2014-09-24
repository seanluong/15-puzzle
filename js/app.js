angular.module("myApp", []).
controller("gameController", function($scope) {
	$scope.board = new Board();

	$scope.handleKeyDown = function(event) {
		var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
                    event.shiftKey;
        if (!modifiers) {
        	switch (event.which) {
        		case 38: //up
        			$scope.board.slideUp();break;
        		case 40: //down
        			$scope.board.slideDown();break;
        		case 37: //left
        			$scope.board.slideLeft();break;
        		case 39: //right
        			$scope.board.slideRight();break;
        	}
        }
	};

	$scope.getCellClass = function(value) {
		if (value === 0) {
			return "zero-cell";
		} else {
			return "cell";
		}
	};

	$scope.newGame = function() {

	};

	$scope.showHelp = function() {

	};
});