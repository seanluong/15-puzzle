var Board = function(board) {
	if (board) {
		this.cells = board.cells;
		this.row = board.row;
		this.col = board.col;
		this.target = board.target;
		this.locked = board.locked;
	} else {
		this.cells = [
			[1,2,3,4],
			[5,6,7,8],
			[9,10,11,12],
			[13,14,15,0]
		];
		this.row = 3; // current row of 0
		this.col = 3; // current col of 0
		this.target = [
			[1,2,3,4],
			[5,6,7,8],
			[9,10,11,12],
			[13,14,15,0]
		];
		this.locked = false;
		this.shuffle();
	}
};

Board.prototype.shuffle = function(nsteps) {
	var step = nsteps || 100,
		direction;
	while (step > 0) {
		direction = parseInt(Math.random() * 4);
		switch (direction) {
			case 0: this.slideLeft(); break;
			case 1: this.slideRight(); break;
			case 2: this.slideUp(); break;
			case 3: this.slideDown(); break;
		}
		step--;
	}
};

Board.prototype.slideLeft = function() {
	var temp;
	if (this.col !== 0) {
		temp = this.cells[this.row][this.col];
		this.cells[this.row][this.col] = this.cells[this.row][this.col-1];
		this.cells[this.row][this.col-1] = temp;
		this.col -= 1;
	}
	return this;
};

Board.prototype.slideRight = function() {
	var temp;
	if (this.col !== 3) {
		temp = this.cells[this.row][this.col];
		this.cells[this.row][this.col] = this.cells[this.row][this.col+1];
		this.cells[this.row][this.col+1] = temp;
		this.col += 1;
	}
	return this;
};

Board.prototype.slideUp = function() {
	var temp;
	if (this.row !== 0) {
		temp = this.cells[this.row][this.col];
		this.cells[this.row][this.col] = this.cells[this.row-1][this.col];
		this.cells[this.row-1][this.col] = temp;
		this.row -= 1;
	}
	return this;
};

Board.prototype.slideDown = function() {
	var temp;
	if (this.row !== 3) {
		temp = this.cells[this.row][this.col];
		this.cells[this.row][this.col] = this.cells[this.row+1][this.col];
		this.cells[this.row+1][this.col] = temp;
		this.row += 1;
	}
	return this;
};

Board.prototype.won = function() {
	var row, col;
	for (row in this.cells) {
		for (col in this.cells[row]) {
			if (this.cells[row][col] !== this.target[row][col]) {
				return false;
			}
		}
	}
	return true;
};;var GuideModalInstanceCtrl = function($scope, $modalInstance) {
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

var mainController = function($scope) {
	$scope.board = new Board(JSON.parse(localStorage.getItem("board")));

	$scope.swipe = function(event) {
		event.preventDefault();
		moveZeroTile(event.gesture.direction, 50);
	};

	function moveZeroTile(direction, duration) {
		if (!$scope.board.locked) {
			if (direction == "up") {
				$scope.board.slideUp();
			} else if (direction == "down") {
				$scope.board.slideDown();
			} else if (direction == "left") {
				$scope.board.slideLeft();
			} else {
				$scope.board.slideRight();
			}
			$scope.$emit("move", {
					duration: duration
				});
			if ($scope.board.won() === true) {
				$scope.$parent.$broadcast("game-won");
			} else {
				localStorage.setItem("board", JSON.stringify($scope.board));
			}
		}
	}

	$scope.getCellHTML = function(row, col) {
		var value = $scope.board.cells[row][col];
		if (value !== 0) {
			return value;
		} else {
			return "";
		}
	};

	$scope.$on("new-game", function() {
		$scope.board = new Board();
		localStorage.setItem("board", JSON.stringify($scope.board));
		$scope.$emit("init");
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
		$scope.$emit("init");
	});

	$scope.handleKeyDown = function(event) {
		var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
        if (!modifiers && key2dir[event.which]) {
    		event.preventDefault();
			console.log(key2dir[event.which]);
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
};;var durationFilter = function() {

	function pad(amount) {
		if (amount > 9) {
			return amount;
		} else if (amount >= 0) {
			return "0" + amount;
		} else {
			return "--";
		}
	}

	function formatTime(time) {
		var seconds, minutes, hours;
		seconds = time;
		hours = Math.floor(seconds / 3600);
		seconds %= 3600;
		minutes = Math.floor(seconds / 60);
		seconds %= 60;
		return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
	}

    return function(input) {
		input = input || "";
		if (input.length === 0) {
			return "--:--:--";
		} else {
			return formatTime(parseInt(input));
		}
    };
};;var ngZeroTile = function() {

	return function(scope, element, attrs) {
		var size = 110,
			margin = 12,
			gap = size + margin,
			y = scope.board.row * (size + margin), 
			x = scope.board.col * (size + margin),
			dy, dx;

		element.css({
			"margin-top": y + "px",
			"margin-left": x + "px"
		});

		scope.$on("init", function(event) {
			event.stopPropagation();
			y = scope.board.row * (size + margin); 
			x = scope.board.col * (size + margin);
			element.css({
				"margin-top": y + "px",
				"margin-left": x + "px"
			});
		});

		scope.$on("move", function(event, args) {
			event.stopPropagation();
			dy = scope.board.row * (size + margin) - y;
			dx = scope.board.col * (size + margin) - x;
			y = scope.board.row * (size + margin); 
			x = scope.board.col * (size + margin);
			element.animate({
				"margin-top": y + "px",
				"margin-left": x + "px"
			}, args.duration, "linear");
		});
	};
};;var myApp = angular.module("myApp", ["angular-gestures","ui.bootstrap"]);
// bind controllers
myApp.controller("bodyController", bodyController);
myApp.controller("headerController", headerController);
myApp.controller("mainController", mainController);

// bind filters
myApp.filter("duration", durationFilter);

// bind directives
myApp.directive('ngZeroTile', ["$interval", ngZeroTile]);


$("#board-container").on('touchmove', function(e) {
		e.preventDefault();
});