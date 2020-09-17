/*
      0 1 2   3 4 5   6 7 8
        c   
    o-+-+-+-+-+-+-+-+-+-+-+-+
0   | 8     |       |       |
1 r |     3 | 6     |       |
2   |   7   |   9   | 2     |
    +-+-+-+-+-+-+-+-+-+-+-+-+
3   |   5   |     7 |       |
4   |       |   4 5 | 7     |
5   |   6   | 1     |   3   |
    +-+-+-+-+-+-+-+-+-+-+-+-+
6   |     1 |       |   6 8 |
7   |     8 | 5     |   1   |
8   |   9   |       | 4     |
    +-+-+-+-+-+-+-+-+-+-+-+-+


    o-+-+-+-+-+-+-+-+-+-+-+-+
0   | 8     |       |       |
1 r |     3 | 6     |       |
2   |   7   |   9   | 2     |
    +-+-+-+-+-+-+-+-+-+-+-+-+
3   |   5   |     7 |       |
4   |       |   4 5 | 7     |
5   |   6   | 1     |   3   |
    +-+-+-+-+-+-+-+-+-+-+-+-+
6   |     1 |       |   6 8 |
7   |     8 | 5     |   1   |
8   |   9   |       | 4     |
    +-+-+-+-+-+-+-+-+-+-+-+-+

checks to eliminate possibilities
1st level
- quad: within a quad a set number must be removed from others 
        quad elements possibilities
- row: within a row a set number must be removed from others 
        row elements possibilities
- line: within a line a set number must be removed from others 
        line elements possibilities
2nd level
- within a quad horizontal or vertical triple, let think vertical (horizontal is similar)
  if within a quad a number is at least only present twice in a column
  then should be removed from the possibilities of the other columns in the triple
*/



const getColumn = (M, c) =>  M.reduce(
        (acc, row) => { acc.push(row[c]); return acc; }
    , []),

    getRow = (M, r) => M[r],

    getQuad = (M, r, c) => {
        r = Math.floor(r / 3) * 3 
        c = Math.floor(c / 3) * 3 
        const res = [];
        for (let i = r, l = r + 3; i < l; i++) {
            res[i-r] = [];
            for (let j = c, k = c + 3; j < k; j++) {
                res[i-r].push(M[i][j])
            }
        }
        return res;
    },

    arrayOf = (n, x) => new Array(n).fill('').map((e, i) => x(e, i)),

    getPossibleTpl = M => arrayOf(9, (row, r) => arrayOf(9, (cell, c) => M[r][c] ? M[r][c] : [1,2,3,4,5,6,7,8,9])),

    getAllQuads = M => [
        [0, 0], [0, 3], [0, 6],
        [3, 0], [3, 3], [3, 6],
        [6, 0], [6, 3], [6, 6]
    ].map(point => getQuad(M, point[0], point[1])),

    removeFromQuad = (quad, value) => {
        quad.forEach(row => 
            Array.isArray(row) && 
            row.forEach(col => {
                col[value - 1] = false;
            })
        )
    },

    quadCheck = (quad, i) => {
        const count = arrayOf(9, () => 0)
        quad.forEach(row => {
            row.forEach(cellPoss => {
                if (Array.isArray(cellPoss)) {
                    cellPoss.forEach(n => {
                        n && count[n-1]++;
                    })
                }
            })            
        })
        
        count.forEach((n, v) => {
            if (n === 1) {
                lookupInQuad(quad, v+1, i);
            }
        })
    },

    lookupInQuad = (quad, value, quadNum) => {
        quad.forEach((row, ir) => {
            row.forEach((cellPoss, ic) => {
                if (Array.isArray(cellPoss) && cellPoss.includes(value)) {
                    console.log(`cell [${Math.floor(quadNum / 3)*3 + ir}, ${(quadNum % 3)*3 + ic}] should contain ${value}`);
                }
            })            
        })
    },

    removeFromRow = (P, r, value) => {
        const row = getRow(P, r)
        // 
        row.forEach(cellPoss => {
            if (typeof cellPoss !== 'number') {
                cellPoss[value - 1] = false
            }
        })
    },

    removeFromCol = (P, c, value) => {
        const col = getColumn(P, c)
        col.forEach(cellPoss => {
            if (typeof cellPoss !== 'number') {
                cellPoss[value - 1] = false
            }
        })
    },

    removeFromQuad = (quad, value) => {
        quad.forEach((row, ir) => {
            row.forEach((cellPoss, ic) => {
                if (Array.isArray(cellPoss) && cellPoss.includes(value)) {
                    cellPoss[value - 1] = false
                }
            })            
        })
    },

    checkTripleRows = P => {
        // [1,2,3,4,5,6,7,8,9].forEach(value => {

        // })
    },

    checkTripleColumns = P => {

    },

    scan = M => {
        const possibles = getPossibleTpl(M),
            quads = getAllQuads(possibles);

        quads.forEach(quad => {
            let nums = quad.reduce((acc, row) => {
                acc = acc.concat(row.filter(Number))
                return acc
            }, []);
            nums.forEach(num => removeFromQuad(quad, num))
        });

        possibles.forEach((row, ir) => {
            row.forEach((cellPoss, ic) => {
                if (typeof cellPoss === 'number') {
                    removeFromRow(possibles, ir, cellPoss);
                    removeFromCol(possibles, ic, cellPoss);
                }
            })
        })
        checkTripleRows(possibles);
        checkTripleColumns(possibles);

        quads.forEach((quad, i) => quadCheck(quad, i));

        return {
            possibles
        };
    };








const solve = M => {
    return scan(M)
}

module.exports = solve