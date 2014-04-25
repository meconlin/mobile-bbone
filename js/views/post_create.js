// Filename: views/post_create
define([
  'jquery',
  'backbone',
  'text!partials/CreatePostView.html'
], function($, Backbone, template){
    var CreatePostView = Backbone.View.extend({
        initialize: function () {
        },
        render: function () {
            $(this.el).html(template(this.model.toJSON()));
            return this;
        }
    });
  return CreatePostView;
});