var DbMultiton = (function () {
    var instances = [],
        maxInstances = 3;

    // the class that needs to be under multiton
    function DatabaseConnection(key) {
        this.db = 'connection # ' + key;
    }

    // will be called as constructor thus must return a instance
    return function (k, or) {
        var instance;
        or = (or || 0) % maxInstances;
        if (instances.length < maxInstances) {
            instance = new DatabaseConnection(k);
            instances.push(instance);
        }
        else {
            instance = instances[or];
        }
        return instance;
    }
})();

var m1 = new DbMultiton(1),
    m2 = new DbMultiton(2),
    m3 = new DbMultiton(3),
    m4 = new DbMultiton(4, 1),
    m5 = new DbMultiton(5, 2);

console.log(m1)
console.log(m2)
console.log(m3)
console.log(m4)
console.log(m5)