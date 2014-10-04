var bodyController = ["$scope", "keyboardMapService",
	function($scope, keyboardMapService) {

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
	}
];