define(['model/dashboards'], function($dashboards) {
  var widgets = {};
  var widgetsElements = {};
  return {
    widgets: widgets,
    widgetsElements: widgetsElements,
    register: function(widget) {
      console.info('[WIDGET]', 'Registered:', widget.widgetID);
      this.widgets[widget.widgetID] = widget.data;
      $dashboards.notifyWidget(this.widgets[widget.widgetID]);
      this.buildLoadingWidgets(widget.widgetID);
    },
    linkElementToWidget: function(widgetID, el) {
      if (this.widgetsElements[widgetID] === undefined)
        this.widgetsElements[widgetID] = [];
      this.widgetsElements[widgetID].push(el);
      if (this.get(widgetID))
        this.buildLoadingWidgets(widgetID);
    },
    get: function(widgetID) {
      return this.widgets[widgetID];
    },
    getWidgetElement: function(widgetID) {
      var widget = this.get(widgetID);
      console.log(widget)
      var el = document.createElement('widget-' + widget.type);
      el.setAttribute('data', JSON.stringify(widget));
      return el;
    },
    buildLoadingWidgets: function(widgetID) {
      for (var i in this.widgetsElements[widgetID]) {
        var el = this.widgetsElements[widgetID][i];
        if (el.nodeName.toLowerCase() === 'widget-loading') {
          var newEl = this.getWidgetElement(widgetID);
          el.parentNode.replaceChild(newEl, el);
        }
      }
    }
  };
});
