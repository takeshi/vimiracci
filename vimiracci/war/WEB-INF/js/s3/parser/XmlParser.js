goog.provide("s3.parser.XmlParser");

goog.require("s3.model.Owner");
goog.require("s3.model.Contents");
goog.require("s3.model.ListBucketResult");
goog.require("s3.model.CommonPrefixes");
goog.require("s3.model.ListAllMyBucketsResult");

/**
 * @constructor
 */
s3.parser.XmlParser = function() {
};

(function($) {

  s3.parser.XmlParser.parseListAllMyBucketsResult = function(xml, client) {
    var result = new s3.model.ListAllMyBucketsResult(client);
    result.Owner.ID = $(xml).find("Owner > ID").text();
    result.Owner.DisplayName = $(xml).find("Owner > DisplayName").text();
    $(xml).find("Bucket").each(function(i, xml) {
      var bucket = new s3.model.Bucket(client);
      bucket.CreationDate = $(xml).find("CreateDate").text();
      bucket.Name = $(xml).find("Name").text();
      result.Buckets.push(bucket);
    });
    return result;
  };

  /**
   * parse ListBackResult Xml
   * 
   * @param xml
   * @returns {ListBucketResult}
   */
  s3.parser.XmlParser.parseListBucketResult = function(xml, client) {
    var listBucketResult = new s3.model.ListBucketResult();
    listBucketResult.Name = $(xml).find("ListBucketResult > Name").text();
    listBucketResult.Prefix = $(xml).find("ListBucketResult > Prefix").text();
    listBucketResult.Marker = $(xml).find("ListBucketResult > Marker").text();
    listBucketResult.MaxKeys = parseInt($(xml).find(
        "ListBucketResult > MaxKeys").text());
    listBucketResult.Delimiter = $(xml).find("ListBucketResult > Delimiter")
        .text();
    listBucketResult.IsTruncated = $(xml)
        .find("ListBucketResult > IsTruncated").text();

    $(xml).find("ListBucketResult > Contents").each(
        function(index, contents) {
          var conetnts = s3.parser.XmlParser.parseContents(listBucketResult,
              contents, client);
          listBucketResult.ContentsList.push(conetnts);
        });
    $(xml).find("ListBucketResult > CommonPrefixes").each(function(index, xml) {
      var prefix = new s3.model.CommonPrefixes(listBucketResult, client);
      prefix.Prefix = $(xml).find("Prefix").text();
      listBucketResult.ContentsList.push(prefix);
    });
    return listBucketResult;
  };

  /**
   * parse Contents Xml
   * 
   * @param {ListBucketResult}
   * @param {Document}
   *            xml
   * @returns {Contents}
   */
  s3.parser.XmlParser.parseContents = function(listBucketResult, xml, client) {
    var contents = new s3.model.Contents(listBucketResult, client);
    contents.Key = $(xml).find("Key").text();
    contents.Date = new Date($(xml).find("Date").text());
    contents.ETag = $(xml).find("ETag").text();
    contents.Size = parseInt($(xml).find("Size").text());
    var owner = $(xml).find("Owner");
    contents.Owner.DisplayName = $(owner).find("DisplayName").text();
    contents.Owner.ID = $(owner).find("ID").text();
    return contents;
  };

}(jQuery));