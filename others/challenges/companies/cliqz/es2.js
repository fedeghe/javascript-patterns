/**
in nlogn
restituire il numero ordinato di coppie in A che sommate fanno K
*/

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution1(K, A) {
    var res = 0,
        map = {};
        
    // create a map complementars -> occurrence
    //
    A.forEach(function (el) {
       var k = K - el;
       if (!(k in map)) map[k] = 0;
       map[k]++;
    });
    
    // every element that has a key in complementars
    // contributes to the result with his map recordered occurrence
    //
    A.forEach(function (el) {
        if (el in map) res += map[el];
    });
     // slower functional
    // A.filter(el => el in map).forEach(e => res+=map[e])

    return res;
}

function solution2(K, A) {
    var res = 0,
        map = {},
        i = 0, l = A.length;
        
    // create a map complementars -> occurrence
    //
    for (null; i < l; i++) {
        var k = K - A[i];
        if (!(k in map)) map[k] = 0;
        map[k]++;
    }

    for (i = 0; i < l; i++) {
        if (A[i] in map) res += map[A[i]];
    }
    
    return res;
}

// both are O(n) with 
// c1 < c2




exports.solution1 = solution1;
exports.solution2 = solution2;