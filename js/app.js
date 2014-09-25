angular.module("myApp", ["ngAnimate", 'ui.bootstrap']).
controller("gameController", function($scope, $modal) {
	$scope.board = new Board();

	$scope.handleKeyDown = function(event) {
		var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
                    event.shiftKey,
			src, dst;
        if (!modifiers) {
        	if (!$scope.board.locked) {
        		switch (event.which) {
	        		case 38: //up
	        			event.preventDefault();
	        			$scope.board.slideUp();
	        			$scope.$emit("board-change", {});
	        			break;
	        		case 40: //down
	        			event.preventDefault();
	        			$scope.board.slideDown();
	        			$scope.$emit("board-change", {});
	        			break;
	        		case 37: //left
	        			event.preventDefault();
	        			$scope.board.slideLeft();
	        			$scope.$emit("board-change", {});
	        			break;
	        		case 39: //right
	        			event.preventDefault();
	        			$scope.board.slideRight();
	        			$scope.$emit("board-change", {});
	        			break;
	        	}
        	}
        }
	};

	$scope.$on("board-change", function(event, args) {
		event.stopPropagation();
		if ($scope.board.won() === true) {
			$scope.board.locked = true;
			$scope.$emit("game-won", {});
		}
	});

	$scope.$on("game-won", function(event, args) {
		event.stopPropagation();
		console.log("Game won. Event handled.");
		$scope.handleGameWon();
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
		$scope.board.locked = false;
	};

	$scope.showHelp = function() {

	};

	/*
Working on angular-bootstrap modal dialog
	*/
	
	$scope.handleGameWon = function(size) {
		var modalInstance = $modal.open({
			templateUrl: 'game-won',
			controller: ModalInstanceCtrl,
			size: size,
			resolve: {
				items: function () {
					// return $scope.items;
				}
			}
		});

		modalInstance.result.then(function () {
			$scope.newGame();
		}, function() {
			$scope.newGame();
		});

		console.log(modalInstance.dismiss);
	};
});

var ModalInstanceCtrl = function ($scope, $modalInstance) {
	$scope.restart = function() {
		$modalInstance.close({});
	};
};
