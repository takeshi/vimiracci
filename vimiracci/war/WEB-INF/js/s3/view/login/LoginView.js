goog.provide('s3.view.login.LoginView');

goog.require('downtown.Loader');
goog.require('downtown.EventBus');
goog.require('s3.model.LoginUser');

/**
 * @constructor
 */
s3.view.login.LoginView = function(attr) {
  this.model = new s3.model.LoginUser();
  Backbone.View.call(this, attr);
  this.eventBus = new downtown.EventBus();
  if (attr.eventBus) {
    this.eventBus = attr.eventBus;
  }
};
goog.inherits(s3.view.login.LoginView, Backbone.View);

(function($, undefined) {
  /**
   * 画面の表示
   */
  s3.view.login.LoginView.prototype.render = function() {
    var self = this;
    downtown.Loader.loadHtml('s3/view/login/login', function(src) {
      var html = $($.render({}, src));
      // テンプテートからHTMLを生成し、画面に描画する。
      $(self.el).html(html);
      var userJson = localStorage['s3.login.user'];
      if (userJson) {
        self.model = new s3.model.LoginUser(JSON.parse(userJson));
      }
      // ModelとViewをバインドする
      html.link(self.model);
      self.bindEvent();
    });
  };

  /**
   * 画面のイベントをバインドする
   */
  s3.view.login.LoginView.prototype.bindEvent = function() {
    var self = this;
    // loginボタンのクリック
    $(this.el).find('.login').click(function(e) {
      if (self.clicked) {
        return;
      }
      self.clicked = true;
      self.model.accessKey = self.model.accessKey.trim();
      self.model.secretKey = self.model.secretKey.trim();
      self.model.loadBuckets({
        success: function(buckets) {
          self.eventBus.trigger('buckets_select', buckets);
          $(self.el).children().remove();
        },
        error: function(req, status) {
          alert('Login Error status:' + status);
          self.clicked = false;
        }
      });
    });
    // saveボタンのクリック
    $(this.el).find('.save').click(function(e) {
      localStorage['s3.login.user'] = JSON.stringify(self.model);
    });
  };

}(jQuery));