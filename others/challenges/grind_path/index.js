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

    const res = memoized(A, B);
    // console.log('Total calls: ' +  calculations);
    return res;
}


const iterative = (A, B) => {

}


/**
 * Another optimization is to write an interative version
 * and also  WAIT !!!
 * 
     o
    |  o
    | 1  o
    |      o
    | 1   7  o
    |          o
    | 1   6   21 o
    |              o
    | 1   5   15  35 o
    +---+---+---+---+  o
    | 1 | 4 | 10| 20| 35 o
    +---+---+---+---+      o
    | 1 | 3 | 6 | 10| 15  21 o
    +---+---+---+---+          o
    | 1 | 2 | 3 | 4 | 5   6   7  o
    +---+---+---+---+              o
    | 1 | 1 | 1 | 1 | 1   1   1   1  o
    +---+---+---+---+------------------o

 * check again the square I have drawn, and fill it putting in each elements
 * the number of path that can get there, starting from A.... now imagine to turn it 135 deg CW ...  that reminds you something?
 * Tartaglia ? or Pascal triangle? 
 * also we need to calculate only a subsection of it, the one that arrives at our result             
 * building that is quite naive
 * 
 * looking at the numbers it seem like a winner
 */

const calcPascalTriangle = (A, B) => {
    let xCursor = 0,
        yCursor = 0;
    const x = B.x - A.x,
        y = B.y - A.y,
        pTri = [[1]],
        addColumn = () => {
            for (let i = 0, l = pTri.length; i < l; i++) {
                pTri[i].push(i === 0 ? 1 : pTri[i - 1][l] + pTri[i][l - 1]);
            }
            ++xCursor;
        },
        addRow = () => {
            pTri[yCursor + 1] = [1];
            for (let i = 1, l = pTri[0].length; i < l; i++) {
                pTri[yCursor + 1].push(pTri[yCursor][i] + pTri[yCursor + 1][i - 1]);
            }
            ++yCursor;
        };
    
    // while (xCursor < x || yCursor < y) {
    //     let goX = xCursor < x,
    //         goY = yCursor < y;
    //     if (goX && goY) {
    //         addColumn();
    //         addRow();
    //     }
    //     else if (goX) {
    //         addColumn();
    //     } else if (goY) {
    //         addRow();
    //     }
    // }

    // or better
    while(xCursor < x) addColumn();
    while(yCursor < y) addRow();

    // console.log(pTri)
    return pTri[y][x];
}



module.exports = {
    scan0,
    scan1,
    scan2,
    memoizedNumberOfPaths,
    calcPascalTriangle
};
