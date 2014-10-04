var guideService = ["$modal", function($modal) {

	return function($scope) {
		var modalInstance = $modal.open({
			templateUrl: '/guide.html',
			controller: guideModalInstanceCtrl,
			size: "sm"
		});
		modalInstance.result.then(function () {
			$scope.$broadcast("resume");
		}, function() {
			$scope.$broadcast("resume");
		});
	};
}];