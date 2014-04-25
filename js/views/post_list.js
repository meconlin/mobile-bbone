// Filename: views/post_list
define([
  'jquery',
  'backbone',
  'views/post_list_item'
], function($, Backbone, PostListItemView){
    var PostListView = Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        render: function () {
            var posts = this.model.models;
            var len = posts.length;
            $(this.el).html('<div id="postlist"></div>');
            for(var i = 0; i<len; i++)
            { 
                $('#postlist', this.el).append(new PostListItemView({model: posts[i]}).render().el);
            }
            return this;
        }
    });
  return PostListView;
});