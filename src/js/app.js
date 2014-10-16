var myApp = angular.module("myApp", [
	"angular-gestures",
	"social",
	"animation",
	"myControllers",
	"myFilters",
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