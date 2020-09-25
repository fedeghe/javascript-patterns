FG.list = (function () {
    "use strict";
    var options = null;

    function render(sources, node, cback, params) {
        FG.obj.xsltP.initProcessor(sources.xsl)
            .addParams(params instanceof Array ? params : [])
            .render(sources.xml, node, cback);
    }

    return {
        init : function (opts) {
            options = opts;
            return this;
        },
        renderList : function (n, cb, par){
            render(options.sources.list, n, cb, par);
        },
        renderDetail : function (n, cb, par){
            render(options.sources.articles, n, cb, par);
        }
    };
})();