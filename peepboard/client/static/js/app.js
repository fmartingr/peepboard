require.config({
  shim: {
    'socketio': {
      exports: 'io'
    }
  },
  paths: {
    'socketio': '/socket.io/socket.io.js'
  }
});

requirejs(['app/main']);
