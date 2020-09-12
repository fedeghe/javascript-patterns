// the simple
var greaterThan = function(n) {
        return function (s) { return s > n};
    },
    greaterThan10 = greaterThan(10),
    res = [
        greaterThan10(2),
        greaterThan10(10),
        greaterThan10(11)
    ];
console.log(res)