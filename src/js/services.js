var myServices = angular.module("myServices", []).
factory("keyboardMapService", keyboardMapService).
factory("localStorageService", localStorageService).
factory("guideService", guideService).
factory("directionService", directionService).
factory("gameWonService", gameWonService);