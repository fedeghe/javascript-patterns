const assert = require('assert');

const {
    memoizedNumberOfPaths,
    calcPascalTriangle,
    getBc
}  = require('./index.js')

const benchmark = [{
    input: {
        A: {x: 0, y: 0},
        B: {x: 100, y: 100}
    },output: 9.054851465610329e+58
},{
    input: {
        A: {x: 0, y: 0},
        B: {x: 200, y: 100}
    },
    output: 4.158251463258565e+81
},{
    input: {
        A: {x: 0, y: 0},
        B: {x: 200, y: 200}
    },output: 1.0295250013541448e+119
},{
    input: {
        A: {x: 0, y: 0},
        B: {x: 500, y: 500}
    },output: 2.702882409454366e+299
}]

console.log(`\n\n 🍌 🍌 🍌  T E S T S  🍌 🍌 🍌 \n`);
const line = () => console.log('\n');
console.time('total running time');

[getBc,  calcPascalTriangle, memoizedNumberOfPaths].forEach(strategy => {
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

