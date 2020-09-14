/**
 * At the core of function composition there's a compose function
 * which takes as parameter one or more functions
 * and returns a functoin which executes them all givin to the n+1-th function
 * the results of the n-th function
 */
function compose() {
    var funcs = [].slice.call(arguments, 0).reverse();
    return function () {
        var args = [].slice.call(arguments, 0);
        return funcs.reduce(function (acc, func) {
            var a = Array.isArray(acc) ? acc : [acc]
            return func.apply(null, a)
        }, args)
    }
}

/* ES6 version */
// const fn = (acc, el) => (...args) => el(acc(args)),
//     identityElement = a => a;

// module.exports = list => list.reduce(fn, identityElement);


// res = divideByLength ( sumOfAllElements( [... elements ] ) )

var mean = compose(
    function (sum, len) {
        return sum / len;
    },
    function () {
        var a = [].slice.call(arguments, 0);
        return [
            a.reduce(function (acc, el) { return acc + el; }, 0),
            a.length
        ]
    }
)

var t = mean(2, 40, 10, 23)

console.log(t)