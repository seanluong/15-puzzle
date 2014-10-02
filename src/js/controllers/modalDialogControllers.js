var guideModalInstanceCtrl = function($scope, $modalInstance) {
	$scope.ok = function() {
		$modalInstance.dismiss("done");
	};
};

var gameWonModalInstanceCtrl = function ($scope, $modalInstance) {
	$scope.ok = function() {
		$modalInstance.close({});
	};
};