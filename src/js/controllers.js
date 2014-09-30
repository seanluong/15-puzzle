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

var headerController = function($scope, $interval) {
	$scope.timePassed =  parseInt(localStorage.getItem("timePassed")) || 0;
	var timeoutId = $interval(function() {
		$scope.timePassed += 1;
		localStorage.setItem("timePassed", $scope.timePassed);
	},1000,0,true);

	$scope.$on("$destroy", function() {
		$interval.cancel(timeoutId);
	});

	$scope.$on("new-game", function() {
		$scope.timePassed = 0;
	});

	$scope.$on("game-won", function() {
		var bestTime = localStorage.getItem("bestTime");
		if (!bestTime || $scope.timePassed < parseInt(bestTime)) {
			localStorage.setItem("bestTime", $scope.timePassed);
		}
	});
};

var bodyController = function($scope, $modal, $timeout, $interval, $document) {
	$scope.board = new Board(JSON.parse(localStorage.getItem("board")));	
	$scope.bestTime = parseInt(localStorage.getItem("bestTime")) || "NA";

	var key2dir = {
		38: "up",
		40: "down",
		37: "left",
		39: "right"
	};

	function moveZeroTile(direction, duration) {
		if (direction == "up") {
			$scope.board.slideUp();
		} else if (direction == "down") {
			$scope.board.slideDown();
		} else if (direction == "left") {
			$scope.board.slideLeft();
		} else {
			$scope.board.slideRight();
		}
		$scope.$emit("board-change", {
			duration: duration
		});
	}

	$document.ready(function() {
		$scope.$emit("init");
	});

	$scope.swipe = function(event) {
		event.preventDefault();
		moveZeroTile(event.gesture.direction, 50);
	};

	$scope.handleKeyDown = function(event) {
		var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
        if (!modifiers) {
        	if (!$scope.board.locked) {
        		switch (event.which) {
	        		case 38: //up
	        		case 40: //down
	        		case 37: //left
	        		case 39: //right
	        			event.preventDefault();
	        			moveZeroTile(key2dir[event.which], 10);
	        			break;
	        		default: break;
	        	}
        	}
        }
	};

	$scope.$on("board-change", function(event, args) {
		event.stopPropagation();
		if ($scope.board.won() === true) {
			$scope.$broadcast("game-won");
		} else {
			localStorage.setItem("board", JSON.stringify($scope.board));
			$scope.$emit("move", args);
		}
	});

	$scope.$on("game-won", function(event) {
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

	$scope.newGame = function() {
		$scope.$broadcast("new-game");
		$timeout(function() {
			$scope.bestTime = parseInt(localStorage.getItem("bestTime"));
		},0,true);
		$scope.board = new Board();
		localStorage.setItem("board", JSON.stringify($scope.board));
		$scope.$emit("init");
		$scope.resume();		
	};

	$scope.pause = function() {
		$scope.board.locked = true;
	};

	$scope.resume = function() {
		$scope.board.locked = false;
	};

	$scope.guide = function() {
		var modalInstance = $modal.open({
			templateUrl: 'template/guide.html',
			controller: GuideModalInstanceCtrl,
			size: "sm"
		});
		$scope.pause();
		modalInstance.result.then(function () {
			$scope.resume();
		}, function() {
			$scope.resume();
		});
	};
	
	$scope.handleGameWon = function(size) {
		var modalInstance = $modal.open({
			templateUrl: 'template/won.html',
			scope: $scope,
			controller: GameWonModalInstanceCtrl,
			size: size
		});
		$scope.pause();
		modalInstance.result.then(function () {
			$scope.newGame();
		}, function() {
			$scope.newGame();
		});
	};
};