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