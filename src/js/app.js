var myApp = angular.module("myApp", [
	"angular-gestures","ui.bootstrap","djds4rce.angular-socialshare"
]).
factory("guideService", guideService).
factory("gameWonService", gameWonService).
factory("keyboardMapService", keyboardMapService).
controller("bodyController", bodyController).
controller("headerController", headerController).
controller("mainController", mainController).
filter("duration", durationFilter).
directive("ngTile", ngTile).
run(function() {
	$(function() {
		$("#board-container").on("touchmove", function(e) {
			e.preventDefault();
		});
		$(".tile").trigger("init");
	});
});