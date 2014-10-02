var keyboardMapService = [	function() {
	var key2dir = {
		38: "up",
		40: "down",
		37: "left",
		39: "right"
	};
	return function(whichKey) {
		return key2dir[whichKey];
	};
}];