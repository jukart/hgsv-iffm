var app = angular.module('hgsv-iffm');

app.factory('backend', [
  '$websocket',
  '$location',
  '$ngRedux',
  'backendControlActions',
  function($websocket, $location, $ngRedux, backendControlActions) {

    var dataStream = null;
    var backend = {};

    var connect = function(host, path) {
      // Open a WebSocket connection
      if (dataStream !== null) {
        return dataStream;
      }
      dataStream = $websocket('ws://' + host + path);
     
      dataStream.onOpen(function() {
        console.log('Connection to backend opened');
      });
      dataStream.onClose(function() {
        console.log('Connection to backend closed');
      });
      dataStream.onError(function() {
        console.log('Websocket error');
      });
      dataStream.onMessage(function(message) {
        console.log('received:', message.data);
        var data = JSON.parse(message.data);
        backend.topicReceived(data.topic, data.payload);
      });

      var mapState = function(state) {
        return {
          booting: state === undefined
        };
      };
      var unsubscribe = $ngRedux.connect(mapState,
                                         backendControlActions
                                        )(backend);
      send('main/fullReload', '');

      return dataStream;
    };

    var send = function(topic, payload) {
      msg = {
        topic: topic,
        payload: payload
      };
      console.log('sending:', msg);
      dataStream.send(msg);
    };

    return {
      connect: connect,
      send: send
    };
  }]
);

app.factory(
  'backendControlReducer',
  [
    function(backend) {
      return function(state, action) {
        switch (action.type) {
          case 'topicReceived':
            var result = {};
            var path = action.topic.replace(/\//g, '.');
            _.set(result, path, action.payload);
            return result;
          default:
            return state || {};
        }
      };
    }
  ]
);

app.factory(
  'backendControlActions',
  function() {
    return {
      topicReceived: function(topic, payload) {
        return {
          type: 'topicReceived',
          topic: topic,
          payload: payload
        };
      }
    };
  }
);
