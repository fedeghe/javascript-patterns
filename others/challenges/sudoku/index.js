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

*/

const getColumn = (M, c) => 
    M.reduce(
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
        // console.log('quad ', r, c)
        // console.log(res)
        // console.log('========')
        // console.log('')
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
        // const quad = getQuad(P, r, c)
        quad.forEach(row => 
            Array.isArray(row) && 
            row.forEach(col => {
                col[value - 1] = false
            })
        )
    },


    quadCheck = (quad, i) => {
        const count = arrayOf(9, () => 0)
        quad.forEach(row => {
            row.forEach(cellPoss => {
                if (Array.isArray(cellPoss)) {
                    cellPoss.forEach(n => {
                        n && count[n-1]++
                    })
                }
            })            
        })
        
        count.forEach((n, v) => {
            if (n === 1) {
                // console.log(quad, v+1, i)
                // console.log("\n\n\n\n\n\n\n")
                lookupInQuad(quad, v+1, i)
            }
        })

    },

    lookupInQuad = (quad, value, quadNum) => {
        quad.forEach((row, ir) => {
            row.forEach((cellPoss, ic) => {
                if (Array.isArray(cellPoss) && cellPoss.includes(value)) {
                    
                    // console.log(`quadrand ${quadNum} must have ${value} in cell [${ir}, ${ic}]`);
                    console.log(`cell [${Math.floor(quadNum / 3)*3 + ir}, ${(quadNum % 3)*3 + ic}] should contain ${value}`);
                    

                    // console.log(`cell [${ir + Math.floor(quadNum / 3)}, ${ic + Math.floor(quadNum / 3)*3}] must contain ${value}`);
                    // console.log("++++++++\n\n\n\n\n\n\n\n\n\n\n\n\n")
                }
            })            
        })
    }

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

    scan = M => {
        const possibles = getPossibleTpl(M),
            quads = getAllQuads(possibles);
        // console.log("\n\n\n\n\n\n\n\n\nquads")
        // console.log(quads)

        quads.forEach(quad => {
            
            // console.log('\n\n\nquad')
            // console.log(quad)

            let nums = quad.reduce((acc, row) => {
                acc = acc.concat(row.filter(Number))
                return acc
            }, []);
            // console.log(nums)
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
        quads.forEach((quad, i) => quadCheck(quad, i))





        // console.dir(possibles)
        

        // possibles.forEach((row, ri) => row.forEach((cellPoss, ci) => {
        //     if (typeof cellPoss !== 'number') {
        //         let t = cellPoss.filter(Boolean);
        //         // console.log(`${ri},${ci} => ${cellPoss}\n\n`)
        //         if (t.length === 1) {
        //             console.log(ri, ci, t[0])
        //         }
        //     }
        // }))




        // console.log(getQuad(possibles, 3, 0))
        // console.log('quads')
        // console.log(quads)
        // quads.forEach(quad => {
        //     console.dir(quad);
        //     [1,2,3,4,5,6,7,8,9].forEach(n => {
        //         let count = 0;

        //     })
        // })



        return {
            possibles
        }

    };








const solve = M => {
    return scan(M)
}

module.exports = solve