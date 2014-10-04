var myApp = angular.module("myApp", [
	"angular-gestures","ui.bootstrap","djds4rce.angular-socialshare",
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