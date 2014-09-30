var myApp = angular.module("myApp", ["angular-gestures","ui.bootstrap"]);
// bind controllers
myApp.controller("bodyController", bodyController);
myApp.controller("headerController", headerController);
myApp.controller("mainController", mainController);

// bind filters
myApp.filter("duration", durationFilter);

// bind directives
myApp.directive('ngZeroTile', ["$interval", ngZeroTile]);
myApp.directive('ngTile', ["$interval", ngTile]);


$("#board-container").on('touchmove', function(e) {
	e.preventDefault();
});