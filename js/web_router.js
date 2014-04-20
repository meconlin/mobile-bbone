window.APP = window.APP || {};
"use strict";
APP.WebRouter = Backbone.Router.extend({
  routes: {
      "": "login",
      "posts": "posts",
      "login": "login"
  },
  initialize: function (options) {
    this.login();
  },
  posts: function() {
      // Note the variable in the route definition being passed in here
      var list = null;
      var posttList = new APP.PostCollectionModel();
      posttList.fetch({success: function(){
          list = new APP.PostListView({model: posttList});
          $('#primary-content').html(list.el);
      }});
  },
  login: function() {
      // Note the variable in the route definition being passed in here
      this.currentView = new APP.LoginView({ model: new APP.CredentialsModel()});
      $('#primary-content').html(this.currentView.render().el);
  }  
});
