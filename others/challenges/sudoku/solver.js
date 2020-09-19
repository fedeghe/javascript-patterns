


function Solver(M, debug) {
    this.M = M
    this.debug = debug
    this.setP();
    this.setCalls = 0;
    this.solutions = 1;
}

Solver.prototype.excludeFromArr = function (a, exclude) {
    var res = [];
    a.forEach(el => {
        if(!(exclude.includes(el))) res.push(el)
    })
    return res;
};

Solver.prototype.getQuad = function (r, c, noFilter) {
    r = Math.floor(r / 3) * 3 
    c = Math.floor(c / 3) * 3 
    const res = [];
    for (let i = r, l = r + 3; i < l; i++) {
        for (let j = c, k = c + 3; j < k; j++) {
            if (noFilter) {
                res.push(this.M[i][j]) 
            } else {
                typeof this.M[i][j] === 'number'
                && res.push(this.M[i][j])
            }
        }
    }
    return res;
}

Solver.prototype.getRow = function (r, noFilter) {
    var r = this.M[r];
    return noFilter ? r : r.filter(Number);
}

Solver.prototype.getCol = function (c, noFilter) {
    var r = this.M.map(r => r[c]) 
    return noFilter ? r : r.filter(Number);
}

Solver.prototype.setP = function () {
    var self = this;
    this.M.forEach((row, ir) => {
        row.forEach((cell, ic) => {
            if (!cell || Array.isArray(cell)) {

                
                var all2remove = self.getQuad(ir, ic)
                        .concat(self.getRow(ir))
                        .concat(self.getCol(ic)),
                    rem = self.excludeFromArr([1,2,3,4,5,6,7,8,9], all2remove);
                // console.log(self.getQuad(ir, ic),self.getRow(ir),self.getCol(ic), rem)
                self.M[ir][ic] = rem;
            }
        });
    });
    // console.log(this.M)
};

Solver.prototype.updateP = function (r, c, value) {
    var self = this,
        quad= self.getQuad(r, c, true),
        row = self.getRow(r, true),
        col = self.getCol(c, true);
        remove = cell => {
            if(Array.isArray(cell)) {
                let i = cell.indexOf(value)
                if (i >= 0) {
                    cell.splice(i, 1)
                }
            }
        }
    quad.forEach(remove);
    row.forEach(remove);
    col.forEach(remove);
};


Solver.prototype.setCell = function (r, c, value, mode) {
    this.M[r][c] = value;
    this.debug && console.log(`solved [${r}, ${c}] with ${value} (${mode})`)
    this.updateP(r, c, value);
    this.debug && this.printPossibilities();
    this.setCalls++;
}
Solver.prototype.solveOnePossibility = function () {
    var self = this;
    self.M.forEach((row, ir) => {
        row.forEach((col, ic) => {
            
            // single in a cell
            if (typeof col !== 'number' && col.length === 1) {
                self.setCell(ir, ic, col[0], 'single')
                
            }
        })

        // in rows
        const probRecurrence = row.reduce((acc, cell, ic) => {
            if (Array.isArray(cell)) {
                cell.forEach(v => {
                    if (v in acc) {
                        acc[v].count++;
                    } else {
                        acc[v] = {
                            count: 1,
                            col: ic,
                            value: v
                        };
                    }
                });
            }
            return acc
        }, {})
        Object.keys(probRecurrence).forEach(n => {
            if (probRecurrence[n].count === 1) {
                self.setCell(ir, probRecurrence[n].col, probRecurrence[n].value, 'row')
            }
        })
    })

    // in colums 
    const cols = this.M.reduce((acc, row, ir) => {
        row.forEach((c , i)=> {
            acc[i] = acc[i] || []
            acc[i].push(c)
        })
        return acc
    }, [])
    // console.log('COLS', cols)
    cols.forEach((col, ic) => {
        const probRecurrence = col.reduce((acc, cell, ir) => {
            if (Array.isArray(cell)) {
                cell.forEach(v => {
                    if (v in acc) {
                        acc[v].count++;
                    } else {
                        acc[v] = {
                            count: 1,
                            row: ir,
                            value: v
                        };
                    }
                });
            }
            return acc
        }, {})
        // console.log(ic, probRecurrence)
        Object.keys(probRecurrence).forEach(n => {
            if (probRecurrence[n].count === 1) {
                self.setCell(probRecurrence[n].row, ic, probRecurrence[n].value, 'column')
            }
        })
    })

    // in quad
    for (let r = 0; r < 9; r+=3) {
        for (let c = 0; c < 9; c+=3) {
            let quad = this.getQuad(r, c);
            
            const probRecurrence = quad.reduce((acc, cell, i) => {
                let ir = ~~(i / 3),
                    ic = i % 3;

                if (Array.isArray(cell)) {
                    cell.forEach(v => {
                        if (v in acc) {
                            acc[v].count++;
                        } else {
                            acc[v] = {
                                count: 1,
                                col: c + ic,
                                row: r + ir,
                                value: v
                            };
                        }
                    });
                }
                return acc
            }, {})
            Object.keys(probRecurrence).forEach(n => {
                if (probRecurrence[n].count === 1) {
                    self.setCell(probRecurrence[n].row, probRecurrence[n].col, probRecurrence[n].value, 'quad')
                }
            })
        }
    } 
    
    
};


Solver.prototype.isSolved = function () {
    for (var r = 0; r < 9; r++)
        for (var c = 0; c < 9; c++) 
            if (Array.isArray(this.M[r][c]))
                return false;
    return true;
};
Solver.prototype.end = function () {
    console.log('SOLVED')
    if (this.solutions > 1) {
        console.log(`${this.solutions} solutions are possible`)
    } else {
        console.log('unique solution')
    }
    this.printPossibilities()
}
Solver.prototype.solve = function () {
    var before = this.setCalls;
    this.solveOnePossibility();
    var after = this.setCalls;
    if (after > before) {
        if (this.isSolved()) {
            this.end();
        } else {
            this.solve();
        }
    } else {
        if (this.isSolved()) {
            this.end();
        } else {
            // console.log('Looks like we are stuck')
            this.huntSolution()
        }
    }
};



Solver.prototype.huntSolution = function () {
    // search the cell with minimum possibilities
    var self = this,
        betterCandidate = this.M.reduce((acc, row, ir) => 
            row.reduce((iAcc, col, ic) => {
                if (typeof self.M[ir][ic] === 'number') return iAcc;
                let l = self.M[ir][ic].length
                if (l < iAcc.min) {
                    return {min: l, r: ir, c: ic}
                }
                return iAcc
            }, acc)
        , {min: 10, r:0, c: 0});

    var {r, c} = betterCandidate,
        candidates = this.M[r, c].filter(Number)
    this.solutions *= candidates.length;
    this.setCell(r, c, candidates[0], 'hunting');
    this.solve();
};


Solver.prototype.asString = function (a) {
    return [1,2,3,4,5,6,7,8,9].map(e=> a.includes(e) ? e : ' ');
}
Solver.prototype.printPossibilities = function () {
    var M = this.M;
    var out = `\n+${new Array(10).join('-----+')}\n`
    function Bool2Num(a, start) {
        return a.map((e, i) => start + i)
    }
    for (var r = 0, rl = M.length; r < rl; r++) {
        var l1 = '|',
            l2 = '|',
            l3 = '|';
        for (var c = 0, cl = M[r].length; c < cl; c++) {
            var solved = typeof M[r][c] === 'number'
            
            if (solved) {
                l1 += '     |';
                l2 += `  ${M[r][c]}  |`;
                l3 += '     |';
            } else {
                let stringed = this.asString(M[r][c])
                l1 += ` ${stringed.slice(0,3).join('')} |`
                l2 += ` ${stringed.slice(3,6).join('')} |`
                l3 += ` ${stringed.slice(6,9).join('')} |`
            }
        }
        out += [l1, l2, l3].join('\n')
        out += `\n+${new Array(10).join('-----+')}\n`


    }
    console.log(out)
}

module.exports = Solver