var headerController = ["$scope", "localStorageService",
	function($scope, localStorageService) {
		$scope.timePassed =  localStorageService.getTimePassed();
		$scope.bestTime = localStorageService.getBestTime();
		$scope.stopClock = false;

		$scope.$on("new-game", function() {
			$scope.timePassed = 0;
			$scope.bestTime = localStorageService.getBestTime();
			$scope.stopClock = false;
		});

		$scope.$on("game-won", function() {
			localStorageService.updateBestTime($scope.timePassed);
			localStorageService.setTimePassed(0);
			$scope.stopClock = true;
		});

		$scope.newGame = function() {
			$scope.$parent.$broadcast("new-game");
		};

		$scope.guide = function() {
			$scope.$parent.$broadcast("pause");
		};
	}
];