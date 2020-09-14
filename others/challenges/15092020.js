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



/**
 * since from the description what immediately matters is the size of the grid
 * I first implemented a reverse simple recursive algorithm, recongnising as 
 * exit condition the border, since when u reach the border, from there (given
 * the constraint about movement) only one path is possible
 */

const scanWH = (w, h) => {
    if (w === 0 || h === 0) return 1
    return scan(w - 1, h) + scan(w, h - 1)
}

// makes sense, pass dumb tests
// looks like anyway Points matters, also the starting one thus 
// I wrote the version Point friendly
// Point = {x, y}
//
let scanCalls = 0
const scan2 = (A, B) => {
    scanCalls++;
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
    let calculations = 0;
    const memo = {}, // O(area)
        scan = (A, B) => {
            if ((B.x === A.x) || (B.y === A.y)) return 1;
            return memoized(A, { x: B.x, y: B.y - 1 })
                + memoized(A, { x: B.x - 1, y: B.y });
        },
        memoized = (A, B) => {
            // no, I could not imaging a better collision-proof key! 
            const k = [A.x, A.y, B.x, B.y].join('-');
            if (!(k in memo)) {
                calculations++;
                memo[k] = scan(A, B); // O (area)
            }
            return memo[k];
        }
        
    const res =  memoized(A, B);
    console.log('Total calls: ' +  calculations);
    return res;
}


const A = { x: 0, y: 0 },
    B = { x: 10, y: 10 };

console.time('memoizedNumberOfPaths')
const r1 = memoizedNumberOfPaths(A, B)
console.timeEnd('memoizedNumberOfPaths')
console.log(r1)


console.time('scan2')
const r2 = scan2(A, B)
console.timeEnd('scan2')
console.log(r2)
console.log('#scan calls: ', scanCalls)

/**
 * Anther optimization is to write an interative version
 */