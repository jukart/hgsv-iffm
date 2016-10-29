angular.module('hgsv-iffm').config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider.state(
      'countdown',
      {
        url: '/countdown',
        templateUrl: 'screens/countdown/index.html',
        controller: [
          '$scope',
          '$interval',
          function($scope, $interval) {
            $scope.count = 180;
            $interval(function() {
              if ($scope.count > 0) {
                $scope.count -= 1;
              }
            },
            1000);
          }
        ]
      }
    );
  }
]);
