var mainController = ["$scope", "$document", "$timeout", "gameWonService", "localStorageService", 
	function($scope, $document, $timeout, gameWonService, localStorageService) {
		$scope.board = new Board(localStorageService.getBoard());
		$scope.series = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

		$scope.swipe = function(event) {
			event.preventDefault();
			moveZeroTile(event.gesture.direction, 50);
		};

		function moveZeroTile(direction, duration) {
			if (!$scope.board.locked) {
				var movedTile, value, reverse = Board.getReverseDirection(direction);
				if (direction == "up") {
					movedTile = $scope.board.getDown();
				} else if (direction == "down") {
					movedTile = $scope.board.getUp();
				} else if (direction == "left") {
					movedTile = $scope.board.getRight();
				} else {
					movedTile = $scope.board.getLeft();
				}
				if (movedTile) {
					value = $scope.board.cells[movedTile.row][movedTile.col];
					$scope.board.slide(reverse);	
				}
				$document.find(".tile").trigger("move", {
					duration: duration,
					movedTile: movedTile,
					value: value
				});
				if ($scope.board.won() === true) {
					$scope.$parent.$broadcast("game-won");
					$scope.$broadcast("pause");
					gameWonService($scope.$parent);
				} else {
					localStorageService.setBoard($scope.board);
				}
			}
		}

		$scope.$on("new-game", function() {
			$scope.board = new Board();
			localStorageService.setBoard($scope.board);
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
	}
];