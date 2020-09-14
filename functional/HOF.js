// FOLLOW SOME EXAMPLES

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

// ==========

function withDebug(fn) {
    return function () {
        var args = [].slice.call(arguments, 0);
        console.log('`' + fn.name + '` called with arguments: ' + args);
        var res = fn.apply(null, args);
        console.log('result: ' + res);
        return res;
    }
}

function sum(a, b) { return a + b}

var sumWithDebug = withDebug(sum)
var r = sumWithDebug(2,9)
console.log(r)

// ==========

