var GuideModalInstanceCtrl = function($scope, $modalInstance) {
	$scope.ok = function() {
		$modalInstance.dismiss("done");
	};
};

var GameWonModalInstanceCtrl = function ($scope, $modalInstance) {
	$scope.ok = function() {
		$modalInstance.close({});
	};
};

var headerController = function($scope, $interval, $timeout, $modal) {
	$scope.timePassed =  parseInt(localStorage.getItem("timePassed")) || 0;
	$scope.bestTime = parseInt(localStorage.getItem("bestTime")) || "NA";

	var timeoutId = $interval(function() {
		$scope.timePassed += 1;
		localStorage.setItem("timePassed", $scope.timePassed);
	},1000,0,true);

	$scope.$on("$destroy", function() {
		$interval.cancel(timeoutId);
	});

	$scope.$on("new-game", function() {
		$scope.timePassed = 0;
		$timeout(function() {
			$scope.bestTime = parseInt(localStorage.getItem("bestTime"));
		},0,true);
	});

	$scope.$on("game-won", function() {
		var bestTime = localStorage.getItem("bestTime");
		if (!bestTime || $scope.timePassed < parseInt(bestTime)) {
			localStorage.setItem("bestTime", $scope.timePassed);
		}
	});

	$scope.newGame = function() {
		$scope.$parent.$broadcast("new-game");
	};
};

var mainController = function($scope, $document, $timeout) {
	$scope.board = new Board(JSON.parse(localStorage.getItem("board")));

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
				direction: direction,
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

	$scope.getCellClass = function(row, col) {
		var value = $scope.board.cells[row][col];
		if (value !== 0) {
			return "my-cell";
		} else {
			return "";
		}
	};

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

var bodyController = function($scope, $modal, $document) {

	var key2dir = {
		38: "up",
		40: "down",
		37: "left",
		39: "right"
	};

	$document.ready(function() {
		$document.find(".tile").trigger("init");
	});

	$scope.handleKeyDown = function(event) {
		var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
        if (!modifiers && key2dir[event.which]) {
    		event.preventDefault();
			$scope.$broadcast("keydown", {
				direction: key2dir[event.which],
				duration: 10
			});
        }
	};

	$scope.guide = function() {
		var modalInstance = $modal.open({
			templateUrl: 'template/guide.html',
			controller: GuideModalInstanceCtrl,
			size: "sm"
		});
		$scope.$broadcast("pause");
		modalInstance.result.then(function () {
			$scope.$broadcast("resume");
		}, function() {
			$scope.$broadcast("resume");
		});
	};

	$scope.$on("game-won", function(event) {
		var modalInstance = $modal.open({
			templateUrl: 'template/won.html',
			scope: $scope,
			controller: GameWonModalInstanceCtrl
		});
		$scope.$broadcast("pause");
		modalInstance.result.then(function () {
			$scope.$broadcast("new-game");
		}, function() {
			$scope.$broadcast("new-game");
		});
	});
};