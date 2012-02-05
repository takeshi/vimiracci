goog.provide("s3.model.Contents");

goog.require("s3.model.Owner");

/**
 * @constructor
 * @param {s3.model.ListBucketResult}
 *            parent
 */
s3.model.Contents = function(parent) {
  this.parent = parent;
  this.Key = "";
  this.LastModified;
  this.ETag = "";
  this.Size = 0;
  this.Owner = new s3.model.Owner();
  this.folder = false;
  this.href = "";
};

/**
 * 
 * @returns {String} file name.
 */
s3.model.Contents.prototype.name = function() {
  return this.Key.substring(this.parent.Prefix.length, this.Key.length);
};
