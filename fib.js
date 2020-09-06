/*
* memoize.js
* by @philogb and @addyosmani
* with further optimizations by @mathias
* and @DmitryBaranovsk
* perf tests: http://bit.ly/q3zpG3
* Released under an MIT license.
*/
function memoize( fn ) {

    return function () {
        var args = [].slice.call(arguments),
            hash = "",
            i = args.length;
        currentArg = null;
        while (i--) {
            currentArg = args[i];
            hash += (currentArg === Object(currentArg)) ?
            	JSON.stringify(currentArg)
            	:
            	currentArg;
            fn.memoize || (fn.memoize = {});
        }
        return (hash in fn.memoize) ?
        	fn.memoize[hash] :
        	fn.memoize[hash] = fn.apply(this, args);
    };
    
}
function fib(x) {
    return x < 2 ?  1 : fib(x-1) + fib(x-2);
}

/*console profiling test*/

var fibTest = memoize(fib);
//first call
console.time("non-memoized call");
console.log(fib(20)); //varies (eg.10946)
console.timeEnd("non-memoized call");

//let's see how much better memoization fares..

console.time("memoized call");
console.log(fibTest(20));
//0ms in most cases (if already cached)
console.timeEnd("memoized call");