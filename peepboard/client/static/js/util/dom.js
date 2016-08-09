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
    hideLoading: function() {
      var el = document.querySelector('.peep-loading')
      el.style.opacity = 0;
    },
    appendLoadingWidget: function(container, widgetID) {
      var el = document.createElement('widget-loading');
      el.setAttribute('widget-id', widgetID);
      container.appendChild(el);
    },
    appendDashboard: function(el) {
      var container = document.querySelector('div[dashboards]');
      container.appendChild(el);
    }
  };
});
