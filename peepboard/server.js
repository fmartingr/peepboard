var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var sass = require('node-sass');
var uglify = require('uglify-js');

var peepboard = require('./peepboard');

var Server = (function(){
  var baseContext = {
    'brandingLogo': 'http://cdn.fmartingr.com.s3-eu-west-1.amazonaws.com/github/peepboard/peepboard-logo.png'
  }

  var clients = [];

  // Get templates from apropiate directory
  app.set('views', __dirname + '/client/templates');

  // Global context
  app.locals.branding = {
    logo: baseContext.brandingLogo
  }

  // Log regquests
  app.use(function (req, res, next) {
    var logFn = console.warn
    if (res.statusCode >= 200 && res.statusCode < 300) {
      logFn = console.info
    }
    logFn('[', req.method, ']', req.path, res.statusCode);
    next();
  });

  // Serve static files
  app.use('/static', express.static(__dirname + '/client/static'));

  // Compile sass
  app.get('/static/css', function(req, res) {
    var result = sass.render({
      file: __dirname + '/client/static/sass/main.sass'
    }, function(error, result) {
      if (!error) {
        res.header("Content-type", "text/css");
        res.end(result.css);
      } else {
        res.status(500).end();
      }
    });
  })

  // Compile own javascript
  app.get('/static/js', function(req, res) {
    var js = function(file) { return __dirname + '/client/static/js/' + file; }
    var result = uglify.minify([
      js('observe.js')
    ]);
    res.header('Content-type', 'script/javascript');
    res.end(result.code);
  })

  // Main view
  app.get('/', function (req, res) {
    res.render('main.jade');
  });

  // Starts the server
  var start = function(port) {
    server.listen(port || 8000, function () {
      console.info('[ HTTP ] Listening on port ', (port || 8000));
    });
  }

  // SocketIO
  io.on('connection', function (client) {
    console.info('[ Socket.io ] New client:', client.id);
    clients[client.id] = client;

    client.on('dashboards', function(data) {
      client.emit('dashboards', peepboard.dashboards)
    });

    client.on('disconnect', function() {
      console.info('[ Socket.io ] Client', client.id, 'disconnected.')
      delete clients[client.id];
    })
  });

  return {
    'start': start
  }
})

module.exports = Server()
