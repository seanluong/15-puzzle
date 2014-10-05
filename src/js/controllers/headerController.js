var headerController = ["$scope", "$interval", "guideService", "localStorageService",
	function($scope, $interval, guideService, localStorageService) {
		$scope.timePassed =  localStorageService.getTimePassed();
		$scope.bestTime = localStorageService.getBestTime();

		var timeoutId = $interval(function() {
			$scope.timePassed += 1;
			localStorageService.setTimePassed($scope.timePassed);
		},1000,0,true);

		$scope.$on("$destroy", function() {
			$interval.cancel(timeoutId);
		});

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