var bodyController = function($scope, $modal, $document) {
	var key2dir = {
		38: "up",
		40: "down",
		37: "left",
		39: "right"
	};

	$document.ready(function() {
		$document.find(".tile").trigger("init");
	});

	$scope.handleKeyDown = function(event) {
		var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
        if (!modifiers && key2dir[event.which]) {
    		event.preventDefault();
			$scope.$broadcast("keydown", {
				direction: key2dir[event.which],
				duration: 75
			});
        }
	};

	$scope.guide = function() {
		var modalInstance = $modal.open({
			templateUrl: 'template/guide.html',
			controller: GuideModalInstanceCtrl,
			size: "sm"
		});
		$scope.$broadcast("pause");
		modalInstance.result.then(function () {
			$scope.$broadcast("resume");
		}, function() {
			$scope.$broadcast("resume");
		});
	};

	$scope.$on("game-won", function(event) {
		var modalInstance = $modal.open({
			templateUrl: 'template/won.html',
			scope: $scope,
			controller: GameWonModalInstanceCtrl,
		});
		$scope.$broadcast("pause");
		modalInstance.result.then(function () {
			$scope.$broadcast("new-game");
		}, function() {
			$scope.$broadcast("new-game");
		});
	});
};