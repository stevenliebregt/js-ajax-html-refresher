import AjaxRefresher from './AjaxRefresher';

(function($) {
    $.fn.AjaxRefresher = function(options) {
        return this.each(function() {
            new AjaxRefresher($(this), options);
        });
    }
}(jQuery));