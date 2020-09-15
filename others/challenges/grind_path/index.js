/**
 * That challenge comes from a former colleague, which unluckily had no
 * choice but leave the company
 * 
 * description
 * 
 * https://www.philgiese.com/post/interview-review-paths-between-two-points
 * 
 * 
 */


/*


    +---+---+---+---+
    |   |   |   | B |
    +---+---+---+---+
    |   |   |   |   |
    +---+---+---+---+
    |   |   |   |   |
    +---+---+---+---+
    | A |   |   |   |
    +---+---+---+---+

*/

/**
 * since from the description what immediately matters is the size of the grid
 * I first implemented a reverse simple recursive algorithm, recognising as 
 * exit condition the border, since when u reach the border, from there (given
 * the constraint about movement) only one path is possible
 */

const scan0 = (w, h) => {
    if (w === 0 || h === 0) return 1
    return scan0(w - 1, h) + scan0(w, h - 1)
}



// makes sense, pass dumb tests
// looks like anyway Points matters, also the starting one thus 
// I wrote the version Point friendly
// Point = {x, y}
//
// let scanCalls = 0

const scan1 = (A, B) => (function scanI(w, h) {
    if (w === 0 || h === 0) return 1
    return scanI(w - 1, h) + scanI(w, h - 1)
})(B.x - A.x, B.y - A.y)
// or almost equivalent
const scan2 = (A, B) => {
    // scanCalls++;
    if ((B.x === A.x) || (B.y === A.y)) return 1
    return scan2(A, { x: B.x, y: B.y - 1 })
        + scan2(A, { x: B.x - 1, y: B.y });
}

/**
 * all good, ... wouldn't exactly say so
 * ok ...results are correct but if u try to raise the line a bit
 * it literally explodes.
 * For example the scan function on the middle point of a squared grind
 * will be called as many time as there are paths passing there... dingg
 * yes ...memoization makes it not only a way faster, but also does not 
 * fill up the memory with an incredible number of unneeded calls
 * since it just trigger the scan function O(grindArea) ... with c = 1
 * thus we can say this is O(n) in space+time complexity
 */

const memoizedNumberOfPaths = (A, B) => {
    // let calculations = 0;
    const memo = {}, // O(area)
        scan = (A, B) => {
            if ((B.x === A.x) || (B.y === A.y)) return 1;
            return memoized(A, { x: B.x, y: B.y - 1 })
                + memoized(A, { x: B.x - 1, y: B.y });
        },
        memoized = (A, B) => {
            // no, I could not imagine a better collision-proof key! 
            const k = [A.x, A.y, B.x, B.y].join('-');
            if (!(k in memo)) {
                // calculations++;
                memo[k] = scan(A, B); // O (area)
            }
            return memo[k];
        }
        
    const res =  memoized(A, B);
    // console.log('Total calls: ' +  calculations);
    return res;
}


const iterative = (A, B) => {

}



module.exports = {
    scan0,
    scan1,
    scan2,
    memoizedNumberOfPaths
}

/**
 * Anther optimization is to write an interative version
 */




 /**
  * WAIT
  * check again the square I drew, and fill it reminds you something?
  * Tartaglia ? or Pascal triangle? 
  * thus there is most likely even a smarter solution to that
  */