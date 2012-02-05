goog.provide("s3.model.CommonPrefixes");
/**
 * @constructor
 * @param {s3.ListBucketResult}
 *            parent
 * @param {s3.client.S3Client}
 *            client
 */
s3.model.CommonPrefixes = function(parent, client) {
  this.parent = parent;
  this.Prefix = "";
  this.bucket = "";
  this.folder = true;
  this.client = client;
};

(function(undefined) {

  /**
   * @returns {String} directory name.
   */
  s3.model.CommonPrefixes.prototype.name = function() {
    return this.Prefix.substring(this.parent.Prefix.length,
        this.Prefix.length - 1);
  };

  s3.model.CommonPrefixes.prototype.loadBucket = function(options) {
    var self = this;
    this.client.list(this.bucket, null, this.Prefix, "/", {
      success : function(data) {
        var result = s3.parser.XmlParser.parseListBucketResult(data,
            self.client);
        options.success(result);
      },
      error : function(req, status) {
        options.error(req, status);
      }
    });
  };

}());