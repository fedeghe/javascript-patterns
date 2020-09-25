H24.makeNS('H24.utils');
H24.utils.screen = (function (){
    var w = window,
        wd = window.document,
        body = wd.body,
        html = wd.documentElement,
        filter = function (n_win, n_docel, n_body) {
            var n_result = n_win ? n_win : 0;
            if (n_docel && (!n_result || (n_result > n_docel)))
                n_result = n_docel;
            return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
        },
        overflow,
        noscroll = function () {
            return false;
        };

    return {
        /**
         * Tells if the scrolling reached the bottom fof the page
         * @return {Boolean} 
         */
        amIatBottom : function () {
            return this.bodyHeight() <= this.viewportHeight() + this.scrollTop();
        },

        /**
         * return the amount of top scrolling size
         * @return {Number} the topscrolling height
         */
        scrollTop : function () {
            return filter (
                w.pageYOffset ? w.pageYOffset : 0,
                wd.documentElement ? wd.documentElement.scrollTop : 0,
                wd.body ? wd.body.scrollTop : 0
            );
        },

        /**
         * get the height of the body
         * @return {Number} the height of the body
         */
        bodyHeight : function () {
            return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        },

        /**
         * get the height of the visible area to the user
         * @return {Number} the height of the viewport
         */
        viewportHeight : function () {
            return vph = w.innerHeight || html.clientHeight || wd.getElementsByTagName('body')[0].clientHeight;
        }
    };
})();
