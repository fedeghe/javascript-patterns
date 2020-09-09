
var prototypize = (function () {
    return function (p) {
        function T() {}
        T.prototype = p;
        return new T();
    };
})();

var skateProto = {
    init: function (model, owner) {
        this.modal = model;
        this.owner = owner;
    }
}

function createSkate () {
    return prototypize(skateProto)
}

var mySkate = createSkate();
mySkate.init('SMA', 'Natas Kaupas');
console.log(mySkate)

