define(function () {
  var getElement = function(selector) { return document.querySelector(selector); }
  return {
    text: function(name, text) {
      var elem = getElement('[data-text="' + name + '"]');
      elem.textContent = text;
    },
    appendText: function(name, text) {
      var elem = getElement('[data-text="' + name + '"]');
      var p = document.createElement('p');
      p.textContent = text;
      elem.appendChild(p);
    },
    addDashboard: function(dashboard) {
      var el = document.createElement('dashboard-' + dashboard.type);
      el.setAttribute('dashboardType', dashboard.type);
      el.setAttribute('data', JSON.stringify(dashboard));
      var container = document.querySelector('div[dashboards]');
      container.appendChild(el);
    }
  };
});
