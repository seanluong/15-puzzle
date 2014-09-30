var myApp = angular.module("myApp", ["angular-gestures","ui.bootstrap"]);
myApp.controller("myController", myController);
myApp.filter("duration", durationFilter);
myApp.directive('ngZeroTile', ["$interval", ngZeroTile]);
$(document).bind('touchmove', function(e) {
		// e.preventDefault();
});