var showTargetController = ["$scope",
	function ($scope) {
		$scope.show = false;

		$scope.resume = function() {
			$scope.show = false;
			$scope.$parent.$broadcast("resume");
		};

		$scope.$on("pause", function() {
			$scope.show = true;
		});

		$scope.$on("new-game", function() {
			$scope.show = false;
		});
	}
];