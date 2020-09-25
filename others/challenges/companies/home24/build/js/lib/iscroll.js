H24.makeNS('H24.iscroll');
H24.iscroll = (function (){

    var cback = false;

    return {
        enable : function (cb1, cb2) {
            if (!cback && typeof cb1 !== 'function') {
                throw new Exception('Function required');
            }
            cback = cb1 || cback;
            H24.events.bind(window, 'scroll', function (e) {
                cback && cback.call(null);
                cb2 && cb2();
            });
        },
        disable : function () {
            H24.events.bind(window, 'scroll', cback);
        }
    };

})();