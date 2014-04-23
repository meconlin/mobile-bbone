"use strict";
/** 
    NOTES : 
    
    binding a model to a view for updates
    
    var UpdatingDonutView = DonutView.extend({
        initialize : function(options) {
        this.render = _.bind(this.render, this); 
 
        this.model.bind('change:name', this.render);
    }
    });

**/ 
$(document).ready(function() {

    APP.HeaderView = Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        render: function () {
            $(this.el).html(this.template());
            return this;
        },
        clearAll: function (){
            $('.nav li').removeClass('active');
        },
        inActiveAll: function(){
            $('.nav li').addClass('inactive');
        },
        selectMenuItem: function (menuItem) {
            $('.nav li').removeClass('active');
            if (menuItem) {
                $('.' + menuItem).addClass('active');
            }
        }
    });

    APP.CreatePostView = Backbone.View.extend({
        initialize: function () {
        },
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    APP.PostListView = Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        render: function () {
            var posts = this.model.models;
            var len = posts.length;
            $(this.el).html('<div id="postlist"></div>');
            for(var i = 0; i<len; i++)
            { 
                $('#postlist', this.el).append(new APP.PostListItemView({model: posts[i]}).render().el);
            }
            return this;
        }
    });

    APP.PostListItemView = Backbone.View.extend({
        initialize: function () {
        },
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    APP.LoginView = Backbone.View.extend({
        events: {
            "submit": "login"  //notice no selector on the submit bind
        },    
        tagName: "div",
        initialize: function(){
            _.bindAll(this, 'render');
            this.model.bind('error', this.handleError);
        },
        handleError: function (model, errors){
            var alertdiv = $('#alerts');

            // TODO : template fragment?
            //
            _.each(errors, function(error, i) {    
                alertdiv.append(
                '<div class="alert alert-warning">' +
                    '<button type="button" class="close" data-dismiss="alert">' +
                    '&times;</button>' + error.message + '</div>');
            });        
        },
        render: function(){
            this.$el.html( this.template( this.model.toJSON()));
            return this;
        },
        login: function(){
            // set all at once, to trigger only one model validate call
            var user = {'username': this.$("#username").val(), 
                        'password' : this.$("#password").val()
            };
            var _self = this;
            this.model.set(user);
            this.model.save(null,{                                      //you can override current model by replacing null with params                   
                success: function (model, response) {
                    console.log(model);
                    console.log(response);
                    window.location.hash = "#/posts";


                    // TODO : MConlin 4/2014 
                    // populate session object with login: true and this users data?
                    //

                },
                error: function (model, response) {
                    console.error('model.save : error :');
                    console.error(response);
                    if(!_.isNull(response)) {
                        var error = {"message":response.error};
                        _self.handleError(model, [error])
                    }
                },
                wait: true
            });            
            return false;    //shorthand to stop event propagation, duh 
        }
    });
});