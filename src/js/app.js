var myApp = angular.module("myApp", ["angular-gestures","ui.bootstrap","djds4rce.angular-socialshare"]);
myApp.controller("bodyController", ["$scope", "$modal", "$document", bodyController]);
myApp.controller("headerController", ["$scope", "$interval", "$timeout", "$modal", headerController]);
myApp.controller("mainController", ["$scope", "$document", "$timeout", mainController]);
myApp.filter("duration", durationFilter);
myApp.directive('ngTile', ["$interval", ngTile]);
myApp.run(function() {
	$("#board-container").on('touchmove', function(e) {
		e.preventDefault();
	});
});