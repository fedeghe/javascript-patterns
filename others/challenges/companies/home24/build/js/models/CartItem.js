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
