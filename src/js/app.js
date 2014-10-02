var myApp = angular.module("myApp", ["angular-gestures","ui.bootstrap","djds4rce.angular-socialshare"]);
myApp.controller("bodyController", bodyController);
myApp.controller("headerController", headerController);
myApp.controller("mainController", mainController);
myApp.filter("duration", durationFilter);
myApp.directive('ngTile', ["$interval", ngTile]);
myApp.run(function() {
	$("#board-container").on('touchmove', function(e) {
		e.preventDefault();
	});
});