angular.module('hgsv-iffm').config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider.state(
      'main',
      {
        url: '/',
        templateUrl: 'screens/main/index.html'
      }
    );
  }
]);
