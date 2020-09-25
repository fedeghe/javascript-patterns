/**
 * @author: Federico Ghedina
 * @info : fedeghe@gmail.com
 * @date : 24-3-2014 
 */
/*
[MALTA] /js/lib/core.js
*/
/**
 * Autoexecuted closure that allows to create namespaces,
 * the autocall is used to put the function itself in a namespace
 * 
 */
// get a look at the bottom, "H24" is the value of ns var
(function (ns){
    // this is due, to test all implications see
    // http://www.jmvc.org/test_strict?ga=false
    // (the ga=false params inhibits google analytics tracking)
    "use strict";


    var debugActive = false;

    /**
     * Creates a namespace
     * @param  {String} str     dot or slash separated path for the namespace
     * @param  {Object literal} [{}]obj optional: the object to be inserted in the ns
     * @param  {[type]} ctx     [window] the context object where the namespace will be created
     * @return {[type]}         the brand new ns
     *
     * @hint This method is DESTRUCTIVE if the obj param is passed,
     *       a conservative version is straight-forward
     * @sample
     *     makens('FG', {hello: ...});
     *     makens('FG', {hi: ...}); // now hello exists no more
     *
     *     //use
     *     makens('FG', {hello: ..., hi: })
     
     *     // or if in different files
     *     // file1     
     *     makens('FG')
     *     FG.hello = ...
     *     //
     *     // file2
     *     makens('FG')
     *     FG.hi = ...
     *     
     */
    function makens(str, obj, ctx) {
        var chr = '.',
            els = str.split(/\.|\//),
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


    // use makens to publish itself and something more
    //
    makens(ns, {

        makeNS : makens,

        debug : function (f) {
            debugActive = !!f;
        },

        dbg : function (m) {
            // maybe shut up
            if (!debugActive) {return void 0;}
            try {console.log(m);} catch(e1) {try {opera.postError(m);} catch(e2){alert(m);}}
        }
    });
    
    // use it again to define a function to get
    // uniqueid
    makens(ns + '.utils', {
        /**
         * useful to get a unique id string
         * @return {String} the wanted id
         */
        uniqueId : new function () {
            var count = 0,
                self = this;
            this.prefix = ns + '_';
            this.toString = function () {
                return  self.prefix + ++count;
            }
        }
    });

// base ns 
})('H24');
// 



/*
[MALTA] /js/i18n.js
*/
H24.makeNS('H24.i18n.lang');

H24.i18n.currentLang = 'en';

H24.i18n.lang.en = {
    title : 'Sample cart',
    no_items : 'No items',
    my_cart : 'My cart',
    button_add : 'Add',
    button_remove : 'Remove',
    name : 'Name',
    price : 'Price'
};
H24.i18n.lang.de = {
    title : 'Zeige Probe',
    no_items : 'Keine Artikel',
    my_cart : 'Mein Warenkorb',
    button_add : 'Hinzufügen',
    button_remove : 'Entfernen',
    name : 'Name',
    price : 'Preis'
};
H24.i18n.lang.it = {
    title : 'Esempio carrello',
    no_items : 'Carrello vuoto',
    my_cart : 'Il mio carrello',
    button_add : 'Aggiungi',
    button_remove : 'Rimuovi',
    name : 'Nome',
    price : 'Prezzo'
};
/*
[MALTA] /js/setting.js
*/
H24.makeNS('H24.setting', {currency : '&euro;'});
//H24.setting.currency = "&euro;";
/*
[MALTA] /js/lib/lang.js
*/
H24.makeNS('H24.i18n');

/**
 * get translation degrading to a special label
 * @param  {String} l         the marker that should correspond tp the
 *                            key in the H24.i18n.lang.2ISO literal
 * @param  {String} forceLang force a label to be written in a language
 * @return {String}           the translation or a clear String that
 *                            underline the lack of the translation
 */
H24.i18n.get = function (l, forceLang) {
    var lng = forceLang || H24.i18n.currentLang;
    return (l in H24.i18n.lang[lng]) ?
        H24.i18n.lang[lng][l]
        :
        '[' + lng + ': ' + l + ']';
}

/**
 * creates the lang select in a specific node
 * @param  {DOMnode} node the targer node where the select will be appended
 * @return {undefined}
 */
H24.i18n.injectSelect = function (node) {
    var lng = H24.cookie.get('lang');
    if (lng) {H24.i18n.currentLang = lng; }
    
    var sel = document.createElement('select'),
        tmp;
    H24.dom.attr(sel, 'id', 'selectLang');
    for (var l in H24.i18n.lang) {
        tmp = document.createElement('option');
        H24.dom.attr(tmp, 'value', l);
        if (H24.i18n.currentLang == l) {
            H24.dom.attr(tmp, 'selected', 'selected');
        }
        tmp.innerHTML = l;
        sel.appendChild(tmp);
    }
    node.appendChild(sel);
    H24.events.bind(sel, 'change', function () {
        H24.i18n.currentLang = this.value
        H24.cookie.set('lang', H24.i18n.currentLang);
        document.location.reload();
    })
};

/*
[MALTA] /js/lib/dom.js
*/
/**
 * Dom library, minimal, shaped on the app needs
 */
H24.makeNS('H24.dom', {
    /**
     * node attribute getter/setter
     * @param  {DOMnode} elem  the node
     * @param  {String} name   the attribute
     * @param  {String} value  the value (optional)
     * @return {DOMnode}       chain input node
     */
    attr : function (elem, name, value) {
        if (!elem) {
            return '';
        }
        var attrs = false,
            l = false,
            i = 0,
            result,
            is_obj = false;
            
        try {elem.nodeType; } catch (e) {
            return false;
        }
        if (elem.nodeType === 3 || elem.nodeType === 8) {return 'undefined'; }
        
        // Make sure that avalid name was provided, here cannot be an object
        if (!name || name.constructor !== String) {return ""; }
        
        // If the user is setting a value
        if (typeof value !== 'undefined') {
            // Set the quick way first 
            elem[{'for': 'htmlFor', 'class': 'className'}[name] || name] = value;
            // If we can, use setAttribute
            if (elem.setAttribute) {
                elem.setAttribute(name, value);
            }
        } else {
            result = (elem.getAttribute && elem.getAttribute(name)) || 0;
            if (!result) {
                attrs = elem.attributes;
                l = attrs.length;
                for (i = 0; i < l; i += 1) {
                    if (attrs[i].nodeName === name) {
                        return attrs[i].value;
                    }
                }
            }
            elem = result;
        }
        return elem;
    },

    /**
     * short for document.getElementById
     * @param  {String} id  the id of the node seached
     * @return {DOMnode}    found node or false
     */
    byId : function (id) {
        return document.getElementById(id);
    },

    /**
     * check node attribute existance
     * @param  {DOMnode}  el    the node
     * @param  {String}  name   the attribute
     * @return {Boolean}        the node exists or not
     */
    hasAttribute : function (el, name) {
        return el.getAttribute(name) !== null;
    },

    /**
     * try to remove an element from the DOM
     * @param  {DOMnode} el the node to be removed
     * @return {undefined}
     */
    remove : function (el) {
        el.parentNode.removeChild(el);
    },

    /**
     * node style gettter/setter
     * @param  {DOMnode} el     the node
     * @param  {Mixed} prop     string or literal containig rules
     * @param  {String} val     in case prop is String this is the value to assign
     * @return {DOMnode}        chain input node
     */
    style : function (el, prop, val) {

        var prop_is_obj = (typeof prop === 'object' && typeof val === 'undefined'),
            ret = false,
            newval,
            k;
        if (prop_is_obj) {
            for (k in prop) {
                el.style[k + ""] = prop[k];
            }
        } else if (typeof val !== 'undefined') {
            el.style[prop + ""] = val + "";
        }
        return el; 
    },

    /**
     * show node
     * @param  {DOMnode} el     the node to be shown
     * @return {undefined}
     */
    show : function (el) {
        this.style(el, 'display', 'block');
    },

    /**
     * hide node
     * @param  {DOMnode} el     the node to be hide
     * @return {undefined}
     */
    hide : function (el) {
        this.style(el, 'display', 'none');
    }
});
/*
[MALTA] /js/lib/cookie.js
*/
H24.makeNS('H24.cookie');

H24.cookie = (function (){
    var w = window,
        wd = w.document,
        body = wd.body,
        cookie_nocookiesaround = false;

    return  {
        set : function (name, value, expires, path, domain, secure) {
            "use strict";
            
            var today = new Date(),
                expires_date = new Date(today.getTime() + expires);
            expires && (expires = expires * 1000 * 60 * 60 * 24);
            wd.cookie = name +
                "=" + w.escape(value) +
                (expires ? ";expires=" + expires_date.toGMTString() : "") +
                (path ? ";path=" + path : "") +
                (domain ? ";domain=" + domain : "") +
                (secure ? ";secure" : "");
            return true;
        },

        get : function (check_name) {
            "use strict";
            var a_all_cookies = wd.cookie.split(';'),
                a_temp_cookie = '',
                cookie_name = '',
                cookie_value = '',
                b_cookie_found = false,
                i = 0,
                l = a_all_cookies.length;
            for (null; i < l; i += 1) {
                a_temp_cookie = a_all_cookies[i].split('=');
                cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
                if (cookie_name === check_name) {
                    b_cookie_found = true;
                    a_temp_cookie.length > 1 && (cookie_value = w.unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, '')));
                    return cookie_value;
                }
                a_temp_cookie = null;
                cookie_name = '';
            }
            return b_cookie_found;
        },
        del : function (name, path, domain) {
            "use strict";
            var ret = false;
            if (this.get(name)) {
                wd.cookie = name + "=" + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
                ret = true;
            }
            return ret;
        }
    };
})();
/*
[MALTA] /js/lib/events.js
*/
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

/*
[MALTA] /js/lib/object.js
*/
H24.object = (function (){

    /**
     * maps an object literal to a string according using the map function  passed
     * @param  {Literal}   o  the object literal
     * @param  {Function} fn  the map function
     * @return {String}       the resulting string
     */
    function map(o, fn) {
        var ret = '', j;
        for (j in o) {
            o.hasOwnProperty(j) && (ret += fn(o, j, ret));
        }
        return ret;
    }
    return {
        /**
         * uses map private function to map an onject literal to a querystring ready for url
         * @param  {Literal} obj    the object literal
         * @return {String}         the mapped object
         */
        toQs : function (obj) {
            return map(obj, function (o, i, r) {
                return ((r ? '&' : '?') + encodeURIComponent(i) + '=' + encodeURIComponent(o[i])).replace(/\'/g, '%27');
            });
        }
    };
})();
/*
[MALTA] /js/lib/io.js
*/
H24.makeNS('H24/io');
H24.io = (function (){

    var W = window,
        _ = {
        /**
         * Façade for getting the xhr object
         * @return {object} the xhr
         */
        getxhr : function () {
            var xhr,
                IEfuckIds = ['Msxml2.XMLHTTP', 'Msxml3.XMLHTTP', 'Microsoft.XMLHTTP'],
                len = IEfuckIds.length,
                i = 0;
            try {
                xhr = new W.XMLHttpRequest();
            } catch (e1) {
                for (null; i < len; i += 1) {
                    try {
                        xhr = new W.ActiveXObject(IEfuckIds[i]);
                    } catch (e2) {continue; }
                }
                !xhr && alert('No way to initialize XHR');
            }
            return xhr;
        },
        ajcall : function (uri, options) {
            var xhr = _.getxhr(),
                method = (options && options.method) || 'POST',
                cback = options && options.cback,
                cb_opened = (options && options.opened) || function () {},
                cb_loading = (options && options.loading) || function () {},
                cb_error = (options && options.error) || function () {},
                cb_abort = (options && options.abort) || function () {},
                sync = options && options.sync,
                data = (options && options.data) || false,
                type = (options && options.type) || 'text/html',
                cache = (options && options.cache !== undefined) ? options.cache : true,
                targetType = type === 'xml' ?  'responseXML' : 'responseText',
                timeout = options && options.timeout || 3000,
                complete = false,
                res = false,
                ret = false,
                state = false;
            //prepare data, caring of cache
            if (!cache) {data.C = +new Date; }
            data = H24.object.toQs(data).substr(1);
            xhr.onreadystatechange = function () {
                var tmp;
                if (state === xhr.readyState) {
                    return false;
                }
                state = xhr.readyState;
                if (xhr.readyState === 'complete' || (xhr.readyState === 4 && xhr.status === 200)) {
                    complete = true;
                    if (cback) {
                        res = xhr[targetType];
                        (function () {cback(res); })(res);
                    }
                    ret = xhr[targetType];
                    //IE leak ?????
                    W.setTimeout(function () {
                        xhr = null;
                    }, 50);
                    return ret;
                } else if (xhr.readyState === 3) {
                    //loading data
                    cb_loading(xhr);
                } else if (xhr.readyState === 2) {
                    //headers received
                    cb_opened(xhr);
                } else if (xhr.readyState === 1) {
                    switch (method) {
                    case 'POST':
                        try {
                            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                            xhr.send(data || true);
                        } catch (e1) {}
                        break;
                    case 'GET':
                        try {
                            tmp = {
                                xml : 'text/xml',
                                html : 'text/html',
                                json : 'application/json'
                            }[type] || 'text/html';

                            xhr.setRequestHeader('Accept', tmp + '; charset=utf-8');
                            xhr.send(null);
                        } catch (e2) {}
                        break;
                    default :
                        alert(method);
                        xhr.send(null);
                        break;
                    }
                }
                return true;
            };
            xhr.onerror = function () {
                cb_error && cb_error.apply(null, arguments);
            };
            xhr.onabort = function () {
                cb_abort && cb_abort.apply(null, arguments);
            };
            //open request
            xhr.open(method, (method === 'GET') ? (uri + ((data) ? '?' + data: '')) : uri, sync);
            //thread abortion
            W.setTimeout(function () {
                if (!complete) {
                    complete = true;
                    xhr.abort();
                }
            }, timeout);
            try {
                return (targetType === 'responseXML') ? xhr[targetType].childNodes[0] : xhr[targetType];
            } catch (e3) {}
            return true;
        }
    };


    // return module
    return {

        getxhr : _.getxhr,
        post : function (uri, cback, sync, data, cache, err) {
            return _.ajcall(uri, {
                cback : cback,
                method : 'POST',
                sync : sync,
                data : data,
                cache : cache,
                error: err
            });
        },
        get : function (uri, cback, sync, data, cache, err) {
            return _.ajcall(uri, {
                cback : cback || function () {},
                method : 'GET',
                sync : sync,
                data : data,
                cache : cache,
                error : err
            });
        },
        getJson : function (uri, cback, data) {
            return _.ajcall(uri, {
                type : 'json',
                method: 'GET',
                sync : false,
                cback : function (r) {
                    cback( (W.JSON && W.JSON.parse) ? JSON.parse(r) : eval('(' + r + ')') );
                },
                data : data
            });
        },
        getXML : function (uri, cback) {
            return _.ajcall(uri, {
                method : 'GET',
                sync : false,
                type : 'xml',
                cback : cback || function () {}
            });
        }
    };
})();
//-----------------------------------------------------------------------------
/*
[MALTA] /js/lib/string.js
*/
H24.makeNS('H24/string', {
    /**
     * templating function
     * @param  {String} tpl     the template
     * @param  {Literal} obj    the Object Literal containing data to be used in the template  
     * @param  {String} start   the placeholder starting delimiter (optional, default %)
     * @param  {String} end     the placeholder ending delimiter (optional, default %)
     * @param  {function} fb    a callback to be called if no matches are found on the object,
     * @return {String}         the template with substituted values
     */
    replaceall : function (tpl, obj, start, end, fb) {
        start = start || '%';
        end = end || '%';
        var reg = new RegExp(start + '([A-z0-9-_]*)' + end, 'g'),
            straight = true,
            str, tmp;
        //fb = fb || false;
        while (straight) {
            if (!(tpl.match(reg))) {
                return tpl;
            }
            tpl = tpl.replace(reg, function (str, $1) {
                switch (true) {
                    // 
                case typeof obj === 'function' :
                    // avoid silly infiloops
                    tmp = obj($1);
                    return (tmp !== start + $1 + end) ? obj($1)  : $1;
                    // the label matches a obj literal element
                    // use it
                case $1 in obj :
                    return obj[$1];
                    /**
                     * not a function and not found in literal
                     * use fallback if passed or get back the placeholder
                     * switching off before returning
                     */
                default:
                    straight = false;
                    return (fb && fb($1)) || start + $1 + end;
                }
            });
        }
        return tpl;
    }
});
/*
[MALTA] /js/lib/inherit.js
*/
H24.makeNS('H24.core');
/**
 * basic prototypal inheritance 
 * @param  {function} Child  the constructor function for child element
 * @param  {function} Parent the constructor function for parent element
 * @return {undefined}
 */
H24.core.inherit = function (Child, Parent) {
    function U() {}
    U.prototype = Parent.prototype;
    Child.prototype = new U();
    Child.prototype.constructor = Child;
    Child.superClass = Parent.prototype;
    Child.baseConstructor = Parent;
};
/*
[MALTA] /js/lib/pubsub.js
*/
H24.makeNS('H24.pubsub');

H24.pubsub = (function () {
    "use strict";
    var topic2cbs = {},
        enabled = true;

    /**
     * Enables the pubsub
     * @return {undefined}
     */
    function enable() {enabled = false; }

    /**
     * disable the pubsub
     * @return {undefined}
     */
    function disable() {enabled = true; }

    /**
     * Publish a topic with some args, for all listeners
     * @param  {String} topic   the topic
     * @param  {Array} args     arguments for callbacks registered
     * @return {undefined}
     */
    function pub(topic, args) {
        var i = 0, l;

        if (!(topic in topic2cbs) || !enabled) {
            return false;
        }
        for (l = topic2cbs[topic].length; i < l; i += 1) {
            topic2cbs[topic][i].apply(null, [topic].concat(args));
        }
    }

    /**
     * Subscribe to a topic
     * @param  {String}   topic the topic
     * @param  {Function} cb    the callback to be executed
     * @return {undefined}
     */
    function sub(topic, cb) {
        var i = 0, l;
        if (topic instanceof Array) {
            for (l = topic.length; i < l; i += 1) {
                sub(topic[i], cb);
            }
        }
        if (!(topic in topic2cbs) || !enabled) {
            topic2cbs[topic] = [];
        }
        topic2cbs[topic].push(cb);
    }

    /**
     * resets one or more topic subscription
     * @return {undefined}
     */
    function reset() {
        var ts = Array.prototype.slice.call(arguments, 0),
            l = ts.length,
            i = 0;
        if (!l) {
            topic2cbs = {};
            return;
        }
        for (null; i < l; i += 1) {
            if (ts[i] in topic2cbs) {
                topic2cbs[ts[i]] = [];
            }
        }
    }

    return {
        enable : enable,
        disable : disable,
        pub : pub,
        sub : sub,
        reset : reset
    };
})();


/*
[MALTA] /js/lib/screen.js
*/
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

/*
[MALTA] /js/lib/utils.js
*/
H24.makeNS('H24.utils');

/**
 * simple debug function
 * @param  {Mixed} m the element to be debugger
 * @return {undefined}
 */
H24.utils.debug = function (m) {
    var W = window;
    try {
        W.console.log(m);
    } catch (e1) {
        try {
            W.opera.postError(m);
        } catch (e2) {
            W[W.hasOwnProperty('log') ? 'log' : 'alert'](m);
        }
    }
};
/*
[MALTA] /js/lib/iscroll.js
*/
H24.makeNS('H24.iscroll');
H24.iscroll = (function (){

    var cback = false;

    return {
        enable : function (cb1, cb2) {
            if (!cback && typeof cb1 !== 'function') {
                throw new Exception('Function required');
            }
            cback = cb1 || cback;
            H24.events.bind(window, 'scroll', function (e) {
                cback && cback.call(null);
                cb2 && cb2();
            });
        },
        disable : function () {
            H24.events.bind(window, 'scroll', cback);
        }
    };

})();
