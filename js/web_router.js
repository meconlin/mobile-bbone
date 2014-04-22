"use strict";
window.APP = window.APP || {};
APP.WebRouter = Backbone.Router.extend({
  routes: {
      "": "login",
      "posts": "posts",
      "login": "login",
      "post_create": "post_create",
      "logout": "logout"
  },
  initialize: function (options) {
    this.headerView = new APP.HeaderView();
    $('.header').html(this.headerView.el);
    this.login();
  },
  posts: function() {
      var list = null;
      var posttList = new APP.PostCollectionModel();
      posttList.fetch({success: function(){
          list = new APP.PostListView({model: posttList});
          $('#primary-content').html(list.el);
      }});
      this.headerView.selectMenuItem('posts');
  },
  post_create: function() {
      this.currentView = new APP.CreatePostView({model: new APP.PostModel()});
      $('#primary-content').html(this.currentView.render().el);
      this.headerView.selectMenuItem('post_create');
  },  
  login: function() {
      this.currentView = new APP.LoginView({ model: new APP.CredentialsModel()});
      $('#primary-content').html(this.currentView.render().el);
      this.headerView.clearAll();
  }, 
  logout: function() {

      //TODO : BUG  : 
      // this is still in HEADER when next send to api occurs, somebody still has it?
      // cookie is stored with cross domain name, not localhost.. so not sure how to wax it
      // destroy session cookie
      $.cookie("connect.sid", null);

      // Note the variable in the route definition being passed in here
      this.currentView = new APP.LoginView({ model: new APP.CredentialsModel()});
      $('#primary-content').html(this.currentView.render().el);
      this.headerView.clearAll();
  }
});
