var app = angular.module('hgsv-iffm');

app.config([
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
          '$ngRedux',
          function($scope, $state, $ngRedux) {
            $scope.goto = function(state) {
              $state.go(state);
            };
            var mapState = function(state) {
              return _.get(state, 'topics.wifi', {});
            };
            $scope.state = {};
            var unsubscribe = $ngRedux.connect(mapState, {})($scope.state);
            $scope.$on('$destroy', unsubscribe);
          }
        ]
      }
    );
  }
]);
