angular.module("myApp", ["ngAnimate", 'ui.bootstrap']).
controller("myController", function($scope, $modal, $timeout) {
	$scope.board = new Board(JSON.parse(localStorage.getItem("board")));
	$scope.timePassed =  parseInt(localStorage.getItem("timePassed")) || 0;
	$scope.bestTime = parseInt(localStorage.getItem("bestTime")) || "NA";

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
		} else {
			console.log(JSON.stringify($scope.board));
			localStorage.setItem("board", JSON.stringify($scope.board));
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
		$scope.timePassed = 0;
		$timeout(function() {
			$scope.bestTime = parseInt(localStorage.getItem("bestTime"));
		},0,true);
		// $scope.board.shuffle();
		$scope.board = new Board();
		localStorage.setItem("board", JSON.stringify($scope.board));
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
			console.log(localStorage.getItem("bestTime"));
		}
		modalInstance.result.then(function () {
			$scope.newGame();
		}, function() {
			$scope.newGame();
		});
	};
}).
directive("ngTimePassed", function($interval) {
	function link(scope, element, attrs) {
		var timeoutId;

		function pad(amount) {
			if (amount < 10) {
				return "0" + amount;
			} else {
				return "" + amount;
			}
		}

		function parseTime(time) {
			var seconds, minutes, hours;
			seconds = time;
			hours = Math.floor(seconds / 3600);
			seconds %= 3600;
			minutes = Math.floor(seconds / 60);
			seconds %= 60;
			return {
				seconds: seconds,
				minutes: minutes,
				hours: hours
			};
		}

		function update() {
			if (!scope.board.locked) {
				var time;
				scope.timePassed += 1;
				time = parseTime(scope.timePassed);
				element.text(pad(time.hours) + ":" + pad(time.minutes) + ":" + pad(time.seconds));
				localStorage.setItem("timePassed", scope.timePassed);
			}
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
