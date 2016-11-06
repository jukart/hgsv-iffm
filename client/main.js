var app = angular.module(
  'hgsv-iffm',
  ['ui.router',
   'angular-websocket',
   'ngRedux',
   'sprintf'
  ]);

app.config(
  [
    '$ngReduxProvider',
    function($ngReduxProvider) {
      $ngReduxProvider.createStoreWith(
        {
          topics: 'backendControlReducer'
        }
      );
    }
  ]
);

app.run([
  'backend',
  function(backend) {
    backend.connect('192.168.1.22:1880', '/ws');
  }]
);
