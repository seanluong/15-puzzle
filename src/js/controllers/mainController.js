var mainController = function($scope, $document, $timeout) {
	$scope.board = new Board(JSON.parse(localStorage.getItem("board")));
	$scope.series = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

	$scope.swipe = function(event) {
		event.preventDefault();
		moveZeroTile(event.gesture.direction, 50);
	};

	function moveZeroTile(direction, duration) {
		if (!$scope.board.locked) {
			var movedTile, value;
			if (direction == "up") {
				movedTile = $scope.board.getDown();
				if (movedTile) {
					value = $scope.board.cells[movedTile.row][movedTile.col];
					$scope.board.slideDown();	
				}
			} else if (direction == "down") {
				movedTile = $scope.board.getUp();
				if (movedTile) {
					value = $scope.board.cells[movedTile.row][movedTile.col];
					$scope.board.slideUp();	
				}
			} else if (direction == "left") {
				movedTile = $scope.board.getRight();
				if (movedTile) {
					value = $scope.board.cells[movedTile.row][movedTile.col];
					$scope.board.slideRight();	
				}
			} else {
				movedTile = $scope.board.getLeft();
				if (movedTile) {
					value = $scope.board.cells[movedTile.row][movedTile.col];
					$scope.board.slideLeft();	
				}
			}
			$document.find(".tile").trigger("move", {
				duration: duration,
				movedTile: movedTile,
				value: value
			});
			if ($scope.board.won() === true) {
				$scope.$parent.$broadcast("game-won");
			} else {
				localStorage.setItem("board", JSON.stringify($scope.board));
			}
		}
	}

	$scope.$on("new-game", function() {
		$scope.board = new Board();
		localStorage.setItem("board", JSON.stringify($scope.board));
		$timeout(function() {
			$document.find(".tile").trigger("init");
		},0,true);
	});

	$scope.$on("keydown", function(event, args) {
		moveZeroTile(args.direction, args.duration);
	});

	$scope.$on("pause", function() {
		$scope.board.locked = true;
	});

	$scope.$on("resume", function() {
		$scope.board.locked = false;
	});
};