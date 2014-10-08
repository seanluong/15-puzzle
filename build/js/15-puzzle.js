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
		this.row = 3;
		this.col = 3;
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

Board.prototype.getValue = function(delta) {
	var nrow = this.row + delta.drow,
		ncol = this.col + delta.dcol,
		temp;
	if (nrow >=0 && nrow <= 3 && ncol >=0 && ncol <= 3) {
		return this.cells[nrow][ncol];
	}
	return null;
};

Board.prototype.shuffle = function(nsteps) {
	var step = nsteps || 100,
		drs = [0,0,-1,1],
		dcs = [1,-1,0,0],
		idx;
	while (step > 0) {
		idx = parseInt(Math.random() * 4);
		this.slide({
			drow: drs[idx],
			dcol: dcs[idx]
		});
		step--;
	}
};

Board.prototype.slide = function(delta) {
	var nrow = this.row + delta.drow,
		ncol = this.col + delta.dcol,
		temp;
	if (nrow >=0 && nrow <= 3 && ncol >=0 && ncol <= 3) {
		temp = this.cells[this.row][this.col];
		this.cells[this.row][this.col] = this.cells[nrow][ncol];
		this.cells[nrow][ncol] = temp;
		this.row = nrow;
		this.col = ncol;
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
			var guideModalInstance = guideService();
			guideModalInstance.result.then(function () {
				$scope.$parent.$broadcast("resume");
			}, function() {
				$scope.$parent.$broadcast("resume");
			});
			$scope.$parent.$broadcast("pause");		
		};
	}
];
var mainController = ["$scope", "$document", "gameWonService", "localStorageService", "directionService",
	function($scope, $document, gameWonService, localStorageService, directionService) {
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
						var gameWonModalInstance = gameWonService();
						gameWonModalInstance.result.then(function () {
							$scope.$parent.$broadcast("new-game");
						}, function() {
							$scope.$parent.$broadcast("new-game");
						});
					} else {
						localStorageService.setBoard($scope.board);
					}
				}
			}
		}

		$scope.$on("new-game", function() {
			$scope.board = new Board();
			localStorageService.setBoard($scope.board);
			$document.find(".tile").trigger("init");
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
		var size = 11.6,
			margin = 0.4,
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
				"left": x + "rem",
				"top": y + "rem"
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
			if (args.movedTiledValue) {
				if (args.movedTiledValue === value) {
					coor = findCoor(scope.board.cells, 0);
					y = args.drow * gap + coor.y;
					x = args.dcol * gap + coor.x;
					element.animate({
						"left": x + "rem",
						"top": y + "rem"
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
var directionService = [ function() {
	return {
		getDelta: function(direction) {
			var delta = {};
			if (direction === "up") {
				delta.drow = -1;
				delta.dcol = 0;
			} else if (direction === "down") {
				delta.drow = 1;
				delta.dcol = 0;
			} else if (direction === "left") {
				delta.drow = 0;
				delta.dcol = -1;
			} else if (direction === "right") {
				delta.drow = 0;
				delta.dcol = 1;
			} else {
				delta = null;
			}
			return delta;
		},
		getReverse: function(direction) {
			if (direction === "up") {
				return "down";
			} else if (direction === "down") {
				return "up";
			} else if (direction === "left") {
				return "right";
			} else if (direction === "right") {
				return "left";
			} else {
				return null;
			}
		}
	};
}];
var gameWonService = ["$modal", function($modal) {
	return function() {
		var modalInstance = $modal.open({
			templateUrl: 'template/won.html',
			controller: gameWonModalInstanceCtrl,
		});
		return modalInstance;
	};	
}];
var guideService = ["$modal", function($modal) {
	return function() {
		var modalInstance = $modal.open({
			templateUrl: 'template/guide.html',
			controller: guideModalInstanceCtrl,
			size: "sm"
		});
		return modalInstance;
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
			return new Board(JSON.parse(localStorage.getItem("board")));
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
factory("directionService", directionService).
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