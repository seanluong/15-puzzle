var mainController = ["$scope", "localStorageService", "directionService",
	function($scope, localStorageService, directionService) {
		$scope.board = localStorageService.getBoard();
		$scope.series = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
		$scope.init = true;
		$scope.move = {};

		$scope.swipe = function(event) {
			event.preventDefault();
			moveZeroCell(event.gesture.direction, 50);
		};

		function moveZeroCell(direction, duration) {
			if (!$scope.board.locked) {
				var reverse = directionService.getReverse(direction),
					movedTileDelta = directionService.getDelta(direction),
					zeroCellDelta = directionService.getDelta(reverse),
					movedTiledValue = $scope.board.getValue(zeroCellDelta);
				if (movedTiledValue) {
					$scope.board.slide(zeroCellDelta);
					$scope.move = {
						duration: duration,
						movedTiledValue: movedTiledValue,
						drow: movedTileDelta.drow,
						dcol: movedTileDelta.dcol
					};
					if ($scope.board.won() === true) {
						localStorageService.setBoard(new Board());
						$scope.$parent.$broadcast("game-won");
						$scope.$broadcast("pause");
					} else {
						localStorageService.setBoard($scope.board);
					}
				}
			}
		}

		$scope.$on("new-game", function() {
			$scope.board = new Board();
			localStorageService.setBoard($scope.board);
			$scope.init = !$scope.init; // invert to change it
		});

		$scope.$on("keydown", function(event, args) {
			moveZeroCell(args.direction, args.duration);
		});

		$scope.$on("pause", function() {
			$scope.board.locked = true;
		});

		$scope.$on("resume", function() {
			$scope.board.locked = false;
		});
	}
];