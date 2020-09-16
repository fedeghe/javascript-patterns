const assert = require('assert');

const {
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
},
// big ones
{
    input: {
        A: {x: 0, y: 0},
        B: {x: 15, y: 15}
    },output: 155117520
},
// not from origin
{
    input: {
        A: {x: 2, y: 2},
        B: {x: 10, y: 10}
    },output: 12870
},{
    input: {
        A: {x: 1, y: 1},
        B: {x: 3, y: 3}
    },output: 6
}]

console.log(`\n\n 🍌 🍌 🍌  T E S T S  🍌 🍌 🍌 \n`);
const line = () => console.log('\n');
console.time('total running time');

[calcPascalTriangle, memoizedNumberOfPaths, scan1, scan2].forEach(strategy => {
    let { name } = strategy;
    try {
        console.time(name);
        benchmark.forEach(bm => assert.strictEqual(strategy(bm.input.A, bm.input.B), bm.output));
        console.timeEnd(name);
        console.log('✅ ')
    }catch(e){
        console.log(e)
        console.log('🍌 ')
    }
    line();
})
console.timeEnd('total running time');

