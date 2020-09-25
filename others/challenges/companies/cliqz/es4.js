module.exports = (function () {

    var mod = 1E6, 
        matMultSq2 = (function () {
            // for memoization (seen the nature of the keys) a weakMap looks
            // nowadays a good candidate
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
            var wm = new WeakMap;
            return function (m1, m2) {
                var r;
                if (wm.has([m1,m2])) {
                    r = wm.get([m1,m2]);
                } else {
                    // here we could even use strassen
                    r = [[
                        (m1[0][0]*m2[0][0] + m1[0][1]*m2[1][0]) % mod,
                        (m1[0][0]*m2[0][1] + m1[0][1]*m2[1][1]) % mod
                    ],[
                        (m1[1][0]*m2[0][0] + m1[1][1]*m2[1][0]) % mod,
                        (m1[1][0]*m2[0][1] + m1[1][1]*m2[1][1]) % mod
                    ]];
                    wm.set([m1,m2], r);
                    return r;
                }
            }
        })(),
        unitFibPow = (function (){
            var map = {},
                unit = [[1,1],[1,0]];
            return function _fun(n) {
                var mid = n - 1,
                    f;
                if (n in map) return map[n];

                if (n===0) {
                    map[n] = unit;
                } else {
                    f = _fun(mid),
                    map[n] = matMultSq2(f, f);
                }
                return map[n];
            }
        })(),
        matFactors = (function () {
            var map = {};
            return function (f2) {
                var m = [];
                f2.forEach(function (el) {
                    if (!(el in map)) {
                        map[el] = unitFibPow(el);
                    }
                    m.push(map[el]);
                });
                return m;
            }
        })();

    function factors(n) {
        var nBin = (n >>> 0).toString(2),
            res = [],
            i = 0, l = nBin.length;
        for(null; i < l; i++) 
            nBin[i] === "1" && res.push(l - i - 1);
        return res;
    }

    function multMats(mats) {
        var j = mats[0],
            i = 1, l = mats.length;
        for (null; i < l; i++) {
            j = matMultSq2(j, mats[i]);
        }
        return j;
    }
    /**
     * returns the first 6 significative digits of the N-th Fib
     *
     * @param      {number} N   position in the fib succ
     * @return     {(exception|number)} the first 6 significative digits of the N-th Fib
     */
    function solution(N) {
        if (N < 0) throw 'not in Fibonacci function domain';
        if (N === 0) return 0;
        if (N < 3) return 1;
        var nFactorsOf2 = factors(N - 1),
            mats = matFactors(nFactorsOf2),
            r = multMats(mats);
        return r[0][0] % mod; 
    }
    return {
        solution : solution,
        matMultSq2 : matMultSq2,
        unitFibPow : unitFibPow,
        factors : factors,
        matFactors : matFactors,
        multMats : multMats
    };
})();
