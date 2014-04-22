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
            var message = 'chicken';
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
            this.model.set(user);
            this.model.save(null,{                    
                success: function (user) {
                    window.location.hash = "#/posts";
                },
                error: function (err) {
                    //TODO MConlin 4/2014 : um get this on screen
                    //
                    console.error('model.save : error :');
                    console.error(err);
                },
                wait: true
            });            
            return false;    //shorthand to stop event propagation, duh 
        }
    });
});