define([
  'socketio',
  'util/dom',
  'model/dashboard',
  'model/widget'
], function (io, dom, dashboard, widget, require) {
  // Main app loader
  var socket = io('//');
  dom.appendText('loading-message', 'Connecting to server.');

  dom.appendText('loading-message', 'Retrieving dashboard data');

  socket.on('connect', function(socket) {

  });

  socket.emit('dashboards');
  socket.on('dashboards', function(dashboards){
    console.log(dashboards);
  })
});
