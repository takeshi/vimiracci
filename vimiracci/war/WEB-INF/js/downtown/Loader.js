goog.provide("downtown.Loader");

/**
 * @constructor
 */
downtown.Loader = function() {
};

(function($, settings) {

  /**
   * load Javascript from basePath.
   * 
   * @param src
   */
  downtown.Loader.loadJs = function(src) {
    src = settings["basePath"] + src + ".js";
    var script = "<script type='text/javascript' src='" + src + "' ></script>";
    document.write(script);
  };
  var loadedHtml = {};
  /**
   * load html from basePath.
   * 
   * @param {String}
   *            src
   * @param {Function}
   *            callback
   */
  downtown.Loader.loadHtml = function(src, callback) {
    var path = settings["basePath"] + src + ".html";

    if (loadedHtml[src]) {
      setTimeout(function() {
        callback(src);
      }, 0);
      return;
    }

    $.ajax({
      async : true,
      dataType : "text",
      url : path,
      success : function(data) {
        loadedHtml[src] = true;
        $.template(src, data);
        callback(src);
      }
    });
  };
  /**
   * load stylesheet from basePath.
   * 
   * @param src
   */
  downtown.Loader.loadCss = function(src) {
    var href = settings["basePath"] + src + ".css";
    var link = $("<link/>");
    link.attr("rel", "stylesheet");
    link.attr("type", "text/css");
    link.attr("href", href);
    $("head").append(link);

  };
}(jQuery, window["settings"]));