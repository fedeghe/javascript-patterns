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


