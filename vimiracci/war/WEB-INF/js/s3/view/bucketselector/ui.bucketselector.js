goog.provide("s3.view.bucketselector");

goog.require("s3.view.bucketselector.BucketSelectView");

(function($, undefined) {

  $.widget("ui.bucketselector", {
    options : {},
    _create : function() {
      this.view = new s3.view.bucketselector.BucketSelectView({
        el : this.element,
        eventBus : this.options.eventBus
      });
    }
  });
}(jQuery));