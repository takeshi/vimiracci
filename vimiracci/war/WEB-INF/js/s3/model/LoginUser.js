goog.provide("s3.model.LoginUser");

goog.require("s3.client.S3Client");
goog.require("s3.parser.XmlParser");

/**
 * @constructor
 */
s3.model.LoginUser = function(attr) {
  attr || (attr ={});
  this.accessKey = attr.accessKey;
  this.secretKey = attr.secretKey;

};
/**
 * 
 * @returns {s3.client.S3Client}
 */
s3.model.LoginUser.prototype.createClient = function() {
  return new s3.client.S3Client(this);
};

s3.model.LoginUser.prototype.loadBuckets = function(callbacks) {
  var client = this.createClient();
  client.bucketsList({
    dataType : "xml",
    success : function(xml) {
      var backetList = s3.parser.XmlParser.parseListAllMyBucketsResult(xml,client);
      callbacks.success(backetList);
    },
    error : function(request, status) {
      callbacks.error(request, status);
    }
  });
};