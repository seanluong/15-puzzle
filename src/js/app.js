var myApp = angular.module("myApp", [
	"angular-gestures",
	"social",
	"timeFormat",
	"keyboardInput",
	"wonMessage",
	"showTarget",
	"directives",
	"myControllers",
	"myServices"
]).
run(function() {
	$(function() {
		$("#board-container").on("touchmove", function(e) {
			e.preventDefault();
		});
		$(".tile").trigger("init");
	});
});