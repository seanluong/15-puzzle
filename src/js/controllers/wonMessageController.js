var wonMessageController = ["$scope",
	function ($scope) {
		$scope.show = false;

		$scope.$on("new-game", function() {
			$scope.show = false;
		});

		$scope.$on("game-won", function() {
			$scope.show = true;
		});
	}
];