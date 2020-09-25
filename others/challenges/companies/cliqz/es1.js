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
    var l = A.length - 1,
        divergence = [].slice.call(A), // for divergence check
        index = 0,
        stepsForExit = 0,
        done = false;
    function move() {
        
        // already visited -> diverge
        if (divergence[index] === true) {
            done = true;
            return stepsForExit = -1;
        }
        
        // move at the function last line if
        // the exit step must mot be taken into account
        stepsForExit++;
        
        // visited now
        divergence[index] = true;
        
        // move
        index += A[index];
        
        // out of bounds ?
        if (index < 0 || index > l) {
            return done = true;
        }
    }
    
    while (!done) move();
    
    // before!... so add one to take into account the outstep
    return stepsForExit;
}

module.exports = solution;


