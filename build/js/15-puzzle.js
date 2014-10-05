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
		// this.shuffle();
	}
};

Board.prototype.getLeft = function() {
	if (this.col <= 0) {
		return null;
	} else {
		return {
			myTile: {
				drow:0, dcol:1
			},
			zeroTile: {
				drow:0, dcol:-1
			},
			row: this.row, col: this.col-1
		};
	}
};

Board.prototype.getRight = function() {
	if (this.col >= 3) {
		return null;
	} else {
		return {
			myTile: {
				drow:0, dcol:-1
			},
			zeroTile: {
				drow:0, dcol:1
			},
			row: this.row, col: this.col+1
		};
	}
};

Board.prototype.getUp = function() {
	if (this.row <= 0) {
		return null;
	} else {
		return {
			myTile: {
				drow:+1, dcol:0
			},
			zeroTile: {
				drow:-1, dcol:0
			},
			row: this.row-1, col: this.col
		};
	}
};

Board.prototype.getDown = function() {
	if (this.row >= 3) {
		return null;
	} else {
		return {
			myTile: {
				drow:-1, dcol:0
			},
			zeroTile: {
				drow:+1, dcol:0
			},
			row: this.row+1, col: this.col
		};
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
};
var bodyController = ["$scope", "keyboardMapService",
	function($scope, keyboardMapService) {

		$scope.handleKeyDown = function(event) {
			var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey,
				direction = keyboardMapService(event.which),
				duration = 75,
				data;
	        if (!modifiers && direction) {
	    		event.preventDefault();
	    		data = {
					direction: direction,
					duration: duration
				};
				$scope.$broadcast("keydown", data);
	        }
	        return data;
		};
	}
];
var headerController = ["$scope", "guideService", "localStorageService",
	function($scope, guideService, localStorageService) {
		$scope.timePassed =  localStorageService.getTimePassed();
		$scope.bestTime = localStorageService.getBestTime();

		$scope.$on("new-game", function() {
			$scope.timePassed = 0;
			$scope.bestTime = localStorageService.getBestTime();
		});

		$scope.$on("game-won", function() {
			localStorageService.updateBestTime($scope.timePassed);
		});

		$scope.newGame = function() {
			$scope.$parent.$broadcast("new-game");
		};

		$scope.guide = function() {
			guideService($scope.$parent);
			$scope.$parent.$broadcast("pause");		
		};
	}
];
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
					duration: duration,
					movedTile: movedTile,
					value: value
				});
				if ($scope.board.won() === true) {
					$scope.$parent.$broadcast("game-won");
					$scope.$broadcast("pause");
					gameWonService($scope.$parent);
				} else {
					// localStorage.setItem("board", JSON.stringify($scope.board));
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
var guideModalInstanceCtrl = function($scope, $modalInstance) {
	$scope.ok = function() {
		$modalInstance.dismiss("done");
	};
};

var gameWonModalInstanceCtrl = function ($scope, $modalInstance) {
	$scope.ok = function() {
		$modalInstance.close({});
	};
};
var myControllers = angular.module("myControllers", []).
controller("bodyController", bodyController).
controller("headerController", headerController).
controller("mainController", mainController);
var durationFilter = function() {

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
};
var myFilters = angular.module("myFilters", []).
filter("duration", durationFilter);
var ngClock = ["$interval", "localStorageService", 
  function($interval, localStorageService) {

    function link(scope, element, attrs) {
      var timeoutId;
      element.on('$destroy', function() {
        $interval.cancel(timeoutId);
      });
      timeoutId = $interval(function() {
        scope.timePassed += 1;
        localStorageService.setTimePassed(scope.timePassed);
      }, 1000);
    }

    return {
      restrict: "A",
      link: link,
      template: "{{timePassed | duration}}"
    };
  }
];


var ngFacebook = function() {
	return {
      	restrict: 'E',
		templateUrl: "template/facebook.html"
	};
};
var ngGPlus = function() {
	return {
      	restrict: 'E',
		templateUrl: "template/gplus.html"
	};
};
var ngTile = function() {

	return function (scope, element, attrs) {
		var size = 116,
			margin = 4,
			gap = size + margin;

		function findCoor(cells, value) {
			var row, col;
			for (row in [0,1,2,3]) {
				for (col in [0,1,2,3]) {
					if (cells[row][col] === value) {
						return {
							y: row * gap,
							x: col * gap
						};
					}
				}
			}
		}

		element.on("init", function() {
			var value = parseInt(element.text()) || 0,
				coor = findCoor(scope.board.cells, value),
				y = coor.y,
				x = coor.x;
			element.css({
				"left": x + "px",
				"top": y + "px"
			});
			if (value !== 0) {
				element.attr({
					"class":"tile my-tile"
				});
				element.text(value);
			}
		});

		element.on("move", function(event, args) {
			var value = parseInt(element.text()) || 0,
				y, x, coor;
			if (args.movedTile) {
				if (args.value === value) {
					coor = findCoor(scope.board.cells, 0);
					y = args.movedTile.myTile.drow * gap + coor.y;
					x = args.movedTile.myTile.dcol * gap + coor.x;
					element.animate({
						"left": x + "px",
						"top": y + "px"
					}, args.duration);
				}
			}
		});
	};

};
var ngTwitter = function() {
	return {
      	restrict: 'E',
		templateUrl: "template/twitter.html"
	};
};
var myDirectives = angular.module("myDirectives", []).
directive("ngTile", ngTile).
directive("ngClock", ngClock).
directive("ngFacebook", ngFacebook).
directive("ngTwitter", ngTwitter).
directive("ngGPlus", ngGPlus);
var gameWonService = ["$modal", function($modal) {
	return function($scope) {
		var modalInstance = $modal.open({
			templateUrl: 'template/won.html',
			scope: $scope,
			controller: gameWonModalInstanceCtrl,
		});
		modalInstance.result.then(function () {
			$scope.$broadcast("new-game");
		}, function() {
			$scope.$broadcast("new-game");
		});
	};	
}];
var guideService = ["$modal", function($modal) {

	return function($scope) {
		var modalInstance = $modal.open({
			templateUrl: 'template/guide.html',
			controller: guideModalInstanceCtrl,
			size: "sm"
		});
		modalInstance.result.then(function () {
			$scope.$broadcast("resume");
		}, function() {
			$scope.$broadcast("resume");
		});
	};
}];
var keyboardMapService = [	function() {
	var key2dir = {
		38: "up",
		40: "down",
		37: "left",
		39: "right",
		87: "down",// w
		65: "right",// a
		83: "up",// s
		68: "left"// d
	};
	return function(whichKey) {
		return key2dir[whichKey];
	};
}];
var localStorageService = [	function() {

	var getBestTime = function() {
			return parseInt(localStorage.getItem("bestTime")) || null;
		},
		setBestTime = function(timePassed) {
			localStorage.setItem("bestTime", timePassed);
		},
		setTimePassed = function(timePassed) {
			localStorage.setItem("timePassed", timePassed);	
		};
	
	return {
		getBestTime: getBestTime,
		setBestTime: setBestTime,
		setTimePassed: setTimePassed,
		getBoard: function() {
			return JSON.parse(localStorage.getItem("board"));
		},
		setBoard: function(board) {
			return localStorage.setItem("board", JSON.stringify(board));
		},
		getTimePassed: function() {
			return parseInt(localStorage.getItem("timePassed")) || 0;
		},
		updateBestTime: function(timePassed) {
			var bestTime = getBestTime();
			if (!bestTime || timePassed < bestTime) {
				setBestTime(timePassed);
			}
		}
	};
}];
var myServices = angular.module("myServices", []).
factory("keyboardMapService", keyboardMapService).
factory("localStorageService", localStorageService).
factory("guideService", guideService).
factory("gameWonService", gameWonService);
var myApp = angular.module("myApp", [
	"angular-gestures","ui.bootstrap",
	"myControllers",
	"myFilters",
	"myDirectives",
	"myServices"
]).
run(function() {
	$(function() {
		$("#board-container").on("touchmove", function(e) {
			e.preventDefault();
		});
		$(".tile").trigger("init");
	});
});