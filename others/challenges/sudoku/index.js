const Solver = require('./solver');


const arrayOf = (n, x) => new Array(n).fill('').map(e => x())

// const init = arrayOf(9, () => arrayOf(9, () => false))

// init[0][0] = 8
// init[1][2] = 3
// init[1][3] = 6
// init[2][1] = 7
// init[2][4] = 9
// init[2][6] = 2
// init[3][1] = 5
// init[3][5] = 7
// init[4][4] = 4
// init[4][5] = 5
// init[4][6] = 7
// init[5][3] = 1
// init[5][7] = 3
// init[6][2] = 1
// init[6][7] = 6
// init[6][8] = 8
// init[7][2] = 8
// init[7][3] = 5
// init[7][7] = 1
// init[8][1] = 9
// init[8][6] = 4

var n = null

const init1 = [
    [8,7,n,  n,n,n,  6,n,1],
    [n,9,n,  n,n,n,  2,7,5],
    [n,1,n,  n,6,2,  n,4,8],
    [n,n,6,  1,n,n,  n,n,7],
    [1,5,n,  n,n,n,  n,n,2],
    [3,n,n,  n,n,8,  5,n,6],
    [4,6,9,  n,n,n,  8,n,n],
    [2,8,n,  9,3,n,  n,5,n],
    [n,3,n,  n,2,4,  1,6, 9],
    
];

const init2 = [
    [8,n,n,  n,n,n,  n,n,n],
    [n,n,3,  6,n,n,  n,n,n],
    [n,7,n,  n,9,n,  2,n,n],
    [n,5,n,  n,n,7,  n,n,n],
    [n,n,n,  n,4,5,  7,n,n],
    [n,n,n,  1,n,n,  n,3,n],
    [n,n,1,  n,n,n,  n,6,8],
    [n,n,8,  5,n,n,  n,1,n],
    [n,9,n,  n,n,n,  4,n,n],
    
];

const init3 = [
    [n,3,n,  n,n,n,  9,n,n],
    [7,n,n,  8,2,n,  n,n,n],
    [n,n,n,  5,n,n,  n,n,1],
    [n,n,n,  n,n,2,  n,6,n],
    [n,n,n,  7,4,n,  n,n,n],
    [n,1,n,  9,n,n,  n,n,3],
    [n,n,n,  n,9,n,  n,2,n],
    [n,n,8,  n,n,n,  4,n,n],
    [n,5,n,  1,n,6,  n,7,n],
    
];

console.time('init3')
var s = new Solver(init2);
s.solve();
console.timeEnd('init3')
// s.huntSolution();