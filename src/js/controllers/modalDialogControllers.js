var guideModalInstanceCtrl = function($scope, $modalInstance) {
	$scope.ok = function() {
		$modalInstance.dismiss("done");
	};
};