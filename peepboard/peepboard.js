// esversion: 6
var fs = require('fs');

var Peepboard = (function() {
    var confPath = '',
        conf = {},
        dashboards = [];

    var getConf = function(path) {
      if (path) this.confPath = path;
      this.conf = JSON.parse(fs.readFileSync(this.confPath, 'utf8'));
    };

    var readConf = function(t, n) {
      var path = this.conf.base_path + "/" + t + "/" + n + '.json';
      return JSON.parse(fs.readFileSync(path));
    };

    var getDashboards = function() {
      this.dashboards = [];
      for (var dashboardKey of this.conf.dashboards) {
        var dashboard = this.readConf('dashboards', dashboardKey);
        this.dashboards.push(dashboard);
      }
    };

    var reloadConf = function() {
      getConf();
      getDashboards();
    };

    return {
      'conf': conf,
      'confPath': confPath,
      'dashboards': dashboards,
      'getConf': getConf,
      'readConf': readConf,
      'getDashboards': getDashboards
    };
});


module.exports = Peepboard()
