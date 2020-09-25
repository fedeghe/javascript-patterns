H24.makeNS('H24.utils');

/**
 * simple debug function
 * @param  {Mixed} m the element to be debugger
 * @return {undefined}
 */
H24.utils.debug = function (m) {
    var W = window;
    try {
        W.console.log(m);
    } catch (e1) {
        try {
            W.opera.postError(m);
        } catch (e2) {
            W[W.hasOwnProperty('log') ? 'log' : 'alert'](m);
        }
    }
};