FG.makeNS('FG.events', {
    /**
     * accepts even an array as first element
     * @return {[type]} [description]
     */
    bind : (function (){
        function loopcall(el, cback, args){
            var cb = args[1];
            if (el instanceof Array) {
                for (var i = 0, l = el.length; i < l; i += 1) {
                    el[i][cback].apply(el[i], args || []);
                }
            } else {
                el[cback].apply(el, args || []);
            }
        }
        if ('addEventListener' in window) {
            return function (el, evnt, cb) {
                loopcall(el, 'addEventListener', [evnt, cb, false]);
            };
        } else if ('attachEvent' in window) {
            return function (el, evnt, cb) {
                loopcall(el, 'attachEvent', ['on' + evnt, cb]);
            };
        } else {
            throw new Error('No straight way to bind an event');
        }
    })(),

    /**
     * really basic
     * @param  {[type]}   el   [description]
     * @param  {[type]}   evnt [description]
     * @param  {Function} cb   [description]
     * @return {[type]}        [description]
     */
    unbind : function (el, evnt, cb) {
        var index, tmp, l;
        if (el instanceof Array) {
            for (var i = 0, l = el.length; i < l; i += 1) {
                FG.events.unbind(el[i], evnt, cb);
            }
        } else {
            if (el.removeEventListener) {
                el.removeEventListener(evnt, cb, false);
            } else if (el.detachEvent) {
                el.detachEvent("on" + evnt, cb);
            }
        }
        return true;
    },

    ready : (function () {
        var W = window,
            WD = W.document;
        if(WD.addEventListener){
            return function (func) {WD.addEventListener('DOMContentLoaded', func, false); };
        }else if(W.addEventListener){
            return function (func) {W.addEventListener('load', func, false); };
        }else if(WD.attachEvent){
            return function (func) {WD.attachEvent("onreadystatechange", func); };
        }else if(W.attachEvent){
            return function (func) {W.attachEvent("onload", func); };
        }
    })(),

    code : function (e) {
        if (e.keyCode) {
            return e.keyCode;
        } else if (e.charCode) {
            return e.charCode;
        } else if (e.which) {
            return e.which;
        }
        return false;
    }
});
