var ngMyFade = [function() {
	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			scope.$watch(attrs.ngMyFade, function(newValue, oldValue) {
				if (newValue === true) {
					element.fadeIn();
				} else {
					if (oldValue) {
						element.fadeOut();
					} else {
						element.hide();
					}
				}
			});
		}
	};
}];