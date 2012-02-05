goog.provide("s3.model.Bucket");
/**
 * @constructor
 * @param {s3.client.S3Client}
 *            client
 */
s3.model.Bucket = function(client) {
  this.Name = "";
  this.CreationDate = "";
  this.client = client;
};

(function($) {

  /**
   * load Bucket
   * 
   * @param {Hash}
   *            option
   */
  s3.model.Bucket.prototype.loadBucket = function(option) {
    var self = this;
    this.client.list(this.Name, null, "", "/", {
      success : function(data) {
        var result = s3.parser.XmlParser.parseListBucketResult(data,
            self.client);
        option.success(result);
      },
      error : function(req, status) {
        option.error(req.status);
      }
    });
  };

}(jQuery));