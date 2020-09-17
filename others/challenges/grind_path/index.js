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

/**
 * Another optimization is to write an interative version
 * and also ... wait 
 * let's draw again the square, and fill it putting in each elements
 * the number of path that can get there, starting from A.... now imagine to turn it 135 deg CW ...  that reminds you something?
 * 
     .
    |  .
    | 1  .
    |      .
    | 1   7  .
    |          .
    | 1   6   21 .
    |              .
    | 1   5   15  35 .
    +---+---+---+---B  .
    | 1 | 4 | 10| 20| 35 .
    +---+---+---+---+      .
    | 1 | 3 | 6 | 10| 15  21 .
    +---+---+---+---+          .
    | 1 | 2 | 3 | 4 | 5   6   7  .
    +---+---+---+---+              .
    | 1 | 1 | 1 | 1 | 1   1   1   1  .
    A---+---+---+---+------------------.

 
 * 'il triangolo di Tartaglia' best known as `Pascal triangle`?
 * 
 * also we need to calculate only a subsection of it
 * the one that arrives at our result             
 * a bidimensional array fits perfect and
 * building that is quite naive
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

    while (xCursor < x) addColumn();
    while (yCursor < y) addRow();
    return pTri[y][x];
};
/**
 * 
 * now we can run some test almost not taking much care about the size
 * ( as far as the result is below Number.MAX_VALUE (or Number.MAX_SAFE_INTEGER if we need the right result)
 * the test.js anyway is not pushing much here cause still it is running some recursive unoptimized approaches 
 * which would simply freeze Your machine if calle even on 50 squared grinds
 * 
 * > node test.js
 * 
 * looking at the numbers the `calcPascalTriangle` seems like a clear winner
 * 
 * 
 * 
 * 
 * 
 * but ...let's make one step back, thing now should look simpler
 * in the end it is just a matter of calculating the value that has
 * to be in that corner of the 'pascal square' subsection of the triangle
 * two arrays are enough
 * 
 * this on the 'small' sizes seem to be the fastest
 */
const getBc = (A, B) => {
    let x = B.x - A.x,
        y = B.y - A.y,
        a1 = new Array(x).fill(1),
        a2 = [];
    while(y--) {
        a2 = [1];
        for (let i = 0; i < x; i++) {
            a2.push(a2[i] + (a1[i+1] || 1))
        }
        a1 = a2
    }
    return a1[x]
}


 /**
  * Maybe we're not yet there
  * enven only scratching the surface of https://en.wikipedia.org/wiki/Pascal%27s_triangle
  * I'm curious to see if the binomial coefficient calculation can be done so that it runs even faster
  */

// no ....I wont use it, at that point I cannot use recursion
const fact = n => n <= 1 ? 1 : n * fact(n-1),
    binCoeff = (n, k) => fact(n) / (fact(k) * fact(n-k)),
    bcBased1 = (A, B) => {
        let x = B.x - A.x,
            y = B.y - A.y;
        return binCoeff(x+y, y)
    };


// there is a better interative way to get bc
// revisiting a solution from SO https://stackoverflow.com/questions/37679987/efficient-computation-of-n-choose-k-in-node-js
// we have a better way to get the Binomial Coefficient
const binomial = (n, k) => {
        let res = 1;
        while (k >= 1)
            res *= (n + 1 - k) / k--; // as you might expect the division has consequences,
                                      // but can be handled on smaller numbers
        return res;
    },
    bcBased2 = (A, B) => {
        let x = B.x - A.x,
            y = B.y - A.y;
        return ~~binomial(x+y, y) // ~~ handle consequences rounding. This is a fast rounding,
                                  // the payoff is to touch the int bound one digit earlier
    };

/**
 * Conclusion
 * - memoizedNumberOfPaths is quite fast, also considering that is recursive
 * - calcPascalTriangle is really fast on all sizes
 * - bdBased2 && getBC are the fastest on smaller sizes (~ < 15)
 * - recursive non memoized approaches are slow and inclredibly time consuming
 */


module.exports = {
    scan0,
    scan1,
    scan2,
    bcBased2,
    getBc,
    memoizedNumberOfPaths,
    calcPascalTriangle
};
