


var DbMultiton = (function (maxInstances) {
    var instances = [],

        //the class that needs to be under multiton
        DatabaseConnection = function (n) {
            this.db = 'connection # ' + n;
        };

    // will be called as constructor thus must return a instance
    return function (n) {
        var instance;
        if (instances.length < maxInstances) {
            instance = new DatabaseConnection(n);
            instances.push(instance);
        }
        else {
            instance = instances[Math.floor(Math.random() * maxInstances)];
        }
        return instance;
    }
})(3);

var m1 = new DbMultiton(1),
    m2 = new DbMultiton(2),
    m3 = new DbMultiton(3),
    m4 = new DbMultiton(4),
    m5 = new DbMultiton(5);

console.log(m1)
console.log(m2)
console.log(m3)
console.log(m4)
console.log(m5)