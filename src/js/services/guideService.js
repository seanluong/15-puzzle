var guideService = ["$modal", function($modal) {
	return function() {
		var modalInstance = $modal.open({
			templateUrl: 'template/guide.html',
			controller: guideModalInstanceCtrl,
			size: "sm"
		});
		return modalInstance;
	};
}];