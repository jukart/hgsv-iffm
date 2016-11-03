angular.module('hgsv-iffm').config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider.state(
      'main',
      {
        url: '/',
        templateUrl: '/screens/main/index.html',
        controller: [
          '$scope',
          '$state',
          function($scope, $state) {
            $scope.goto = function(state) {
              $state.go(state);
            };
          }
        ]
      }
    );
  }
]);
