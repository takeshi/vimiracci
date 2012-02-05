goog.provide('s3.view.treeview.TreeView');

goog.require('downtown.Loader');

/**
 * @param {Map}
 *            attr .
 * @constructor
 */
s3.view.treeview.TreeView = function(attr) {
  Backbone.View.call(this, attr);
  this.eventBus = new downtown.EventBus();
  if (attr.eventBus) {
    this.eventBus = attr.eventBus;
  }
};
goog.inherits(s3.view.treeview.TreeView, Backbone.View);

((function($) {
  s3.view.treeview.TreeView.prototype.bindEventBus = function() {
    var self = this;
    this.eventBus.bind('bucket_change', function(event, bucket) {
      self.bucket = bucket;
      self.client = bucket.client;
      self.render();
    });
  };

  s3.view.treeview.TreeView.prototype.render = function() {
    var self = this;
    $(self.el).children().remove();
    downtown.Loader.loadHtml('s3/view/treeview/main', function(src) {
      var html = $($.render({}, src));
      $(html).appendTo(self.el);
      $(self.el).treeview();
      self.loadBucket($(self.el).find('.dummyFolder'), self.bucket);
    });
  };

  s3.view.treeview.TreeView.prototype.loadBucket = function(element,
      bucketLoadable) {
    var self = this;
    $(element).children().remove();
    bucketLoadable.loadBucket({
      success: function(result) {
        downtown.Loader.loadHtml('s3/view/treeview/tree', function(src) {
          var html = $($.render(result, src));
          $(html).appendTo(element);
          $(html).treeview();
          self.bindEvent($(html));
        });
      },
      error: function(req, status) {
        alert('Bucket Load Error ' + status);
      }
    });
  };

  s3.view.treeview.TreeView.prototype.bindEvent = function(folders) {
    var self = this;

    folders.find('.folderItem').bind('click.loadFolder', function(event) {
      var prefix = $(this).attr('prefix');
      var commonPrefix = new s3.model.CommonPrefixes(null, self.client);
      commonPrefix.bucket = self.bucket.Name;
      commonPrefix.Prefix = prefix;
      $(this).unbind('click.loadFolder');
      self.loadBucket($(this).find('.dummyFolder'), commonPrefix);
      event.preventDefault();
    });

    folders.find('.folder').bind('click.folder', function(event) {
      var prefixName = $(this).attr('prefix');
      var commonPrefix = new s3.model.CommonPrefixes(null, self.client);
      commonPrefix.bucket = self.bucket.Name;
      commonPrefix.Prefix = prefixName;
      self.eventBus.trigger('prefix_change', commonPrefix);
      event.preventDefault();
    });

  };

}(jQuery)));
