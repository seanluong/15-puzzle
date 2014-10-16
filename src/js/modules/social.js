var social = angular.module("social", []).
directive("ngFacebook", function() {
	return {
      	restrict: 'E',
		templateUrl: "template/facebook.html"
	};
}).
directive("ngTwitter", function() {
	return {
      	restrict: 'E',
		templateUrl: "template/twitter.html"
	};
}).
directive("ngGPlus", function() {
	return {
      	restrict: 'E',
		templateUrl: "template/gplus.html"
	};
});