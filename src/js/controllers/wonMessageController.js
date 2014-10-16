var wonMessageController = ["$scope",
	function ($scope) {
		$scope.show = false;

		$scope.$on("new-game", function() {
			$scope.show = false;
			// $("#won-message").fadeOut();
		});

		$scope.$on("game-won", function() {
			$scope.show = true;
			// $("#won-message").fadeIn();
		});
	}
];