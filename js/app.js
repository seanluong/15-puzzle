angular.module("myApp", ["ngAnimate"]).
controller("gameController", function($scope) {
	$scope.board = new Board();

	$scope.handleKeyDown = function(event) {
		var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
                    event.shiftKey,
			src, dst;
        if (!modifiers) {
        	switch (event.which) {
        		case 38: //up
        			event.preventDefault();
        			$scope.board.slideUp();
        			break;
        		case 40: //down
        			event.preventDefault();
        			$scope.board.slideDown();
        			break;
        		case 37: //left
        			event.preventDefault();
        			$scope.board.slideLeft();
        			break;
        		case 39: //right
        			event.preventDefault();
        			$scope.board.slideRight();
        			break;
        	}
        	if ($scope.board.won() === true) {
        		$scope.$emit("won", {});
        	}
        }
	};

	$scope.$on("won", function(event, args) {
		event.stopPropagation();
		console.log("Game won. Event handled.");
	});

	$scope.getCellHTML = function(row, col) {
		var value = $scope.board.cells[row][col];
		if (value !== 0) {
			return value;
		} else {
			return "";
		}
	};

	$scope.getCellClass = function(row, col) {
		var value = $scope.board.cells[row][col];
		if (value === 0) {
			return "my-zero-cell";
		} else {
			return "my-cell";
		}
	};

	$scope.newGame = function() {
		$scope.board.shuffle();
	};

	$scope.showHelp = function() {

	};
});