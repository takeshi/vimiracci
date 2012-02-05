goog.provide("downtown.EventBus");

/**
 * Event Bus
 * 
 * @constructor
 */
downtown.EventBus = function() {
  this.dispacher = jQuery("<div></div>");
};

(function($) {

  /**
   * Bind Event.
   * 
   * @param {String}
   *            type
   * @param {Object}
   *            data
   * @param {Function}
   *            callback
   */
  downtown.EventBus.prototype.bind = function(type, data, callback) {
    this.dispacher.bind(type, data, callback);
  };
  /**
   * Fire event.
   * 
   * @param {String}
   *            type
   * @param {Object}
   *            data
   */
  downtown.EventBus.prototype.trigger = function(type, data) {
    this.dispacher.trigger(type, data);
  };

}(jQuery));