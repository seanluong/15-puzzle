var headerController = ["$scope", "$interval", "$timeout", function($scope, $interval, $timeout) {
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
}];