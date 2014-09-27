angular.module("myApp", ["ngAnimate", 'ui.bootstrap']).
controller("myController", function($scope, $modal) {
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
			controller: GuideModelInstanceCtrl
		});
		$scope.pause();
	};
	
	$scope.handleGameWon = function(size) {
		var modalInstance = $modal.open({
			templateUrl: 'template/won.html',
			controller: GameWonModelInstanceCtrl,
			size: size
		});
		$scope.pause();
		modalInstance.result.then(function () {
			$scope.newGame();
		}, function() {
			$scope.newGame();
		});
	};
}).
directive("ngTimePassed", function($interval) {
	var timePassed = 0;
	function link(scope, element, attrs) {
		var timeoutId;

		function pad(amount) {
			if (amount < 10) {
				return "0" + amount;
			} else {
				return "" + amount;
			}
		}

		function update() {
			var seconds, minutes, hours, temp;
			timePassed += 1;
			seconds = timePassed;
			hours = Math.floor(seconds / 3600);
			seconds %= 3600;
			minutes = Math.floor(seconds / 60);
			seconds %= 60;
			element.text(pad(hours) + ":" + pad(minutes) + ":" + pad(seconds));
		}
		scope.$watch(attrs.ngTimePassed, function(value) {
			update();
		});
		element.on('$destroy', function() {
			$interval.cancel(timeoutId);
		});
		timeoutId = $interval(function() {
			update();
		}, 1000);
    }

    return {
      link: link
    };
});

var GuideModelInstanceCtrl = function($scope, $modalInstance) {
	$scope.ok = function() {
		$modalInstance.dismiss("done");
	};
};

var GameWonModelInstanceCtrl = function ($scope, $modalInstance) {
	$scope.ok = function() {
		$modalInstance.close({});
	};
};
