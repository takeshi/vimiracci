goog.provide("s3.app");

goog.require("s3.load");
goog.require("downtown.EventBus");
goog.require("s3.view.login");
goog.require("s3.view.bucketselector");
goog.require("s3.view.treeview");
goog.require("s3.view.listview");
goog.require("s3.view.S3Router");

(function($) {
  $(function() {
    var eventBus = new downtown.EventBus();
    $("#login")["s3login"]({
      eventBus : eventBus
    });
    $('#buckets')["bucketselector"]({
      eventBus : eventBus
    });
    $('#tree')["s3tree"]({
      eventBus : eventBus
    });
    $('#list')["s3list"]({
      eventBus : eventBus
    });

    var router = new s3.view.S3Router({
      eventBus : eventBus
    });
    router.bindEventBus();

  });
}(jQuery));
