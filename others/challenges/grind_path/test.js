const assert = require('assert');

const {
    scan0,
    scan1,
    scan2,
    memoizedNumberOfPaths,
    calcPascalTriangle
}  = require('./index.js')


const benchmark = [{
    input: {
        A: {x: 0, y: 0},
        B: {x: 1, y: 1}
    },output: 2
},{
    input: {
        A: {x: 0, y: 0},
        B: {x: 2, y: 1}
    },
    output: 3
},{
    input: {
        A: {x: 0, y: 0},
        B: {x: 2, y: 2}
    },output: 6
},{
    input: {
        A: {x: 0, y: 0},
        B: {x: 3, y: 3}
    },output: 20
},{
    input: {
        A: {x: 0, y: 0},
        B: {x: 8, y: 8}
    },output: 12870
},{
    input: {
        A: {x: 0, y: 0},
        B: {x: 10, y: 10}
    },output: 184756
}]

console.log(`\n\n TESTS\n\n`);
const line = () => console.log('\n');

[memoizedNumberOfPaths, scan1, scan2, calcPascalTriangle].forEach(strategy => {
    let name = strategy.name;
    console.time(name);
    benchmark.forEach(bm => assert.strictEqual(strategy(bm.input.A, bm.input.B), bm.output));
    console.log('✅ ')
    console.timeEnd(name);
    line();
})



// console.time('scan0');
// benchmark.forEach(bm => assert.strictEqual(scan0(bm.input.B.x, bm.input.B.y), bm.output))
// console.log('✅ scan0 passed ') 
// console.timeEnd('scan0')

// line();
