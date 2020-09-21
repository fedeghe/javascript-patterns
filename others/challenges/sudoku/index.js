const Solver = require('./solver');

const n = null,
    init1 = [
        [8,7,n,  n,n,n,  6,n,1],
        [n,9,n,  n,n,n,  2,7,5],
        [n,1,n,  n,6,2,  n,4,8],
        [n,n,6,  1,n,n,  n,n,7],
        [1,5,n,  n,n,n,  n,n,2],
        [3,n,n,  n,n,8,  5,n,6],
        [4,6,9,  n,n,n,  8,n,n],
        [2,8,n,  9,3,n,  n,5,n],
        [n,3,n,  n,2,4,  1,6, 9],
        
    ],
    init2 = [
        [8,n,n,  n,n,n,  n,n,n],
        [n,n,3,  6,n,n,  n,n,n],
        [n,7,n,  n,9,n,  2,n,n],
        [n,5,n,  n,n,7,  n,n,n],
        [n,n,n,  n,4,5,  7,n,n],
        [n,n,n,  1,n,n,  n,3,n],
        [n,n,1,  n,n,n,  n,6,8],
        [n,n,8,  5,n,n,  n,1,n],
        [n,9,n,  n,n,n,  4,n,n],  
    ],
    init3 = [
        [n,3,n,  n,n,n,  9,n,n],
        [7,n,n,  8,2,n,  n,n,n],
        [n,n,n,  5,n,n,  n,n,1],
        [n,n,n,  n,n,2,  n,6,n],
        [n,n,n,  7,4,n,  n,n,n],
        [n,1,n,  9,n,n,  n,n,3],
        [n,n,n,  n,9,n,  n,2,n],
        [n,n,8,  n,n,n,  4,n,n],
        [n,5,n,  1,n,6,  n,7,n],
    ],
    zero = [
        [n,1,n,  n,n,n,  n,n,n],
        [n,n,n,  n,3,n,  n,n,n],
        [n,n,6,  n,n,n,  n,n,n],

        [n,n,n,  4,n,n,  n,n,n],
        [n,n,n,  n,2,n,  n,n,n],
        [n,n,n,  n,n,n,  6,n,n],

        [n,n,n,  n,n,9,  n,n,n],
        [n,n,n,  n,8,n,  n,n,n],
        [n,n,7,  n,n,n,  n,n,n],
    ];

console.time('init2')
var s = new Solver(init2);
s.run();
s.printSolution()
console.timeEnd('init2')