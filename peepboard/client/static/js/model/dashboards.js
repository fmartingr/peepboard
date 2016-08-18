define(['util/dom'], function($dom) {
  var dashboards = {},
      state = {
        'actual': null,
        'interval': null
      };
  return {
    dashboards: dashboards,
    state: state,
    register: function(dashboard, data) {
      console.info('[DASHBOARD]', 'Registered:', dashboard);
      if (this.dashboards[dashboard] === undefined)
        this.dashboards[dashboard] = {};
      this.dashboards[dashboard].id = dashboard;
      if (data) this.dashboards[dashboard].data = data;
      this.appendDashboardToDOM(dashboard);
      // Show first dashboard
      if (Object.keys(this.dashboards).length === 1) {
        $dom.showDashboard(this.dashboards[dashboard].element);
        this.state.actual = dashboard;
      }
    },
    appendDashboardToDOM: function(dashboardID) {
      var dash = this.dashboards[dashboardID];
      dash.element = document.createElement('dashboard-' + dash.data.type);
      dash.element.setAttribute('dashboardType', dash.data.type);
      dash.element.setAttribute('data', JSON.stringify(dash.data));
      dash.element.setAttribute('dashboardID', dash.id);
      $dom.appendDashboard(dash.element);
    },
    goToNext: function() {
      var dashboardKeys = Object.keys(this.dashboards),
          actualIndex = dashboardKeys.indexOf(this.state.actual),
          nextIndex = actualIndex + 1,
          nextDashboard = dashboardKeys[nextIndex];

      if (nextDashboard === undefined) nextDashboard = dashboardKeys[0];

      $dom.hideDashboard(this.dashboards[this.state.actual].element);
      this.state.actual = nextDashboard;
      $dom.showDashboard(this.dashboards[this.state.actual].element);
    },
    start: function() {
      var delay = 5; // Just for testing! TODO get from config
      var _this = this;
      if (this.dashboards.length === 1) return; // Just one board?
      this.state.interval = setInterval(function() {
        _this.goToNext();
      }, this.delay*1000);
    }
  };
});
