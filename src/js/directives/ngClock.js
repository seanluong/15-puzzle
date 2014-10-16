var ngClock = ["$interval", "localStorageService", 
  function($interval, localStorageService) {
    function link(scope, element, attrs) {
      var timeoutId, delta = 1;
      element.on('$destroy', function() {
        $interval.cancel(timeoutId);
      });

      timeoutId = $interval(function() {
        scope.timePassed += delta;
        if (delta > 0) {
          localStorageService.setTimePassed(scope.timePassed);
        }
      }, 1000);

      scope.$watch(attrs.stop, function(stopClock) {
        console.log(stopClock);
        if (stopClock) {
          delta = 0;
        } else {
          delta = 1;
        }
      });
    }

    return {
      restrict: "A",
      link: link,
      template: "{{timePassed | duration}}"
    };
  }
];

