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