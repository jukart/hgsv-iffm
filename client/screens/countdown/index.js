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
          'backend',
          function($scope, $state, $interval, backend) {
            $scope.count = 180;

            $interval(function() {
              if ($scope.count > 0) {
                $scope.count -= 1;
              }
            }, 1000);

            $scope.goto = function(state) {
              if ($scope.count > 0) {
                backend.send(
                  'motor/count/stop',
                  {
                    'at': $scope.count
                  }
                );
              }
              $state.go(state);
            };

            backend.send('motor/count/start', {});
          }
        ]
      }
    );
  }
]);
