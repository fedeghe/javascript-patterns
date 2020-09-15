function mixins(objs, override) {
    return objs.reduce(function (acc, el) {
        return Object.keys(el).reduce(function (eAcc, key) {
            eAcc[key] = ((key in eAcc) && !override) ? eAcc[key] : el[key];
            return eAcc;
        }, acc);
    }, {});
}
var objs = [
    { a: 1, b: 1 },
    { b: 2, c: 2 },
    { c: 3 }
];

var m1 = mixins(objs),
    m2 = mixins(objs, true)

console.log(m1)
console.log(m2)