var myApp = angular.module("myApp", ["ngAnimate", 'ui.bootstrap']);
myApp.controller("myController", myController);
myApp.filter("duration", durationFilter);
myApp.directive('ngZeroTile', ["$interval", ngZeroTile]);