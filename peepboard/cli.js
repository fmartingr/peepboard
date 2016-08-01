var fs = require('fs');
var peepboard = require('./peepboard');
var server = require('./server');

// TODO better argument handling
peepboard.getConf(process.argv[2]);

peepboard.getDashboards();

server.start(peepboard.conf.port);
