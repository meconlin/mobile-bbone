// Filename: views/login
define([
  'jquery',
  'underscore',
  'backbone',
  'text!partials/LoginView.html',
  'models/credentials',
  'router'
], function($, _, Backbone, template, CredentialsModel, Router){
    var LoginView = Backbone.View.extend({
        events: {
            "submit": "login"  //notice no selector on the submit bind
        },    
        tagName: "div",       
        initialize: function(){
            this.model = new CredentialsModel();
            _.bindAll(this, ['render']);              // make this object the "this" in any call to render   
            this.model.bind("invalid", this.handleError);
        },
        handleError: function (model, errors) {
            var alertdiv = $('#alerts');

            // TODO : template fragment?
            //
            _.each(errors, function(error) {    
                alertdiv.append(
                '<div class="alert alert-warning">' +
                    '<button type="button" class="close" data-dismiss="alert">' +
                    '&times;</button>' + error.message + '</div>');
            });        
        },
        clearAlerts: function(){
            $('#alerts').empty();                   
        },
        render: function(){
            this.$el.html( _.template( template, this.model.toJSON()));
            return this;
        },
        login: function(){
            this.model.clear();
            this.model.validationError = null;                          //QUESTION.. what am I doing wrong that I have to clear this?
            this.clearAlerts();

            // set all at once, to trigger only one model validate call
            var user = {'username': this.$("#username").val(), 
                        'password' : this.$("#password").val()
            };
            var _self = this;
            this.model.set(user);                                       //this will validate client errors (form validation)
            
            // only go on if we have no client side validation issues
            //
            if(_.isNull(this.model.validationError))
            {
                this.model.save(null,{                                 //you can override current model by replacing null with params                   
                    success: function (model, response) {
                        Router.navigate("/posts", {trigger: true});       

                        // TODO : MConlin 4/2014 
                        // populate session object with login: true and this users data?
                        //
                    },
                    error: function (model, response) {                 // handle API errors
                        if(!_.isNull(response)) {
                            var error = {"message":response.error};
                            console.error("login error", error);
                            _self.handleError(model, [error])
                        }
                    },
                    wait: true
                });
            } else {
                console.log('not valid so not calling save : ');
            };

            return false;    //shorthand to stop event propagation, duh 
        }
    });
  // Our module now returns our view
  return LoginView;
});