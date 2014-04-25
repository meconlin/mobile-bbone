// Filename: models/post
//
define([
  'jquery',
  'backbone',
], function($, Backbone) {

  var CredentialsModel = Backbone.Model.extend({
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
          //TODO : MConlin 4/2014 
          //       should this just be nothing, we dont really have other REST actions here
          //
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

  return CredentialsModel;
});