var app = angular.module('hgsv-iffm', ['ui.router', 'sprintf']);

app.controller(
  'MainController',
  [
    function () {
      var main = this;
      this.loaded = true;
    }
  ]
);
