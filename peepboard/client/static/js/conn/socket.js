define(['model/widgets', 'model/dashboards', 'util/dom', 'socketio'], function($widgets, $dashboards, $dom, io) {
  var socket = io('//');

  var getDashboards = function(socket) {
    if (!socket) var socket = this.socket; // TODO fix this
    socket.emit('get', ['dashboards']);
  };

  var getWidget = function(widgetID) {
    this.socket.emit('get-widget', widgetID);
  };

  socket.on('connect', function() {
    console.log('[WS] Connected!');
    getDashboards(socket);
  });

  socket.on('dashboards', function(dashboards) {
    console.log('[WS] Received dashboards', dashboards);
    for (var dashID in dashboards) {
      console.log(dashID, dashboards[dashID]);
      $dashboards.register(dashID, dashboards[dashID]);
    }
    $dom.hideLoading();
    $dashboards.start();
 });

  socket.on('widget', function(widget) {
    console.info('[WS]', 'Received widget', widget.widgetID);
    $widgets.register(widget);
  });

  return {
    socket: socket,
    getDashboards: getDashboards,
    getWidget: getWidget
  };
});