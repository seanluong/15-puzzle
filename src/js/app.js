var myApp = angular.module("myApp", [
	"angular-gestures",
	"social",
	"filters",
	"keyboardInput",
	"wonMessage",
	"showTarget",
	"myControllers",
	"myDirectives",
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