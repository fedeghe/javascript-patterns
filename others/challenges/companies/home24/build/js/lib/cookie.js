H24.makeNS('H24.cookie');

H24.cookie = (function (){
    var w = window,
        wd = w.document,
        body = wd.body,
        cookie_nocookiesaround = false;

    return  {
        set : function (name, value, expires, path, domain, secure) {
            "use strict";
            
            var today = new Date(),
                expires_date = new Date(today.getTime() + expires);
            expires && (expires = expires * 1000 * 60 * 60 * 24);
            wd.cookie = name +
                "=" + w.escape(value) +
                (expires ? ";expires=" + expires_date.toGMTString() : "") +
                (path ? ";path=" + path : "") +
                (domain ? ";domain=" + domain : "") +
                (secure ? ";secure" : "");
            return true;
        },

        get : function (check_name) {
            "use strict";
            var a_all_cookies = wd.cookie.split(';'),
                a_temp_cookie = '',
                cookie_name = '',
                cookie_value = '',
                b_cookie_found = false,
                i = 0,
                l = a_all_cookies.length;
            for (null; i < l; i += 1) {
                a_temp_cookie = a_all_cookies[i].split('=');
                cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
                if (cookie_name === check_name) {
                    b_cookie_found = true;
                    a_temp_cookie.length > 1 && (cookie_value = w.unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, '')));
                    return cookie_value;
                }
                a_temp_cookie = null;
                cookie_name = '';
            }
            return b_cookie_found;
        },
        del : function (name, path, domain) {
            "use strict";
            var ret = false;
            if (this.get(name)) {
                wd.cookie = name + "=" + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
                ret = true;
            }
            return ret;
        }
    };
})();