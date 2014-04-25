// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/post_create',
  'views/header_auth',
  'views/header_unauth',
  'views/login',
  'views/post_list',
  'models/credentials',
  'models/post_collection'
], function($, _, Backbone, CreatePostView, HeaderView, HeaderViewUnAuth, LoginView, PostListView, CredentialsModel, PostCollectionModel ){

    var AppRouter = Backbone.Router.extend({
      routes: {
          "": "login",
          "posts": "posts",
          "login": "login",
          "post_create": "post_create",
          "logout": "logout"
      },
    });

    var app_router = new AppRouter;
    var headerView = new HeaderView();
    var headerViewUnAuth = new HeaderViewUnAuth();

    var blank_header = function()
    {
      $('.header').html(headerViewUnAuth.el);
    };
    var nav_header = function() {
      $('.header').html(this.headerView.el);
    };
    // POSTS : 
    // This is the 'Main' screen and entry point to the Auth'd application
    //
    var posts = function() {
        var list = null;
        var postList = new PostCollectionModel();        
        postList.fetch({
              success: function(collection, response, options){
                  list = new PostListView({model: postList});
                  $('#primary-content').html(list.el);
              }, 
              error: function(collection, response, options){
                  alert(response.responseText);         //TODO : MConlin 4/2014 remove, in here now for phone auth debug catch..      
                  console.error(response.responseText);
              }
            });

        nav_header();
        headerView.selectMenuItem('posts');
    };
    var post_create = function() {
        currentView = new CreatePostView({model: new PostModel()});
        $('#primary-content').html(currentView.render().el);
        headerView.selectMenuItem('post_create');
    };  
    // LOGIN :
    // entry point when unAuth'd
    //
    var login = function() {
        var currentView = new LoginView();
        $('#primary-content').html(currentView.render().el);
        blank_header();
    };
    var logout = function() {

        // TODO MConline : BUG  : 
        // this is still in HEADER when next send to api occurs, somebody still has it?
        // cookie is stored with cross domain name, not localhost.. so not sure how to wax it
        // destroy session cookie
        $.cookie("connect.sid", null);
        login();
    };
  
    var initialize = function (options) {
      blank_header();
      login();

      Backbone.history.start();
    };

    return {
      initialize: initialize
    };
});