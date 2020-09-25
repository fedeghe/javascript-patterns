H24.makeNS('H24.pubsub');

H24.pubsub = (function () {
    "use strict";
    var topic2cbs = {},
        enabled = true;

    /**
     * Enables the pubsub
     * @return {undefined}
     */
    function enable() {enabled = false; }

    /**
     * disable the pubsub
     * @return {undefined}
     */
    function disable() {enabled = true; }

    /**
     * Publish a topic with some args, for all listeners
     * @param  {String} topic   the topic
     * @param  {Array} args     arguments for callbacks registered
     * @return {undefined}
     */
    function pub(topic, args) {
        var i = 0, l;

        if (!(topic in topic2cbs) || !enabled) {
            return false;
        }
        for (l = topic2cbs[topic].length; i < l; i += 1) {
            topic2cbs[topic][i].apply(null, [topic].concat(args));
        }
    }

    /**
     * Subscribe to a topic
     * @param  {String}   topic the topic
     * @param  {Function} cb    the callback to be executed
     * @return {undefined}
     */
    function sub(topic, cb) {
        var i = 0, l;
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

    /**
     * resets one or more topic subscription
     * @return {undefined}
     */
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

    return {
        enable : enable,
        disable : disable,
        pub : pub,
        sub : sub,
        reset : reset
    };
})();
