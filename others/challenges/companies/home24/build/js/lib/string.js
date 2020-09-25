H24.makeNS('H24/string', {
    /**
     * templating function
     * @param  {String} tpl     the template
     * @param  {Literal} obj    the Object Literal containing data to be used in the template  
     * @param  {String} start   the placeholder starting delimiter (optional, default %)
     * @param  {String} end     the placeholder ending delimiter (optional, default %)
     * @param  {function} fb    a callback to be called if no matches are found on the object,
     * @return {String}         the template with substituted values
     */
    replaceall : function (tpl, obj, start, end, fb) {
        start = start || '%';
        end = end || '%';
        var reg = new RegExp(start + '([A-z0-9-_]*)' + end, 'g'),
            straight = true,
            str, tmp;
        //fb = fb || false;
        while (straight) {
            if (!(tpl.match(reg))) {
                return tpl;
            }
            tpl = tpl.replace(reg, function (str, $1) {
                switch (true) {
                    // 
                case typeof obj === 'function' :
                    // avoid silly infiloops
                    tmp = obj($1);
                    return (tmp !== start + $1 + end) ? obj($1)  : $1;
                    // the label matches a obj literal element
                    // use it
                case $1 in obj :
                    return obj[$1];
                    /**
                     * not a function and not found in literal
                     * use fallback if passed or get back the placeholder
                     * switching off before returning
                     */
                default:
                    straight = false;
                    return (fb && fb($1)) || start + $1 + end;
                }
            });
        }
        return tpl;
    }
});