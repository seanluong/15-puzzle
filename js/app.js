var board = new Board();

angular.module("myApp", []).
controller("gameController", function($scope) {
	$scope.cells = board.getCells();
});