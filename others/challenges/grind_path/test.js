const assert = require('assert');

const {
    scan0,
    scan1,
    scan2,
    memoizedNumberOfPaths
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
}]


benchmark.forEach(bm => assert.strictEqual(memoizedNumberOfPaths(bm.input.A, bm.input.B), bm.output))
console.log('✅ memoizedNumberOfPaths passed ') 

benchmark.forEach(bm => assert.strictEqual(scan0(bm.input.B.x, bm.input.B.y), bm.output))
console.log('✅ scan0 passed ') 

benchmark.forEach(bm => assert.strictEqual(scan1(bm.input.A, bm.input.B), bm.output))
console.log('✅ scan1 passed ') 

benchmark.forEach(bm => assert.strictEqual(scan2(bm.input.A, bm.input.B), bm.output))
console.log('✅ scan2 passed ') 
