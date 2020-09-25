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