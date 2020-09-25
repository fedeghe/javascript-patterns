// 16-10-2013
// pure version
//
//
window.onload = function () {

    var NUMBER_OF_COLUMNS = 3,

        list = [
            {name: "Moscow", count: 12, content: "<p>description</p>"},
            {name: "Amsterdam", count: 25, content: "html <b>Amsterdam</b>"},
            {name: "Lisbon", count: 15, content: "<i>html</i> Lisbon"},
            {name: "Berlin", count: 19, content: "htm<b>l B</b>erlin"},
            {name: "Madrid", count: 25, content: "<u>html</u> Madrid"}
        ],

        IDS = {
            list : 'list',
            description : 'description'
        },

        linetpl = '<a href="javascript:;">%name%</a> (%num%)',
        /////////////////////////////////////////////////////////////////



        w = window,
        wd = window.document,
        tag = {
            list : wd.getElementById(IDS.list),
            description : wd.getElementById(IDS.description)
        }
    
        util = {
            ceil : function (n) {return (n + (n > 0 && !!(n % 1))) >> 0; },
            nsort : function (l, f){ return list.sort(function (e1, e2){
                    return e1[f] > e2[f];
                })
            },
            bind : function (el, etype, fn){
                //minimal delegation
                var f = function (e) {fn.call(el, e || w.event); };
                if (w.addEventListener) {
                    el.addEventListener(etype, fn, false);
                } else if (w.attachEvent) {
                    el.attachEvent('on' + etype, f);
                }else{
                    el['on' + etype] = f;
                }
            },
            create : function (tag, attrs, inner) {
                var node = wd.createElement(tag),
                    att;
                attrs = attrs || {};
                for (att in attrs) {
                    if (attrs.hasOwnProperty(att)) {
                        node.setAttribute(att + '',  attrs[att] + '');
                    }
                }
                if (typeof inner !== 'undefined') {
                    if (inner.nodeType === 1) {
                        node.appendChild(inner);
                    } else {
                        // ###
                        node.innerHTML = inner;
                    }
                }
                return node;
            },
            replaceall : function (tpl, o, dD, Dd, fback) {
                dD || (dD = '%');
                Dd || (Dd = '%');
                var reg = new RegExp(dD + '([A-z0-9-_]*)' + Dd, 'g'),
                    str;
                return tpl.replace(reg, function (str, $1) {
                    return (typeof o === 'function' ? o($1) : o[$1]) || fback || dD + $1 + Dd;
                });
            },
            target : function (e){
                e = e ? e : wd.event;
                var targetElement = e.currentTarget || (typeof e.target !== "undefined") ? e.target : e.srcElement;
                if (!targetElement) {
                    return false;
                }
                while (targetElement.nodeType == 3 && targetElement.parentNode != null) {
                    targetElement = targetElement.parentNode;
                }
                return targetElement;
            }
        },
        listLength = list.length,
        colHeight = util.ceil(listLength / NUMBER_OF_COLUMNS);


    //ORDER by name
    list = util.nsort(list, 'name');

    //BUILD THE LIST
    for (var i = 0, j = 0, colnum = 0, currentl = null; i < listLength; i++, j++) {
        j %= colHeight;
        if (j === 0 || (listLength-i) <= (NUMBER_OF_COLUMNS-colnum)) {
            colnum++;
            currentl = null;
            currentl = util.create('ul');
            tag.list.appendChild(currentl);
        }
        currentl.appendChild(util.create(
            'li',
            {'class' : 'cityname', 'data-n' : i},
            util.replaceall(linetpl, {name : list[i].name, num : list[i]['count']})
        ));
    }
    //add clearer
    var tmp  = util.create('br');
    tmp.className = 'clearer';
    tag.list.appendChild(tmp);


    //bind
    util.bind(tag.list, 'click', function (e){
        
        var trg = util.target(e),
            which = false;

        if (trg && trg.nodeName === 'A' && trg.parentNode.getAttribute('class') === 'cityname') {
            which  = trg.parentNode.getAttribute('data-n') || false;
            if (which !== false) {
                tag.description.innerHTML = list[which].content;
            }
        }
    });
}
