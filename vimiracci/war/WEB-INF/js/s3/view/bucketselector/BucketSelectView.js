goog.provide("s3.view.bucketselector.BucketSelectView");

goog.require("downtown.Loader");
goog.require("downtown.EventBus");

/**
 * @constructor
 */
s3.view.bucketselector.BucketSelectView = function(attr) {
  attr || (attr = {});
  var self = this;
  Backbone.View.call(this, attr);
  this.eventBus = new downtown.EventBus();
  this.model = new s3.model.ListAllMyBucketsResult();

  if (attr.eventBus) {
    this.eventBus = attr.eventBus;
  }
  this.bindEventBus();

};
goog.inherits(s3.view.bucketselector.BucketSelectView, Backbone.View);

(function($, undefined) {
  s3.view.bucketselector.BucketSelectView.prototype.onselectBucket = function(
      buckets) {
    this.model = buckets;
    this.render();
  };

  s3.view.bucketselector.BucketSelectView.prototype.bindEventBus = function() {
    var self = this;
    this.eventBus.bind("buckets_select", function(event, buckets) {
      self.onselectBucket(buckets);
    });
  };

  s3.view.bucketselector.BucketSelectView.prototype.render = function() {
    var self = this;
    downtown.Loader.loadHtml("s3/view/bucketselector/list", function(src) {
      var html = $($.render(self.model, src));
      html.appendTo(self.el);
      self.bindEvent();
    });
  };
  
  s3.view.bucketselector.BucketSelectView.prototype.bindEvent = function() {
    var self = this;
    $(this.el).find(".bucketselect").bind("change", function(event) {
      var bucketName = $(event.target).find("option:selected").attr("bucket");
      var bucket = self.model.find(bucketName);
      if (bucket) {
        self.eventBus.trigger("bucket_change", bucket);
      }
    });
  };

}(jQuery));