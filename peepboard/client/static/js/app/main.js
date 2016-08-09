define([
  'util/dom',
  'conn/socket',
  'model/widgets'
], function (dom, socket, widgets, require) {
  // Main app loader
  window.$socket = socket;
  window.$widgets = widgets;
  window.$dom = dom;
});
