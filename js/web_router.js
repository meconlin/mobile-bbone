"use strict";
window.APP = window.APP || {};
$(document).ready(function() {
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
      this.headerViewUnAuth = new APP.HeaderViewUnAuth();
      this.blank_header();
      this.login();
    },
    blank_header: function()
    {
      $('.header').html(this.headerViewUnAuth.el);
    },
    nav_header: function() {
      $('.header').html(this.headerView.el);
    },
    // POSTS : 
    // This is the 'Main' screen and entry point to the Auth'd application
    //
    posts: function() {
        var list = null;
        var postList = new APP.PostCollectionModel();        
        postList.fetch({
              success: function(collection, response, options){
                  list = new APP.PostListView({model: postList});
                  $('#primary-content').html(list.el);
              }, 
              error: function(collection, response, options){
                  alert(response.responseText);         //TODO : MConlin 4/2014 remove, in here now for phone auth debug catch..      
                  console.error(response.responseText);
              }
            });

        this.nav_header();
        this.headerView.selectMenuItem('posts');
    },
    post_create: function() {
        this.currentView = new APP.CreatePostView({model: new APP.PostModel()});
        $('#primary-content').html(this.currentView.render().el);
        this.headerView.selectMenuItem('post_create');
    },  
    // LOGIN :
    // entry point when unAuth'd
    //
    login: function() {
        this.currentView = new APP.LoginView({ model: new APP.CredentialsModel()});
        $('#primary-content').html(this.currentView.render().el);
        this.blank_header();
    }, 
    logout: function() {

        // TODO MConline : BUG  : 
        // this is still in HEADER when next send to api occurs, somebody still has it?
        // cookie is stored with cross domain name, not localhost.. so not sure how to wax it
        // destroy session cookie
        $.cookie("connect.sid", null);
        this.login();
    }
  });
});