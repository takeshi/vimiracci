goog.provide("s3.view.S3Router");

/**
 * @constructor
 */
s3.view.S3Router = function(attr) {
  this.eventBus = new downtown.EventBus();
  if (attr.eventBus) {
    this.eventBus = attr.eventBus;
  }
};

/**
 * Bind EventBus.
 */
s3.view.S3Router.prototype.bindEventBus = function() {
  var self = this;
  this.eventBus.bind("prefix_change", function(event, prefix) {
    window.location.hash = encodeURIComponent(prefix.bucket + "!"
        + prefix.Prefix);
  });
  $(window).bind("hashchange", function(event) {
    self.changePrefix(event);
  });
};
/**
 * @private
 * @param {Event}
 *            event
 */
s3.view.S3Router.prototype.changePrefix = function(event) {
  // console.log(event);
  var hash = decodeURIComponent(window.location.hash).split("!");
  var bucket = hash[0].substring(1);
  var prefix = hash[1];
  this.eventBus.trigger("from_hash_change", {
    bucket : bucket,
    prefix : prefix
  });
};