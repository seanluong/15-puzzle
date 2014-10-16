var myApp = angular.module("myApp", [
	"angular-gestures",
	"social",
	"timeFormat",
	"keyboardInput",
	"wonMessage",
	"main"
]).
run(function() {
	$(function() {
		$("#board-container").on("touchmove", function(e) {
			e.preventDefault();
		});
	});
});