"use strict";
$(document).ready(function() {
    APP.utils = {
        // Asynchronously load templates located in separate .html files
        loadTemplate: function(views, callback) {
            var deferreds = [];
            $.each(views, function(index, view) {
                if (APP[view]) {
                    deferreds.push($.get('partials/' + view + '.html', function(data) {
                        APP[view].prototype.template = _.template(data);
                    }));
                } else {
                   console.error(view + " not found !");
                }
            });

            $.when.apply(null, deferreds).done(callback);
        }
    };
});