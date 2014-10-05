var mainController = ["$scope", "$document", "$timeout", "gameWonService", 
	"localStorageService", "directionService",
	function($scope, $document, $timeout, gameWonService, localStorageService, directionService) {
		$scope.board = localStorageService.getBoard();
		$scope.series = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

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
					$document.find(".tile").trigger("move", {
						duration: duration,
						movedTiledValue: movedTiledValue,
						drow: movedTileDelta.drow,
						dcol: movedTileDelta.dcol
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
		}

		$scope.$on("new-game", function() {
			$scope.board = new Board();
			localStorageService.setBoard($scope.board);
			$timeout(function() {
				$document.find(".tile").trigger("init");
			},0,true);
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