window.FinalApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    FinalApp.projects = new FinalApp.Collections.Projects();
    FinalApp.members = new FinalApp.Collections.Members();
    FinalApp.members.fetch({
      success: function() {
        FinalApp.projects.fetch({
          success: function() {
          new FinalApp.Routers.Projects({
            $rootEl: $('#content'), 
            projects: FinalApp.projects, 
            members: FinalApp.members
          });
          Backbone.history.start();
          }
        });
      }
    });
  }
};

Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    this.subviews(selector).push(subview);
    this.attachSubview(selector, subview.render());
  },

  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.$el);
    subview.delegateEvents();
  },

  attachSubviews: function () {
    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      view.$(selector).empty();
      _(subviews).each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) { subview.remove(); });
    });
  },

  removeSubview: function (selector, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },

  removeSubviews: function() {
    _(this.subviews()).each(function (subviews, selector) {
        _(subviews).each(function(subview) {
          subview.remove();
        })
    });

    this._subviews = {};
  },

  subviews: function (selector) {
    this._subviews = this._subviews || {};

    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  }
});
