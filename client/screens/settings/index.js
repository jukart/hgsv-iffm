var app = angular.module('hgsv-iffm');

app.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider.state(
      'settings',
      {
        url: '/settings',
        templateUrl: '/screens/settings/index.html',
        controller: [
          '$scope',
          '$state',
          '$interval',
          '$ngRedux',
          'backend',
          function($scope, $state, $interval, $ngRedux, backend) {
            $scope.goto = function(state) {
              $state.go(state);
            };
            var mapState = function(state) {
              return _.get(state, 'topics.system', {});
            };
            $scope.state = {};
            var unsubscribe = $ngRedux.connect(mapState, {})($scope.state);

            var refresher = $interval(function() {
              backend.send('wifi/scan', {});
            }, 5000);

            backend.send('wifi/scan', {});

            $scope.$on('$destroy', function() {
              unsubscribe();
              $interval.cancel(refresher);
            });
          }
        ]
      }
    );
  }
]);
