// 16-10-2013
// jQuery version
//
//
jQuery(function(){

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
        //===================================================================
        //
        //
        tag = {
            list : jQuery('#' + IDS.list),
            description : jQuery('#' + IDS.description)
        },

        util = {
            ceil : function (n) {return (n + (n > 0 && !!(n % 1))) >> 0; },
            replaceall : function (tpl, o, dD, Dd, fback) {
                dD || (dD = '%');
                Dd || (Dd = '%');
                var reg = new RegExp(dD + '([A-z0-9-_]*)' + Dd, 'g'),
                    str;
                return tpl.replace(reg, function (str, $1) {
                    return (typeof o === 'function' ? o($1) : o[$1]) || fback || dD + $1 + Dd;
                });
            }
        },
        listLength = list.length,
        colHeight = util.ceil(listLength / NUMBER_OF_COLUMNS),
        currentl = null,
        colnum = 0,
        j = 0,
        i, l;

    //reorder
    list = list.sort(function (e1, e2){return e1.name > e2.name;});

    //build the list
    for (i  = 0, l = list.length; i < l; i++) {
        j %= colHeight;

        // the second condition allows to have the correct number of columns
        // even when all the element could be contained in less columns
        // (eg: 4 elements in 3 colums)
        if (j === 0 || (listLength - i) <= (NUMBER_OF_COLUMNS - colnum)) {
            colnum++;
            currentl = null;
            currentl = jQuery('<ul>');
            tag.list.append(currentl);
        }
        
        currentl.append(
            jQuery('<li>')
            .attr({'class' : 'cityname', 'data-n' : i})
            .html( util.replaceall(linetpl, {name : list[i].name, num : list[i]['count']}) )
        );
        j++;
    }
    
    //append a clearer
    tag.list.append(jQuery('<br>').addClass('clearer'));
    

    //bind
    tag.list.on('click', function (e, i){
        var which = jQuery(e.target).parent().attr('data-n');
        if (which !== false && which in list) {
           tag.description.html(list[which].content);
        }
    });
});