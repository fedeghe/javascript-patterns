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