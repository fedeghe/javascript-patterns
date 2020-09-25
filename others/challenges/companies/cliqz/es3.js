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
                        (m1[0][0] * m2[0][0] + m1[0][1] * m2[1][0]) % mod,
                        (m1[0][0] * m2[0][1] + m1[0][1] * m2[1][1]) % mod
                    ],[
                        (m1[1][0] * m2[0][0] + m1[1][1] * m2[1][0]) % mod,
                        (m1[1][0] * m2[0][1] + m1[1][1] * m2[1][1]) % mod
                    ]];
                    wm.set([m1,m2], r);
                    return r;
                }
            }
        })();

    // here r is supposed always to be a 2pow
    function unitFibPow(r) {
        var unit = [[1, 1], [1, 0]],
            mid = r - 1;
        if (r == 0) return unit;
        else return matMultSq2(unitFibPow(mid), unitFibPow(mid));
    }

    function factors(n) {
        var nBin = (n >>> 0).toString(2),
            res = [],
            i = 0, l = nBin.length;
        for(null; i < l; i++) 
            nBin[i] === "1" && res.push(l - i - 1);
        return res;
    }

    function matFactors(f2) {
        var m = [];
        f2.forEach(function (el) {
            m.push(unitFibPow(el));
        });
        return m;
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
