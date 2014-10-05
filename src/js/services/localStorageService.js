var localStorageService = ["$interval",	function($interval) {

	var getBestTime = function() {
			return parseInt(localStorage.getItem("bestTime")) || null;
		},
		setBestTime = function(timePassed) {
			localStorage.setItem("bestTime", timePassed);
		},
		setTimePassed = function(timePassed) {
			localStorage.setItem("timePassed", timePassed);	
		};
	
	return {
		getBestTime: getBestTime,
		setBestTime: setBestTime,
		setTimePassed: setTimePassed,
		getTimePassed: function() {
			return parseInt(localStorage.getItem("timePassed")) || 0;
		},
		updateBestTime: function(timePassed) {
			var bestTime = getBestTime();
			if (!bestTime || timePassed < bestTime) {
				setBestTime(timePassed);
			}
		}
	};
}];