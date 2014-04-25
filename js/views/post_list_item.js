// Filename: views/post_list_item
define([
  'jquery',
  'backbone',
  'text!partials/PostListItemView.html'
], function($, Backbone, template){
    var PostListItemView = Backbone.View.extend({
        initialize: function () {
        },
        render: function () {
            $(this.el).html(template(this.model.toJSON()));
            return this;
        }
    });
  return PostListItemView;
});