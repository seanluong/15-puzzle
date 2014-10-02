var bodyController = ["$scope", "guideService", "gameWonService", "keyboardMapService",
	function($scope, guideService, gameWonService, keyboardMapService) {

		$scope.handleKeyDown = function(event) {
			var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey,
				direction = keyboardMapService(event.which),
				duration = 75;
	        if (!modifiers && direction) {
	    		event.preventDefault();
				$scope.$broadcast("keydown", {
					direction: direction,
					duration: duration
				});
	        }
		};

		$scope.guide = function() {
			guideService($scope);
			$scope.$broadcast("pause");
			
		};

		$scope.$on("game-won", function(event) {
			gameWonService($scope);
			$scope.$broadcast("pause");
		});
	}
];