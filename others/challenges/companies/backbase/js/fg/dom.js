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