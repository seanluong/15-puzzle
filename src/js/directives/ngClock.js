var ngClock = ["$interval", "localStorageService", 
  function($interval, localStorageService) {

    function link(scope, element, attrs) {
      var timeoutId;
      element.on('$destroy', function() {
        $interval.cancel(timeoutId);
      });
      timeoutId = $interval(function() {
        scope.timePassed += 1;
        localStorageService.setTimePassed(scope.timePassed);
      }, 1000);
    }

    return {
      restrict: "A",
      link: link,
      template: "{{timePassed | duration}}"
    };
  }
];

