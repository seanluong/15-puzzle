window.fbAsyncInit = function() {
    FB.init({
      appId      : '776055202450751',
      xfbml      : true,
      version    : 'v2.1'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

var myApp = angular.module("myApp", ["angular-gestures","ui.bootstrap","djds4rce.angular-socialshare"]);
myApp.controller("bodyController", bodyController);
myApp.controller("headerController", headerController);
myApp.controller("mainController", mainController);
myApp.filter("duration", durationFilter);
myApp.directive('ngZeroTile', ["$interval", ngZeroTile]);
myApp.directive('ngTile', ["$interval", ngTile]);
myApp.run(function($FB){
  $FB.init('776055202450751');
});
$("#board-container").on('touchmove', function(e) {
	e.preventDefault();
});