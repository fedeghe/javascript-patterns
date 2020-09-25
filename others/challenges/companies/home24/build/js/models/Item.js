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