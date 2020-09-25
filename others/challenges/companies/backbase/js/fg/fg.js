/**
 * Autoexecuted closure that allows to create namespaces,
 * the autocall is used to put the function itself in a namespace
 * 
 */
(function (ns){

    "use strict";

    function makens(str, obj, ctx) {
        var chr = '.',
            els = str.split(chr),
            l = els.length,
            _u_ = 'undefined',
            ret;
        (typeof ctx === _u_) && (ctx = window);
        (typeof obj === _u_) && (obj = {});
        //
        if (!ctx[els[0]]) {
            ctx[els[0]] = (l === 1) ? obj : {};
        }
        ret = ctx[els[0]];
        return (l > 1) ? makens(els.slice(1).join(chr), obj, ctx[els[0]]) : ret;
    }

    makens(ns, {
        makeNS : makens,
        debugActive : false,
        dbg : function (m) {
            // maybe shut up
            if (!this.debugActive) {return void 0;}
            try {console.log(m);} catch(e1) {try {opera.postError(m);} catch(e2){alert(m);}}
        }
    });
    
    makens(ns + '.utils', {
        /**
         * useful to get a unique id string
         * @return {String} the wanted id
         */
        uniqueId : new function () {
            var count = 0,
                self = this;
            this.prefix = ns;
            this.toString = function () {
                return  self.prefix + ++count;
            }
        }
    });

})('FG');
