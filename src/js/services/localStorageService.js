var localStorageService = [	function() {

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
		getBoard: function() {
			return new Board(JSON.parse(localStorage.getItem("board")));
		},
		setBoard: function(board) {
			return localStorage.setItem("board", JSON.stringify(board));
		},
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