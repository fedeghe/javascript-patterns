const solve = require('./index'),
    assert = require('assert');

const arrayOf = (n, x) => new Array(n).fill('').map(e => x())

const init = arrayOf(9, () => arrayOf(9, () => false))

init[0][0] = 8
init[1][2] = 3
init[1][3] = 6
init[2][1] = 7
init[2][4] = 9
init[2][6] = 2
init[3][1] = 5
init[3][5] = 7
init[4][4] = 4
init[4][5] = 5
init[4][6] = 7
init[5][3] = 1
init[5][7] = 3
init[6][2] = 1
init[6][7] = 6
init[6][8] = 8
init[7][2] = 8
init[7][3] = 5
init[7][7] = 1
init[8][1] = 9
init[8][6] = 4

// init[5][1] = 6
// init[0][0] = 6
// init[3][4] = 6
// init[4][1] = 8
// init[4][8] = 6
// init[7][5] = 6
// init[8][2] = 6





const res = solve(init)
// console.dir(res.possibles)

