
(function () {
    
    "use strict";

    var topic2cbs = {},
        enabled = true;

    function enable() {enabled = false; }
    function disable() {enabled = true; }
    function pub(topic, args) {
        var i = 0,
            l;
        if (!(topic in topic2cbs) || !enabled) {
            return false;
        }
        for (l = topic2cbs[topic].length; i < l; i += 1) {
            topic2cbs[topic][i].apply(null, [topic].concat(args));
        }
        return true;
    }
    function sub(topic, cb) {
        var i = 0,
            l;
        if (topic instanceof Array) {
            for (l = topic.length; i < l; i += 1) {
                sub(topic[i], cb);
            }
        }
        if (!(topic in topic2cbs) || !enabled) {
            topic2cbs[topic] = [];
        }
        topic2cbs[topic].push(cb);
    }
    function reset() {
        var ts = Array.prototype.slice.call(arguments, 0),
            l = ts.length,
            i = 0;
        if (!l) {
            topic2cbs = {};
            return;
        }
        for (null; i < l; i += 1) {
            if (ts[i] in topic2cbs) {
                topic2cbs[ts[i]] = [];
            }
        }
    }

    FG.makeNS('FG.channel', {
        enable : enable,
        disable : disable,
        pub : pub,
        sub : sub,
        reset : reset
    });
})();
