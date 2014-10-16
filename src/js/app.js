var myApp = angular.module("myApp", [
	"angular-gestures",
	"social",
	"animation",
	"filters",
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