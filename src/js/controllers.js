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

var myController = function($scope, $modal, $timeout, $interval, $document) {
	$scope.board = new Board(JSON.parse(localStorage.getItem("board")));
	$scope.timePassed =  parseInt(localStorage.getItem("timePassed")) || 0;
	$scope.bestTime = parseInt(localStorage.getItem("bestTime")) || "NA";

	var timeoutId = $interval(function() {
		$scope.timePassed += 1;
		localStorage.setItem("timePassed", $scope.timePassed);
	},1000,0,true);

	$scope.$on("$destroy", function() {
		$interval.cancel(timeoutId);
	});

	var key2dir = {
		38: "up",
		40: "down",
		37: "left",
		39: "right"
	};

	function moveZeroTile(direction) {
		if (direction == "up") {
			$scope.board.slideUp();
		} else if (direction == "down") {
			$scope.board.slideDown();
		} else if (direction == "left") {
			$scope.board.slideLeft();
		} else {
			$scope.board.slideRight();
		}
		$scope.$emit("board-change");
	}

	$document.ready(function() {
		$scope.$emit("init");
	});

	$scope.swipe = function(event) {
		event.preventDefault();
		moveZeroTile(event.gesture.direction);
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
	        			moveZeroTile(key2dir[event.which]);
	        			break;
	        		default: break;
	        	}
        	}
        }
	};

	$scope.$on("board-change", function(event, args) {
		event.stopPropagation();
		if ($scope.board.won() === true) {
			$scope.$emit("game-won", {});
		} else {
			localStorage.setItem("board", JSON.stringify($scope.board));
			$scope.$emit("update", args);
		}
	});

	$scope.$on("game-won", function(event, args) {
		event.stopPropagation();
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
		$scope.timePassed = 0;
		$timeout(function() {
			$scope.bestTime = parseInt(localStorage.getItem("bestTime"));
		},0,true);
		$scope.board = new Board();
		localStorage.setItem("board", JSON.stringify($scope.board));
		$scope.$emit("init");
		$scope.resume();		
	};

	$scope.showHelp = function() {

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
			controller: GuideModalInstanceCtrl
		});
		// $scope.pause();
	};
	
	$scope.handleGameWon = function(size) {
		var modalInstance = $modal.open({
			templateUrl: 'template/won.html',
			controller: GameWonModalInstanceCtrl,
			size: size
		});
		$scope.pause();
		var bestTime = localStorage.getItem("bestTime");
		if (!bestTime || $scope.timePassed < parseInt(bestTime)) {
			localStorage.setItem("bestTime", $scope.timePassed);
		}
		modalInstance.result.then(function () {
			$scope.newGame();
		}, function() {
			$scope.newGame();
		});
	};
};