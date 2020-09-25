H24.makeNS('H24.events', {

    /**
     * basic façade for event bind
     * 
     * @param  {DOMnode}   el   the node
     * @param  {String}   evnt  the event
     * @param  {Function} cb    the callback function
     * @return {undefined}
     */
    bind : (function (){
        if ('addEventListener' in window) {
            return function (el, evnt, cb) {
                el.addEventListener(evnt, cb, false);
            };
        } else if ('attachEvent' in window) {
            return function (el, evnt, cb) {
                el.attachEvent('on' + evnt, cb);
            };
        } else {
            throw new Error('No straight way to bind an event');
        }
    })(),

    /**
     * basic façade for event unbind
     * 
     * @param  {DOMnode}   el   the node
     * @param  {String}   evnt  the event
     * @param  {Function} cb    the callback function
     * @return {undefined}
     */
    unbind : (function (el, evnt, cb) {
        
        if ('removeEventListener' in window) {
            return function (el, evnt, cb) {
                el.removeEventListener(evnt, cb, false);
            };
        } else if ('detachEvent' in window) {
            return function (el, evnt, cb) {
                el.detachEvent('on' + evnt, cb);
            };
        } else {
            throw new Error('No straight way to unbind an event');
        }
    })(),

    /**
     * document ready function
     * @return {undefined}
     */
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

    /**
     * Event delegation function 
     * @param  {String} topic            the topic tha will be published for
     *                                   matching events on matching elements
     * @param  {DOMnode} node            the node
     * @param  {String} ev               the event
     * @param  {String} action_attr_name the name for the attribute that would contain the action
     * @param  {String} params_attr_name the name of the attribute that will contain tha params (see inner oneDimObjFromString)
     * @return {undefined}
     */
    eDelegate : function (topic, node, ev, action_attr_name, params_attr_name) {
        action_attr_name = action_attr_name || 'data-action';
        params_attr_name = params_attr_name || 'data-params';
        var self = this;
        /**
         * [oneDimObjFromString description]
         * @param  {String} s   the string that will be used to obtain one level Object literal
         * @return {Literal}    the object
         *
         * @sample oneDimObjFromString('a:3|s:hello') -> {a : 3, s : 'hello'}
         */
        function oneDimObjFromString(s){
            var res = {},
                els = s.split('|'),
                i, l, tmp;
            for (i = 0, l = els.length; i < l; i++) {
                tmp = els[i].split(':');
                res[tmp[0]] = tmp[1];
            }
            return res;
        }
        var f = function (e) {
            e = e || window.event;
            var cTarget = e.target || e.srcElement,
                params = [];
            if (H24.dom.hasAttribute(cTarget, action_attr_name)) {
                params.push(cTarget.getAttribute(action_attr_name));
                if (H24.dom.hasAttribute(cTarget, params_attr_name)) {
                    params.push(oneDimObjFromString(cTarget.getAttribute(params_attr_name)));
                }
                H24.pubsub.pub(topic, params);
            }
        };
        self.bind(node, ev, f);
    }
});
