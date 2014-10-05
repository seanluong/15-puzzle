var gameWonService = ["$modal", function($modal) {
	return function() {
		var modalInstance = $modal.open({
			templateUrl: 'template/won.html',
			controller: gameWonModalInstanceCtrl,
		});
		return modalInstance;
	};	
}];