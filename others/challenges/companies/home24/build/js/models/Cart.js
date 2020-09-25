H24.makeNS('H24/obj');

/**
 * Basic cart object
 * @param {DOMnode} node    the node where the cart will be rendered
 * @param {Domnode} butt    the node that will fire cart appearence
 */
H24.obj.Cart = function (node, butt) {
    var self = this,
        listWrap = document.createElement('div');

    self.butt = butt;

    // set label from i18n for the button
    // that allows Cart appearence
    self.butt.innerHTML = H24.i18n.get('my_cart');

    self.node = node; 

    // initialize cart
    // 
    self.init();

    // append the wrapper to the target node
    node.appendChild(listWrap);

    // get a list for the cart, passing the destination node
    // and the constructor reference for the item subclass to be used here
    self.list = new H24.obj.List(listWrap, H24.obj.CartItem);

    // render the list
    self.list.render();

    // try to focus on mouseenter
    H24.events.bind(node, 'mouseenter', function () {this.focus(); });
};

/**
 * create header, close button and empty-cart label
 * @return {undefined}
 */
H24.obj.Cart.prototype.init = function () {
    var self = this,
        h = self.head = document.createElement('div'),
        c = self.close = document.createElement('div'),
        n = self.nodata = document.createElement('div')

    h.className = 'cartHeader round8';
    h.innerHTML = self.butt.innerHTML;
    
    c.setAttribute('data-action', 'hideCart');
    c.className = 'close round10';
    c.innerHTML = 'x';

    n.className = 'nodata';
    n.innerHTML = H24.i18n.get('no_items');
    
    self.node.appendChild(h);
    self.node.appendChild(c);
    self.node.appendChild(n);
};

/**
 * Add an item to the cart
 * @param {Literal} nodeData    one entry from data retrieved
 */
H24.obj.Cart.prototype.add = function (nodeData) {

    var sync = false;

    // requirement for comunicate with the server
    // and get back a status message, added.js contains "200"
    // this status message will be found on console as far as
    // an item is added to the cart
    // 
    H24.io.post ('srv/added.js', function (d) {
        if (d) {
            H24.utils.debug(d);
        }
    }, sync, nodeData); 

    // remove the no-data div
    // 
    H24.dom.hide(this.nodata);

    // add element to the Cart List object
    // the List object will update the dom
    //
    this.list.add([nodeData]);

    //  allow chain
    //  
    return this;
};

/**
 * removes an element from the Cart
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
H24.obj.Cart.prototype.remove = function (id) {
    
    // remove the element from the List
    // starting from autoassigned id
    // the List object will update the dom
    //
    this.list.remove(id);  

    // in the case the List of The cart gets empty
    // show the no-data div
    // 
    if (!this.list.size()) {
        H24.dom.show(this.nodata);
    }

    // allow chain
    // 
    return this;
};

/**
 * Show the Cart
 * @return {undefined}
 */
H24.obj.Cart.prototype.show = function () {
    // adjust height on the fly, a bit ugly
    H24.dom.style(this.list.dom, 'maxHeight', (H24.utils.screen.viewportHeight() - 130) + 'px');

    // hide the button that allows to show the cart,
    // prevents ugliness due to styiling imperfections
    // 
    H24.dom.style(this.butt, 'visibility', 'hidden');

    // show the node that contains the Cart (by default hidden)
    // 
    H24.dom.show(this.node);

    // allow chain
    // 
    return this;
};

/**
 * hide the Cart
 * @return {[type]} [description]
 */
H24.obj.Cart.prototype.hide = function () {

    // hide the node that contains the Cart
    //
    H24.dom.hide(this.node);

    // make visible the button that allow Cart appearence
    // 
    H24.dom.style(this.butt, 'visibility', 'visible');

    // allow chain
    // 
    return this;
};