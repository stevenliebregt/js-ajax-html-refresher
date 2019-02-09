import AjaxRefresher from './AjaxRefresher';

(function ($) {
    /**
     * jQuery plugin entrypoint.
     * @param options
     * @returns {*|jQuery}
     * @constructor
     */
    $.fn.AjaxRefresher = function (options) {
        return this.each(function () {
            new AjaxRefresher($(this), options);
        });
    };
}(jQuery));