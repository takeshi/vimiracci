goog.provide("s3.client.S3Client");

goog.require("s3.S3");

/**
 * @constructor
 * @param {s3.model.LoginUser}
 *            loginUser
 */
s3.client.S3Client = function(loginUser) {
  this.loginUser = loginUser;
};

(function($) {

  s3.client.S3Client.prototype.bucketsList = function(options) {
    var date = new Date().toUTCString();
    var resource = "/";
    var signature = s3.S3.signature(this.loginUser.secretKey, "GET", resource,
        {
          "x-amz-date" : date
        });

    options.url = "https://s3.amazonaws.com";
    options.dataType = "xml";

    this.setRequiredHeader(options, signature, date);

    $.ajax(options);
  };

  s3.client.S3Client.prototype.createGetUrl = function(bucket, key) {
    var expire = parseInt((new Date().getTime() + 60000) / 1000);
    key = encodeURIComponent(key);
    var resource = "/" + bucket + "/" + key;
    var signature = s3.S3.signature(this.loginUser.secretKey, "GET", resource,
        {}, expire);
    var url = "https://s3.amazonaws.com" + "/" + bucket + "/" + key;
    var query = "?AWSAccessKeyId=" + this.loginUser.accessKey;
    query += "&Expires=" + expire;
    query += "&Signature=" + encodeURIComponent(signature);
    return url + query;
  };
  /**
   * 
   * @param bucket
   * @param key
   * @param prefix
   * @param delimiter
   * @param options
   */
  s3.client.S3Client.prototype.list = function(bucket, key, prefix, delimiter,
      options) {
    if (!key) {
      key = "";
    }

    var date = new Date().toUTCString();
    var resource = "/" + bucket + "/" + key;
    var signature = s3.S3.signature(this.loginUser.secretKey, "GET", resource,
        {
          "x-amz-date" : date
        });

    options.url = "https://" + bucket + ".s3.amazonaws.com/" + key;
    options.dataType = "xml";

    options.data = {
      prefix : prefix,
      delimiter : delimiter
    };

    this.setRequiredHeader(options, signature, date);

    $.ajax(options);
  };

  /**
   * set required headers.
   * 
   * @param options
   * @param signature
   * @param date
   */
  s3.client.S3Client.prototype.setRequiredHeader = function(options, signature,
      date) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers["Authorization"] = "AWS " + this.loginUser.accessKey + ":"
        + signature;
    options.headers["x-amz-date"] = date;
  };

}(jQuery));
