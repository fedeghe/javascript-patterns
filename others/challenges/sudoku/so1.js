const b = null;

//test cases

const bd1 = [
    [1, b, b, b, b, b, b, b, 7],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, 5, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, 1, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, 2, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, 6],
] 

const bd2 = [
    [1, b, 5, b, b, b, b, b, 3],
    [3, b, b, b, b, b, b, b, b],
    [b, b, b, b, 8, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, 4, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, 3, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, 9],
]

const bd3 = [
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
] 

//words toughest 2012
const bdTf = [
    [8, b, b, b, b, b, b, b, b],
    [b, b, 3, 6, b, b, b, b, b],
    [b, 7, b, b, 9, b, 2, b, b],
    [b, 5, b, b, b, 7, b, b, b],
    [b, b, b, b, 4, 5, 7, b, b],
    [b, b, b, 1, b, b, b, 3, b],
    [b, b, 1, b, b, b, b, 6, 8],
    [b, b, 8, 5, b, b, b, 1, b],
    [b, 9, b, b, b, b, 4, b, b],
] 



function solveSudoku(board) {
    if (solveSudokud(board)) {
        return board
    } else {
        const possibilities = nextBoards(board)
        const validBoards = keepOnlyValid(possibilities) //filterFunction
        return searchForSolution(validBoards) //helperFunction :backtracking
    }
}

function searchForSolution(boards) {    
    if (boards.length < 1) {        //checking the board is empty
        return false
    } else {        
        var first = boards.shift()  //tak̉es the first board off and stores in the variable
        const tryPath = solveSudoku(first)   
        if (tryPath != false) { //checking if tryPath is false or not. if it is not false, we wil return the solved board
            return tryPath
        } else {
            return searchForSolution(boards)    
        }        
    }
}
function solveSudokud(board) {
    for (var i = 0; i < 9; i++) {       
        for (var j = 0; j < 9; j++) {
            if (board[i][j] === null) {
                return false
            }
        }
    }
    return true
}
//nextBoardFunction will generate 9 possiblities for a pissible sudoku board
function nextBoards(board) { 
    var res = [];       
    const firstEmpty = findEmptySquare(board) 
    if (firstEmpty != undefined) {     //if firstEmpty = not defined , then we will start generating possiblities 
        const y = firstEmpty[0]     
        const x = firstEmpty[1]
        for (var i = 1; i < 10; i++) {
            var newBoard = [...board]
            var row = [...newBoard[y]]
            row[x] = i
            newBoard[y] = row
            res.push(newBoard)
        }
    }
    return res // if firstEmpty does =  undefined that means there are no possibilities left and return res.
}

function findEmptySquare(board) {
    // board --> [int, int] | represents the x and y coordinates of the empty sq
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] == null) {
                return [i, j]
            }
        }
    }
}
//filter funtion
function keepOnlyValid(boards) {
    return boards.filter(b => validBoard(b))    //filtered version of the board array will be returned
}   
function validBoard(board) {
    
    // check each row
    for(let i=0; i<9; i++) {
        if(!validate(board[i])) return false
    }
    //check each col
    for(let i=0; i<9; i++) {
        var arr = []
        for(let j=0; j<9; j++) {
            arr.push(board[j][i]);
        }
        if(!validate(arr)) return false;
    }
    //check each 3*3
    let row = [[0,1,2], [3,4,5], [6,7,8]]
    let col = [[0,1,2], [3,4,5], [6,7,8]]
    for(let i of row) {
        for(let j of col) {
            let arr = [];
            for(let num1 of i) {
                for(let num2 of j){
                    arr.push(board[num1][num2]);
                }
            }
            if(!validate(arr)) return false;
        }
    }
    return true
}



function validate(arr) {
    //check duplicates
    let set1 = new Set();
    for(let i=0; i< arr.length; i++) {
        if(arr[i] === b) continue;
        if(set1.has(arr[i])) return false
        set1.add(arr[i]);
    }
    return true
}


//for better visualisation and able to check manually

function get_row(board, row) {
    
    return board[row]
    
}
function print_cell(value) {
    if (Array.isArray(value)) {
        return '.'
    } else if (value == null) {
        return '.'
    } else {
        return value
    }
}
function print_board(board) {
   
    console.log()
    for (i = 0; i < 9; i++) {
        let row = get_row(board, i)
        if (i % 3 == 0) {
            console.log("|=======|=======|=======|")
        }
        console.log("|",
            print_cell(row[0]), print_cell(row[1]), print_cell(row[2]), "|",
            print_cell(row[3]), print_cell(row[4]), print_cell(row[5]), "|",
            print_cell(row[6]), print_cell(row[7]), print_cell(row[8]), "|")
    }
    console.log("|=======|=======|=======|")
}

// console.log('testcase 1')
// print_board(bd1)
// print_board(solveSudoku(bd1))
// console.log('testcase 2')
// print_board(bd2)
// print_board(solveSudoku(bd2))
// console.log('testcase 3')
// print_board(bd3)
// print_board(solveSudoku(bd3))

console.time('so')
console.log('testcase 4')
print_board(bdTf)
print_board(solveSudoku(bdTf))
console.timeEnd('so')