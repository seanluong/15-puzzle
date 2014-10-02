var keyboardMapService = [	function() {
	var key2dir = {
		38: "up",
		40: "down",
		37: "left",
		39: "right",
		87: "down",// w
		65: "right",// a
		83: "up",// s
		68: "left"// d
	};
	return function(whichKey) {
		return key2dir[whichKey];
	};
}];