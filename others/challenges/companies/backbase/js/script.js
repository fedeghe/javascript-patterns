
FG.events.ready(function () {

    "use strict";

    var config = {
            sources : {
                list:{
                    xml : 'xml/list.xml',
                    xsl : 'xsl/list.xsl'
                },
                articles : {
                    xml : 'xml/article.xml',
                    xsl : 'xsl/article.xsl'  
                }
            },
            node : FG.dom.byId('dstNode')
        },
        items,
        // get params, switch on debug if querystring includes debug=true
        params = FG.bom.getParams();

    FG.debugActive = 'debug' in params && params.debug == "true";

    function render() {
        FG.dbg('rendering');
        FG.list.init(config).renderList(config.node, afterRenderList);
    }

    function afterRenderList() {   
        FG.dbg('afterRenderList');
        items = FG.dom.nl2arr( config.node.getElementsByTagName('li') );

        FG.events.bind(items, 'click', getDetail);
        FG.dbg('binded click on items');
    }

    function afterRenderArticle() {   
        FG.dbg('afterRenderArticle');
        items = FG.dom.nl2arr( config.node.getElementsByTagName('li') );

        FG.events.bind(document, 'keyup', getList);
        FG.dbg('binded esc keyup');
    }

    function getDetail(e) {
        FG.dbg('asking for detail publishing "getDetails" topic');
        FG.channel.pub('getDetails', [e, items]);
    
        FG.events.unbind(items, 'click', getDetail);
        FG.dbg('unbinded click on items');
    }

    function getList(e) {
        // escape
        if ( FG.events.code(e) == 27 ) {
            FG.dbg('asking to go back to the list publishinf "back" topic');
            FG.channel.pub('back', [e]);
            
            FG.events.unbind(document, 'keyup', getList);
            FG.dbg('unbinded esc keyup');
        } else {
            FG.dbg('escape to go back to the list');
        }
    }


    FG.channel.sub('getDetails', function (topic, e, items) {
        e = e || window.event;
        /**
         *  -- IE7 & IE8 currentTarget workaround --
         *  Here I had to degrade to the knowledge of the actual dom structure
         *  to get the currentTarget of the event
         */
        var trg = e.currentTarget || FG.dom.bubbleTo(e.srcElement, 'li'),
            nodeid = FG.dom.attr(trg, 'id'),
            getid = nodeid.split('-')[1],
            targetid = 'item-' + getid,
            i = 0,
            l = items.length;

        trg.style.cursor = 'default';

        FG.list.renderDetail(FG.dom.byId(targetid), afterRenderArticle, ['idArticle', getid]);

        for (null; i < l; i += 1) {
            if (targetid !== items[i].id) {
                FG.dom.remove(items[i]);
            } else {
                FG.dom.findByClass('short-desc', items[i])[0].style.display = 'none';
            }
        }
    });

    FG.channel.sub('back', function (topic, e) {
        //unbinding done, safe to clear
        config.node.innerHTML  = '';
        render();
    });

    FG.dbg('First render');

    render();
});



