var gameWonService = ["$modal", function($modal) {
	return function($scope) {
		var modalInstance = $modal.open({
			templateUrl: 'template/won.html',
			scope: $scope,
			controller: gameWonModalInstanceCtrl,
		});
		modalInstance.result.then(function () {
			$scope.$broadcast("new-game");
		}, function() {
			$scope.$broadcast("new-game");
		});
	};	
}];