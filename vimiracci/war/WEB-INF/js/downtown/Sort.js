goog.provide("downtown.Sort");

(function($) {

  /**
   * @constructor
   */
  downtown.Sort = function() {
  };

  downtown.Sort.namesort = function(a, b) {
    if (a.name() == b.name()) {
      return 0;
    }
    if (a.name() > b.name()) {
      return 1;
    }
    return -1;
  };
}(jQuery));