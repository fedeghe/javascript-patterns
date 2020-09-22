


function Solver(M, debug) {
    this.M = M
    this.debug = debug
    this.initP();
    this.setCalls = 0;
    this.solutions = 1;
    this.boards = [M];
}

Solver.prototype.next = function () {
    this.M = this.boards.shift()
    this.initP();
    if (this.boards.length) {
        this.run();
    } else {
        console.log('Impossible to solve')
    }
};

Solver.prototype.split = function (r, c, possibilities) {
    var self = this;
    this.boards.concat(possibilities.map(possibility => {
        let m = self.M.map(r => r.map(c => Array.isArray(c) ? null : c))
        m[r][c] = possibility;
        self.boards.push(m);
    }))
    this.next();
}

Solver.prototype.run = function () {
    let t = true,
        valid = true; 
    while (t && !this.isSolved()) {
        valid = this.validateBoard();
        if (!valid) {
            // console.log('Board is not valid')
            t = false
            this.next();
        } else {
            t = this.step();
        }
    }
    // console.log('dONe')
}
Solver.prototype.step = function () {
    // console.log('finding a solution')
    if (this.solveSingle()) return true;
    if (this.solveRow()) return true;
    if (this.solveColumn()) return true;
    if (this.solveQuadrant()) return true;
    // console.log('WE are stuck')
    return this.solveGuessing()
}
Solver.prototype.solveSingle = function () {
    var self = this;
    var M  = this.M;
    for (var ir = 0; ir < 9; ir++) {
        for (var ic = 0; ic < 9; ic++) {
            // single in a cell
            let cell = M[ir][ic]
            if (typeof cell !== 'number' && cell.length === 1) {
                self.setCell(ir, ic, cell[0], 'single')     
                return true;
            }
        }   
    }
    return false;
};

Solver.prototype.solveRow = function () {
    const self = this,
        M  = this.M;
    for (var ir = 0; ir < 9; ir++) {
        let row = M[ir]
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
        for (num in probRecurrence) {
            if (probRecurrence[num].count === 1) {
                self.setCell(ir, probRecurrence[num].col, probRecurrence[num].value, 'row')
                return true
            }
        }
    }
    return false
};

Solver.prototype.solveColumn = function () {
    var self = this;
    var M = this.M;
    const cols = M.reduce((acc, row, ir) => {
        row.forEach((c , i)=> {
            acc[i] = acc[i] || []
            acc[i].push(c)
        })
        return acc
    }, [])
    for (var ic = 0; ic < 9; ic++) {
    // cols.forEach((col, ic) => {
        var col = cols[ic]
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
        for (num in probRecurrence) {
            if (probRecurrence[num].count === 1) {
                self.setCell(probRecurrence[num].row, ic, probRecurrence[num].value, 'column')
                return true
            }
        }
    }
    return false;
};

Solver.prototype.solveQuadrant = function () {
    const self = this;
    for (let r = 0; r < 9; r+=3) {
        for (let c = 0; c < 9; c+=3) {
            const block = this.getBlock(r, c, true),
                probRecurrence = block.reduce((acc, cell, i) => {
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
                }, {});
            for (num in probRecurrence) {
                if (probRecurrence[num].count === 1) {
                    self.setCell(probRecurrence[num].row, probRecurrence[num].col, probRecurrence[num].value, 'quadrant')
                    return true;
                }
            }
        }
    } 
    return false;
};



Solver.prototype.solveGuessing = function () {
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

    // this.d(betterCandidate)

    var {r, c} = betterCandidate,
        candidates = this.M[r][c].filter(n => typeof n === 'number')
    this.solutions *= candidates.length;



    this.split(r, c, candidates);


    // this.d('M: ', this.M[r][c])
    // this.d('cand', candidates)
    // this.setCell(r, c, candidates[0], 'hunting');
    // this.d('then M: ', this.M[r][c])
    return true;
};

Solver.prototype.validateBoard = function () {
    return this.validateCells()
        && this.validateRows()
        && this.validateCols()
        && this.validateQuads();
};

Solver.prototype.validateCells = function () {
    var M = this.M;
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (Array.isArray(M[r][c]) && M[r][c].length === 0) return false;
        }
    }
    return true;
};

Solver.prototype.validateRows = function () {
    let M = this.M,
        l = M.length;
    for (let i = 0; i < l; i++) {
        if (!this.validateX(M[i])) return false;
    }
    return true;
};

Solver.prototype.validateCols = function () {
    var self = this,
        M = this.M,
        l = M.length,
        cols = M[0].reduce((acc, c, ic) => M.map(r => r[ic]) , []);
    // console.log(cols)
    for (let i = 0; i < l; i++) {
        if (!this.validateX(cols[i])) return false;
    }
    return true;
};

Solver.prototype.validateQuads = function () {
    var self = this,
        quads = self.M.reduce((acc, row, ir) => {
            if (ir%3 === 0) {
                acc.push(self.getBlock(ir, 0, true))
                acc.push(self.getBlock(ir, 3, true))
                acc.push(self.getBlock(ir, 6, true))
            }
            return acc
        }, []);

    for (let i = 0; i < 9; i++) {
        let quadFlat = [].concat.apply([], quads[i]);
        if (!self.validateX(quadFlat)) {
            return false;
        }
    }
    return true;
}
Solver.prototype.validateX = function (x) {
    if (typeof x === 'number') {
        return true
    }
    var nums = x.filter(Number),
        p = {};
    for (let i = 0, l = nums.length; i < l; i++) {
        if (p[i]) return false
        p[i] = true
    }
    return true
};

Solver.prototype.excludeFromArr = function (a, exclude) {
    var res = [];
    a.forEach(el => {
        if(!(exclude.includes(el))) res.push(el)
    })
    return res;
};

Solver.prototype.getBlock = function (r, c, noFilter) {
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
};

Solver.prototype.getRow = function (r, noFilter) {
    var r = this.M[r];
    return noFilter ? r : r.filter(Number);
};

Solver.prototype.getCol = function (c, noFilter) {
    var r = this.M.map(r => r[c]) 
    return noFilter ? r : r.filter(Number);
};

Solver.prototype.initP = function () {
    var self = this;
    this.M.forEach((row, ir) => {
        row.forEach((cell, ic) => {
            if (!cell || Array.isArray(cell)) {
                var all2remove = self.getBlock(ir, ic)
                        .concat(self.getRow(ir))
                        .concat(self.getCol(ic)),
                    rem = self.excludeFromArr([1,2,3,4,5,6,7,8,9], all2remove);
                self.M[ir][ic] = rem;
            }
        });
    });
};

Solver.prototype.updateP = function (r, c, value) {
    var self = this,
        block= self.getBlock(r, c, true),
        row = self.getRow(r, true),
        col = self.getCol(c, true);
        remove = cell => {
            // console.log(cell, r, c, value)
            if(Array.isArray(cell)) {
                let i = cell.indexOf(value)
                if (i >= 0) {
                    cell.splice(i, 1)
                }
            }
        }
    block.forEach(remove);
    col.forEach(remove);
    row.forEach(remove);
};

Solver.prototype.setCell = function (r, c, value, mode, skipUpdate) {
    this.M[r][c] = value;
    this.debug && console.log(`solved [${r}, ${c}] with ${value} (${mode})`)
    !skipUpdate && this.updateP(r, c, value);
    this.debug && this.printPossibilities();
    this.setCalls++;
};

Solver.prototype.isSolved = function () {
    for (var r = 0; r < 9; r++)
        for (var c = 0; c < 9; c++) 
            if (Array.isArray(this.M[r][c]))
                return false;
    return true;
};

Solver.prototype.d = function () {
    this.debug && console.log.apply(null, [].slice.call(arguments, 0))
};


Solver.prototype.asString = function (a) {
    return [1,2,3,4,5,6,7,8,9].map(e=> a.includes(e) ? e : ' ');
}
Solver.prototype.printSolution = function () {
    var M = this.M;
    var out = `\n+${new Array(4).join('-------+')}\n`

    for (var r = 0, rl = M.length; r < rl; r++) {
        let l = '| ';
        for (var c = 0, cl = M[r].length; c < cl; c++) {
            
            l += `${M[r][c]} `
            if ((c+1) % 3 === 0) l += '| '
        }

        out += `${l}\n`
        if ((r+1)%3 === 0) {
            out += `+${new Array(4).join('-------+')}\n`
        }
    }
    console.log(out)
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
                l1 += `*${stringed.slice(0,3).join('')}*|`
                l2 += `*${stringed.slice(3,6).join('')}*|`
                l3 += `*${stringed.slice(6,9).join('')}*|`
            }
        }
        out += [l1, l2, l3].join('\n')
        out += `\n+${new Array(10).join('-----+')}\n`


    }
    console.log(out)
}

module.exports = Solver