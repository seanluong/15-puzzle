var directionService = [ function() {
	return {
		getDelta: function(direction) {
			var delta = {};
			if (direction === "up") {
				delta.drow = -1;
				delta.dcol = 0;
			} else if (direction === "down") {
				delta.drow = 1;
				delta.dcol = 0;
			} else if (direction === "left") {
				delta.drow = 0;
				delta.dcol = -1;
			} else if (direction === "right") {
				delta.drow = 0;
				delta.dcol = 1;
			} else {
				delta = null;
			}
			return delta;
		},
		getReverse: function(direction) {
			if (direction === "up") {
				return "down";
			} else if (direction === "down") {
				return "up";
			} else if (direction === "left") {
				return "right";
			} else if (direction === "right") {
				return "left";
			} else {
				return null;
			}
		}
	};
}];