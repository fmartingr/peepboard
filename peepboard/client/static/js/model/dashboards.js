define(['util/dom'], function($dom) {
  var dashboards = {};
  return {
    dashboards: dashboards,
    register: function(dashboard, data) {
      console.info('[DASHBOARD]', 'Registered:', dashboard);
      if (this.dashboards[dashboard] === undefined)
        this.dashboards[dashboard] = {};
      this.dashboards[dashboard].id = dashboard;
      if (data) this.dashboards[dashboard].data = data;
      this.appendDashboardToDOM(dashboard);
    },
    appendDashboardToDOM: function(dashboardID) {
      var dash = this.dashboards[dashboardID];
      dash.element = document.createElement('dashboard-' + dash.data.type);
      dash.element.setAttribute('dashboardType', dash.data.type);
      dash.element.setAttribute('data', JSON.stringify(dash.data));
      dash.element.setAttribute('dashboardID', dash.id);
      $dom.appendDashboard(dash.element);
    },
    notifyWidget: function(widget) {
      for (var dashID in this.dashboards) {
//        this.dashboards[dashID].element.notifyWidget(widget);
      }
    }
  };
});
