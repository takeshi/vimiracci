goog.provide('s3.view.treeview');

goog.require('downtown.Loader');
goog.require('s3.view.treeview.TreeView');

downtown.Loader.loadCss('s3/view/treeview/treeview');

(function($, undefined) {

  $.widget('ui.s3tree', {
    options: {
      eventBus: null
    },
    _create: function() {
      this.view = new s3.view.treeview.TreeView({
        el: this.element,
        eventBus: this.options.eventBus
      });
      this.view.bindEventBus();
    }
  });
}(jQuery));
