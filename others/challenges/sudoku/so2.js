/**
 * This is the best public solution
 * https://stackoverflow.com/questions/42736648/sudoku-solver-in-js
 */


const s = '.';

const boards = {
    wts2020: [
        [8, s, s, s, s, s, s, s, s],
        [s, s, 3, 6, s, s, s, s, s],
        [s, 7, s, s, 9, s, 2, s, s],
        [s, 5, s, s, s, 7, s, s, s],
        [s, s, s, s, 4, 5, 7, s, s],
        [s, s, s, 1, s, s, s, 3, s],
        [s, s, 1, s, s, s, s, 6, 8],
        [s, s, 8, 5, s, s, s, 1, s],
        [s, 9, s, s, s, s, 4, s, s],
    ],
    'almostZero': [
        [s, s, s, s, s, s, s, s, s],
        [s, s, s, s, s, s, s, s, s],
        [s, s, s, s, s, s, s, s, s],
        [s, s, s, s, s, s, s, s, s],
        [s, s, s, s, s, s, s, s, s],
        [s, s, s, s, s, 2, s, s, s],
        [s, s, s, s, s, s, s, s, s],
        [s, s, s, s, s, s, s, s, s],
        [s, s, s, s, s, s, s, s, s],
    ],
    'zero': [
        [s, s, s, s, s, s, s, s, s],
        [s, s, s, s, s, s, s, s, s],
        [s, s, s, s, s, s, s, s, s],
        [s, s, s, s, s, s, s, s, s],
        [s, s, s, s, s, s, s, s, s],
        [s, s, s, s, s, s, s, s, s],
        [s, s, s, s, s, s, s, s, s],
        [s, s, s, s, s, s, s, s, s],
        [s, s, s, s, s, s, s, s, s],
    ]
};

for (var board in boards) {
    console.time(board)
    sudokuSolver(boards[board]);
    print(boards[board]);
    console.timeEnd(board)
    console.log('————————––––––––––––––––––')
}


function isValid(board, row, col, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
            return false;
        }
    }
    return true;
}

function sudokuSolver(data) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (data[i][j] == s) {
                for (let k = 1; k <= 9; k++) {
                    
                    // excluding from this step those not possible
                    // checking row, col and block
                    // does not pay in term of time, maybe only in memory

                    if (isValid(data, i, j, k)) {
                        data[i][j] = k;
                        if (sudokuSolver(data)) {
                            return true;
                        } else {
                            data[i][j] = s;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function print(M) {
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