(function () {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
      window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      },
      timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
}());
;angular.module("myApp", ["ngAnimate", 'ui.bootstrap']).
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
;var Board = function() {
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
	// this.shuffle();
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
	this.print();
};

Board.prototype.slideLeft = function() {
	var temp;
	if (this.col !== 0) {
		temp = this.cells[this.row][this.col];
		this.cells[this.row][this.col] = this.cells[this.row][this.col-1];
		this.cells[this.row][this.col-1] = temp;
		this.col -= 1;
	} else {
		console.log("slide left has no effect.");
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
	} else {
		console.log("slide right has no effect.");
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
	} else {
		console.log("slide up has no effect.");
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
	} else {
		console.log("slide down has no effect.");
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
};

Board.prototype.print = function() {
	var row, col, rowStr = "";
	for (row in this.cells) {
		for (col in this.cells[row]) {
			rowStr += this.cells[row][col] + ",";
		}
		console.log(rowStr);
		rowStr = "";
	}
};