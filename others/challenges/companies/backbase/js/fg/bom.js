FG.makeNS('FG.bom', {
    getParams : function (){
        var search = window.document.location.search,
            params = {};
        if (search !== "") {
            // splitting an empty string give an array with one empty string
            els = search.substr(1).split('&');

            for (i = 0, len = els.length; i < len; i += 1) {
                lab_val = els[i].split('=');
                // do not override extra path params
                if (!params[lab_val[0]]) {
                    params[lab_val[0]] = lab_val[1];
                }
            }
        }
        return params;
    }
});