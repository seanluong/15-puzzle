var myApp = angular.module("myApp", ["angular-gestures","ui.bootstrap","djds4rce.angular-socialshare"]);
myApp.config(function($locationProvider){
    $locationProvider.html5Mode(true).hashPrefix('!');
});
myApp.controller("myController", myController);
myApp.filter("duration", durationFilter);
myApp.directive('ngZeroTile', ["$interval", ngZeroTile]);