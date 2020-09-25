/**

input array [integer]
fissato un indice iniziale i = 0

 parte dall'i e ne legge il contenuto cnt
 si muove di i+=cnt (avanti o indietro)

se esce dagli indici fine 

restituire il numero di passi prima di uscire
oppure -1 se non converge

*/

function solution(A) {
    var B = [];
    A.filter(function (a) {
        if(a && (a & (a - 1)) === 0) B.push(""+ (a * a));
        return false;
    });
    return B;
}

module.exports = solution;


