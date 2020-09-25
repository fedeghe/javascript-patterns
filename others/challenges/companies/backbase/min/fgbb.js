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

FG.makeNS('FG.dom', {

    append : function (parent, node){
        if ("string" === typeof node) {
            parent.innerHTML = parent.innerHTML + node;
        }else{
            parent.appendChild(node);
        }
    },

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

    nl2arr : function (coll) {
        var ret = [],
            i = 0;
        try{
            ret = [].slice.call(coll, 0);
        } catch(e){
            // what if coll[i] element is false? loop breaks
            // but this is not the case since collection has no falsy values
            for (null; coll[i]; ret[i] = coll[i++]);    
        }
        return ret;
    },

    byId : function (id) {
        return document.getElementById(id);
    },
    
    findByClass : function (cname, ctx) {
        ctx = ctx || document;
        var a = [],
            re = new RegExp('\\b' + cname + '\\b'),
            els = ctx.getElementsByTagName("*"),
            i = 0,
            l = els.length;
        for (null; i < l; i += 1) {
            if (re.test(els[i].className)) {
                a.push(els[i]);
            }
        }
        return a;
    },
    remove : function (el) {
        el.parentNode.removeChild(el);
    },
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
            val = val.toString();
            if (JMVC.array.find( this.css3_map, prop) + 1) {
                el.style.cssText += ';' + prop + ' : ' + val;
            } else {
                el.style[this.css_propertymap[prop] || prop + ""] = val;
            }
        }
        return this; 
    },
    bubbleTo : function (leafNode, tagstr) {
        var node = leafNode,
            tstr = tagstr.toLowerCase()
        while(node !== window && node.tagName.toLowerCase() != tstr) {
            node = node.parentNode;
        }
        return node;
    }
});
FG.makeNS('FG.bom', {
    getParams : function (){
        var search = window.document.location.search,
            params = {};
        if (search !== "") {
            // splitting an empty string give an array with one empty string
            els = search.substr(1).split('&');

            for (i = 0, len = els.length; i < len; i += 1) {
                lab_val = els[i].split('=');
                // do not override extra path params
                if (!params[lab_val[0]]) {
                    params[lab_val[0]] = lab_val[1];
                }
            }
        }
        return params;
    }
});
FG.makeNS('FG.io', {
    /**
     * That function is here OVERSIMPLIFIED
     * @param  {string} uri     the requested resource
     * @param  {literal} options options for the request
     * @return {undefined} undefined
     */
    ajax : function (uri, options) {
        var xhr = this.getXHR(),
            method = (options && options.method) || 'POST',
            cback = options && options.cback,
            // skipped all others cbacks
            sync = options && options.sync,
            data = (options && options.data) || false,
            type = (options && options.type) || 'text/html',
            targetType = type === 'xml' ?  'responseXML' : 'responseText',
            timeout = options && options.timeout || 3000,
            complete = false, res;

        xhr.onreadystatechange = function () {
            var tmp;
            if (xhr.readyState === "complete" || (xhr.readyState === 4 && xhr.status === 200)) {
                if (cback) {
                    res = xhr[targetType];
                    (function () {cback(res); })(res);
                }
            }
            //
            // here I ignore mid cases {loading : 3,received : 2}
            // 
            else if (xhr.readyState === 1) {
                switch (method) {
                    case 'POST':
                        try {
                            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                            xhr.send(data || true);

                        } catch (e1) {}
                    break;
                    case 'GET':
                        try {
                            tmp = {xml : 'text/xml', html : 'text/html', json : 'application/json'}[type] || 'text/html';
                            xhr.setRequestHeader("Accept", tmp + "; charset=utf-8");
                            xhr.send(null);
                        } catch (e2) {}
                    break;
                    default :
                        throw new Error('That silly lib can only handle GET & POST requests.');
                    break;
                }
                
            }
            return true;
        };

        //open request
        xhr.open(method, (method === 'GET') ? (uri + ((data) ? '?' + data : "")) : uri, sync);

        //thread abortion
        window.setTimeout(function () {if (!complete) {complete = true; xhr.abort(); } }, timeout);
        
        try {
            return (targetType === 'responseXML') ? xhr[targetType].childNodes[0] : xhr[targetType];
        } catch (e3) {}
        return true;
    },

    getXML : function (uri, cback) {
        this.ajax(uri, {
            method : 'GET',
            sync : false,
            type : 'xml',
            cback : cback || function () {}
        });
    },
    getXHR : function () {
        var xhr,
            IEfuckIds = ['Msxml2.XMLHTTP', 'Msxml3.XMLHTTP', 'Microsoft.XMLHTTP'],
            len = IEfuckIds.length,
            i = 0;

        try {
            xhr = new XMLHttpRequest();
        } catch (e1) {
            for (null; i < len; i += 1) {
                try {
                    xhr = new ActiveXObject(IEfuckIds[i]);
                } catch (e2) {continue; }
            }
            if (!xhr) {
                throw new Error('No way to initialize XHR');
            }
        }
        return xhr;
    }
});

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


(function () {
    
    "use strict";

    var topic2cbs = {},
        enabled = true;

    function enable() {enabled = false; }
    function disable() {enabled = true; }
    function pub(topic, args) {
        var i = 0,
            l;
        if (!(topic in topic2cbs) || !enabled) {
            return false;
        }
        for (l = topic2cbs[topic].length; i < l; i += 1) {
            topic2cbs[topic][i].apply(null, [topic].concat(args));
        }
        return true;
    }
    function sub(topic, cb) {
        var i = 0,
            l;
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

    FG.makeNS('FG.channel', {
        enable : enable,
        disable : disable,
        pub : pub,
        sub : sub,
        reset : reset
    });
})();

FG.makeNS('FG.obj');
FG.obj.xsltP = (function() {
    "use strict";
    // are we facing the greatest shit ....
    var damnIE = document.all && !(navigator.userAgent.match(/opera/i)),
        processor;

    function getProc(xslPath) {
        var p = false,
            damnIE_xsldoc, damnIE_xslt;

        if (damnIE) {
            damnIE_xsldoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.3.0");
            damnIE_xslt = new ActiveXObject("Msxml2.XSLTemplate.3.0");
            damnIE_xsldoc.async = false;
            damnIE_xsldoc.load(xslPath);
            damnIE_xslt.stylesheet = damnIE_xsldoc;
            p = damnIE_xslt.createProcessor();

        }// code for Mozilla, Firefox, Opera, etc.
        else{
            p = new XSLTProcessor();
            FG.io.getXML(xslPath, function (xDoc) {
                p.importStylesheet(xDoc);
            });
        }

        return {
            addParams: function(par) {
                var i = 0, l = par.length;
                for (null; i + 1 < l; i += 2) {
                    if (damnIE) {
                        p.addParameter(par[i], par[i + 1]);
                    } else {
                        p.setParameter(null, par[i], par[i + 1]);
                    }
                }
            },
            process: function(xmlDoc) {
                if (damnIE) {
                    p.input = xmlDoc;
                    p.transform();
                    return p.output;
                } else {
                    return p.transformToFragment(xmlDoc, document);
                }
            }
        };

    }

    function render(xmlUrl, dstNode, cb) {
        var xml = false,
            xsl = false,
            out;
        FG.io.getXML(xmlUrl, function (xmlDoc) {
            xml = xmlDoc;
            out = processor.process(xml);
            FG.dom.append(dstNode, out);
            cb && typeof cb === 'function' && cb(out);
        });
    }

    return {
        initProcessor : function (xslPath){
            processor = null;
            processor = getProc(xslPath);
            return this;
        },
        addParams : function (p) {
            processor.addParams(p);
            return this;
        },
        render : render
    };
    
})();

FG.list = (function () {
    "use strict";
    var options = null;

    function render(sources, node, cback, params) {

        FG.obj.xsltP.initProcessor(sources.xsl)
            .addParams(params instanceof Array ? params : [])
            .render(sources.xml, node, cback);
    }

    return {
        init : function (opts) {
            options = opts;
            return this;
        },
        renderList : function (n, cb, par){
            render(options.sources.list, n, cb, par);
        },
        renderDetail : function (n, cb, par){
            render(options.sources.articles, n, cb, par);
        }
    };
})();

FG.events.ready(function () {

    "use strict";

    var config = {
            sources : {
                list:{
                    xml : 'xml/list.xml',
                    xsl : 'xsl/list.xsl'
                },
                articles : {
                    xml : 'xml/article.xml',
                    xsl : 'xsl/article.xsl'  
                }
            },
            node : FG.dom.byId('dstNode')
        },
        items,
        // get params, switch on debug if querystring includes debug=true
        params = FG.bom.getParams();

    FG.debugActive = 'debug' in params && params.debug == "true";

    function render() {
        FG.dbg('rendering');
        FG.list.init(config).renderList(config.node, afterRenderList);
    }


    function afterRenderList() {   
        FG.dbg('afterRenderList');
        items = FG.dom.nl2arr( config.node.getElementsByTagName('li') );

        FG.events.bind(items, 'click', getDetail);
        FG.dbg('binded click on items');
    }

    function afterRenderArticle() {   
        FG.dbg('afterRenderArticle');
        items = FG.dom.nl2arr( config.node.getElementsByTagName('li') );

        FG.events.bind(document, 'keyup', getList);
        FG.dbg('binded esc keyup');
    }

    function getDetail(e) {
        FG.dbg('asking for detail publishing "getDetails" topic');
        FG.channel.pub('getDetails', [e, items]);
    
        FG.events.unbind(items, 'click', getDetail);
        FG.dbg('unbinded click on items');
    }

    function getList(e) {
        // escape
        if ( FG.events.code(e) == 27 ) {
            FG.dbg('asking to go back to the list publishinf "back" topic');
            FG.channel.pub('back', [e]);
            
            FG.events.unbind(document, 'keyup', getList);
            FG.dbg('unbinded esc keyup');
        } else {
            FG.dbg('escape to go back to the list');
        }
    }


    FG.channel.sub('getDetails', function (topic, e, items) {
        e = e || window.event;
        /**
         *  -- IE7 & IE8 currentTarget workaround --
         *  Here I had to degrade to the knowledge of the actual dom structure
         *  to get the currentTarget of the event
         */
        var trg = e.currentTarget || FG.dom.bubbleTo(e.srcElement, 'li'),
            nodeid = FG.dom.attr(trg, 'id'),
            getid = nodeid.split('-')[1],
            targetid = 'item-' + getid,
            i = 0,
            l = items.length;

        trg.style.cursor = 'default';

        FG.list.renderDetail(FG.dom.byId(targetid), afterRenderArticle, ['idArticle', getid]);

        for (null; i < l; i += 1) {
            if (targetid !== items[i].id) {
                FG.dom.remove(items[i]);
            }else{
                FG.dom.findByClass('short-desc', items[i])[0].style.display = 'none';
            }
        }
        
    });

    FG.channel.sub('back', function (topic, e) {
        //unbinding done, safe to clear
        config.node.innerHTML  = '';
        render();
    });

    FG.dbg('First render');
    render();
});



