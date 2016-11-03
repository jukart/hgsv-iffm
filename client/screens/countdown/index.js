angular.module('hgsv-iffm').config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider.state(
      'countdown',
      {
        url: '/countdown',
        templateUrl: '/screens/countdown/index.html',
        controller: [
          '$scope',
          '$state',
          '$interval',
          function($scope, $state, $interval) {
            $scope.count = 180;

            $interval(function() {
              if ($scope.count > 0) {
                $scope.count -= 1;
              }
            }, 1000);

            $scope.goto = function(state) {
              $state.go(state);
            };
          }
        ]
      }
    );
  }
]);
