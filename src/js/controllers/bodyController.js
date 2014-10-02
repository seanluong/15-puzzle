var bodyController = ["$scope", "guideService", "gameWonService",
	function($scope, guideService, gameWonService) {
		var key2dir = {
			38: "up",
			40: "down",
			37: "left",
			39: "right"
		};

		$scope.handleKeyDown = function(event) {
			var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
	        if (!modifiers && key2dir[event.which]) {
	    		event.preventDefault();
				$scope.$broadcast("keydown", {
					direction: key2dir[event.which],
					duration: 75
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