var board = new Board();

angular.module("myApp", []).
controller("gameController", function($scope) {
	$scope.cells = board.getCells();

	$scope.handleKeyDown = function(event) {
		var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
                    event.shiftKey;
        if (!modifiers) {
        	switch (event.which) {
        		case 38: //up
        			board.slideUp();break;
        		case 40: //down
        			board.slideDown();break;
        		case 37: //left
        			board.slideLeft();break;
        		case 39: //right
        			board.slideRight();break;
        	}
        	$scope.cells = board.getCells();
        }
	};
});