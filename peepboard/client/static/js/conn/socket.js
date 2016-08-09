define(['util/dom', 'socketio'], function(dom, io) {
  var socket = io('//');

  dom.appendText('loading-message', 'Connecting to server');

  socket.on('connect', function() {
    console.log('[WS] Connected!');
    socket.emit('get', ['dashboards']);
    dom.appendText('loading-message', 'Retrieving dashboards');
  });

  socket.on('dashboards-list', function(dashboards) {
    console.log('[WS] Received dashboards', dashboards);
    dashboards.forEach(function(item) {
      dom.addDashboard(item);
    });
  });

  socket.on('widgets-list', function(widgets){
    console.log('[WS] Received widgets', widgets);
  });


});