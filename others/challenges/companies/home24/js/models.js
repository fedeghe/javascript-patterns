/**
 * 
 */
/*
[MALTA] /js/models/Cart.js
*/
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
/*
[MALTA] /js/models/Item.js
*/
H24.makeNS('H24/obj');
H24.obj.Item = function () {
    throw new Exception('Abstract class cannot be instantiated');
};
H24.obj.Item.prototype = {
    id : '',
    name : 'unknown',
    image : 'itemPlaceholder.png',
    price : 'unknown',
    alt : '',
    action : false,
    tpl : '<div class="lfloat">' + 
        '<h2>%name_label% : %name%</h2>'+
        '<h3>%price_label% : %price% ' + H24.setting.currency + '</h3>'+
    '</div>'+
    '<div class="rfloat">'+
        '<img src="%image%" alt="%alt%" class="round8" />'+
        '<button data-action="%action%" data-params="id:%id%" class="round8 rfloat">%action_butt%</button>' +
    '</div><br class="clearer"/>',
};
/**
 * set data for that Item
 * @param {[type]} p [description]
 */
H24.obj.Item.prototype.set = function (p) {
    this.origData = p;
    this.id = H24.utils.uniqueId + "";
    this.name = p.name || this.name;
    this.image = p.image || this.image;
    this.price = p.price || this.napriceme;
    this.alt = p.alt || this.alt;
    this.tpl = p.tpl || this.tpl;
    this.name_label = H24.i18n.get('name');
    this.price_label = H24.i18n.get('price');
};
/**
 * get DOMnode corresponding to that Item
 * @return {DOMnode} the Item node
 */
H24.obj.Item.prototype.getNode = function () {
    var node = document.createElement('div');
    node.setAttribute('id', this.id);
    node.innerHTML = H24.string.replaceall(this.tpl, {
        id : this.id,
        name : this.name,
        image : this.image,
        price : this.price,
        action : this.action,
        action_butt : this.action_butt || 'action',
        name_label : this.name_label || 'Name',
        price_label : this.price_label || 'Price',
        alt : this.alt
    });
    return node;
};
/*
[MALTA] /js/models/ListItem.js
*/
H24.makeNS('H24/obj');
/**
 * ListItem object that extends Item
 * meant to be used as Item in the Front product list
 */
H24.obj.ListItem = function () {
    this.id = H24.utils.uniqueId + '';
    this.action = 'add';
    this.action_butt = H24.i18n.get('button_add');
};
H24.core.inherit(H24.obj.ListItem, H24.obj.Item);
/*
[MALTA] /js/models/CartItem.js
*/
H24.makeNS('H24/obj');

/**
 * CartItem object that extends Item
 * meant to be used as Item in the Cart product list
 */
H24.obj.CartItem = function () {
    this.action = 'remove';
    this.action_butt = H24.i18n.get('button_remove');
    this.tpl = '<div class="fleft">' + 
            '<h3>%name_label% : %name%</h3>'+
            '<h3>%price_label% : %price% ' + H24.setting.currency + '</h3>'+
        '</div>'+
        '<div class="rleft">'+
            '<div><img src="%image%" alt="%alt%" /></div>'+
            '<button data-action="%action%" data-params="id:%id%" class="round8">%action_butt%</button>' +
        '</div><br class="clearer" />';
};
H24.core.inherit(H24.obj.CartItem, H24.obj.Item);

/*
[MALTA] /js/models/List.js
*/
H24.makeNS('H24.obj');
H24.obj.List = function (node, ItemClass) {
    //debugger;
    this.dataEls = [];
    this.elements = [];
    this.Item = ItemClass;
    this.node = node;
    node.innerHTML = "";
    this.dom = document.createElement("ul");
    this.rendered = false;
}

/**
 * Add elements to the List
 * @param {Literal} els  Literal got from xhr
 */
H24.obj.List.prototype.add = function (els) {
    var self = this,
        item, tmp, i, l,
        node;
    for (i = 0, l = els.length; i < l; i++) {
        tmp = document.createElement("li");
        tmp.className = 'round8';
        item = new self.Item();
        item.set(els[i]);
        node = item.getNode();
        this.elements.push(node);   
        this.dataEls.push(els[i]);
        tmp.appendChild(node);
        this.dom.appendChild(tmp);
    }   
    return self;
}

/**
 * Remove an element from the List
 * @param  {String} id      the id assigned automatically to an Item
 * @return {Object}         the instance of Item subsclass
 *                          corresponding to the passed id 
 */
H24.obj.List.prototype.remove = function (id) {
    for (var i = 0, l = this.elements.length; i < l; i++) {
        if (this.elements[i].id == id) {
            H24.dom.remove(this.elements[i].parentNode)
            this.elements.splice(i, 1);
            return;
        }
    }
};

/**
 * get the size of the list
 * @return {Number} the size of the list
 */
H24.obj.List.prototype.size = function () {
    return this.elements.length;
};

/**
 * Render the list
 * @return {undefined} 
 */
H24.obj.List.prototype.render = function () {
    if (!this.rendered) {
        this.rendered = true;
        this.node.appendChild(this.dom);
    }
}

/**
 * get data corresponding to an id
 * @param  {String} id an id autoassigned to an Item of the List
 * @return {Mixed}    the data of false
 */ 
H24.obj.List.prototype.get = function (id) {
    for (var i = 0, l = this.elements.length; i < l; i++) {
        if (this.elements[i].id == id) {
            return this.dataEls[i];
        }
    }
    return false;
}




