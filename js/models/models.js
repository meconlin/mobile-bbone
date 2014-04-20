$(document).ready(function() {
  "use strict";
  APP.PostModel = Backbone.Model.extend({
    url: 'http://bfapp-bfsharing.rhcloud.com/post',
    defaults:{
    },
    initialize: function () {},

  });

  APP.PostCollectionModel = Backbone.Collection.extend({
    url: REST+'/feed',
    model: APP.PostModel,
    defaults:{
    },
    initialize: function () {},

  });

  APP.CredentialsModel = Backbone.Model.extend({
    // TODO Mconlin 4/2014 : base url somewhere else... this
    //
    url: REST+'/login',
    defaults: {
    },
    validate: function (attrs) {
      var errors = [];
      if(!attrs.username)
      {
        errors.push({name: 'username', message: 'Please provide a username'});
      }
      if(!attrs.password)
      {
        errors.push({name: 'password', message: 'Please provide a password'});
      }

      return errors.length > 0 ? errors : false;
    },

    // overriding synch here because of the OPTION call hanging
    //        
    sync: function (method, model, options) {
        if (method === 'create'){
            $.ajax(model.url, {
                type: 'POST', 
                data: decodeURIComponent($.param({"username":model.get("username"),
                                                  "password":model.get("password")})),   
                success: function (data) {
                    return options.success(data);                            
                },
                error: function (xhr) {
                    return options.error({"error":xhr.responseText});
                }
              });
        } else {
          return Backbone.sync(model, method, model, options);   
        }
    },

    // lifted right from backbone tutorial, didnt now about CORS till today, nice
    initialize: function () {
      // Hook into jquery
      // Use withCredentials to send the server cookies
      // The server must allow this through response headers
      $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
          options.crossDomain ={
              crossDomain: true
          };
          options.xhrFields = {
              withCredentials: true
          };
      });            
    }           
  });
});
