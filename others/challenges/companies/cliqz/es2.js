/**
in nlogn
restituire il numero ordinato di coppie in A che sommate fanno K
*/

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(K, A) {
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
    
    return res;
}


module.exports = solution;