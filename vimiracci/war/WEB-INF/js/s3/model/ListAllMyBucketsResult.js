goog.provide("s3.model.ListAllMyBucketsResult");

goog.require("s3.model.Owner");
goog.require("s3.model.Bucket");

/**
 * @constructor
 * @param {s3.client.S3Client}
 *            client
 */
s3.model.ListAllMyBucketsResult = function(client) {
  this.Owner = new s3.model.Owner();
  this.Buckets = [];
  this.client = client;
};

(function($, undefined) {

  /**
   * 
   * @param {String}
   *            name
   * @returns {s3.model.Bucket}
   */
  s3.model.ListAllMyBucketsResult.prototype.find = function(name) {
    if (!name) {
      return null;
    }
    var selected = null;
    $(this.Buckets).each(function(i, bucket) {
      if (bucket.Name == name) {
        selected = bucket;
      }
    });
    return selected;
  };
}(jQuery));