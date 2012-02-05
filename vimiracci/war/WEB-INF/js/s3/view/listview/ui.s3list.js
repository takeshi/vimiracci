goog.provide("s3.view.listview");

goog.require("s3.view.listview.ListView");
goog.require("downtown.Loader");

downtown.Loader.loadCss("s3/view/listview/list");

(function($) {
  $.widget("ui.s3list", {
    options : {
      eventBus : null
    },
    _create : function() {
      this.view = new s3.view.listview.ListView({
        el : this.element,
        eventBus : this.options.eventBus
      });
      this.view.bindEventBus();
    }
  });
  // });

}(jQuery));