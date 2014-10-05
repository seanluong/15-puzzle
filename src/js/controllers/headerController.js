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