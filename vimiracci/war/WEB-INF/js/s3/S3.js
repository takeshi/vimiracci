goog.provide("s3.S3");

goog.require("s3.load");

/**
 * Utility for Amazon S3.
 * 
 * @constructor
 */
s3.S3 = function() {
};

(function($) {
  /**
   * Calculate signature.
   * 
   * @param {String}
   *            key
   * @param {String}
   *            method
   * @param {String}
   *            resource
   * @param {Hash}
   *            headers
   * @param {String}
   *            expires
   * @returns
   */
  s3.S3.signature = function(key, method, resource, headers, expires) {
    var stringToSign = method + "\n";
    if (headers["x-amz-date"]) {
      headers["date"] = "";
    }

    if (expires) {
      headers["date"] = expires;
    }

    if (!headers["content-type"]) {
      headers["content-type"] = "";
    }
    if (!headers["content-md5"]) {
      headers["content-md5"] = "";
    }
    var keys = [];
    for (k in headers) {
      keys.push(k);
    }
    keys.sort();
    $(keys).each(function(i, k) {
      if (k.substring(0, 5) == "x-amz") {
        stringToSign += k + ":" + headers[k] + "\n";
      } else {
        stringToSign += headers[k] + "\n";
      }
    });
    stringToSign += resource;
    var h = Crypto.HMAC(Crypto.SHA1, stringToSign, key, {
      asString : true
    });
    var b64_string = base64.encode(h);
    return b64_string;
  };

}(jQuery));