/**
 * Minimax algorithm that operates on
 * Instance of Board
 */

var clicked = new Set([])

function randomMove(board){

    var idx = Math.floor(Math.random() * 9 )

    // console.log(clicked.has(idx))
    cntr = 0
    while ((clicked.has(idx) === true) && (cntr<100)) {
        cntr += 1
        console.log(idx)
        idx = Math.floor(Math.random() * 9 )
    }

    // all filled
    if (board.size() === 9){
        return null
    }

    // else
    console.log(idx)
    return idx
}
/*
var matCopy     = JSON.parse(JSON.stringify(board.matrix)) // deep copy
var boardCopy   = new Board(matCopy)
*/

function returnBestMove(board){ 
    // own copy of board
    var matCopy     = JSON.parse(JSON.stringify(board.matrix)) // deep copy
    var boardCopy   = new Board(matCopy)

    var emptys      = boardCopy.allEmptyInRowMajor()
    var score       = -Infinity
    
    emptys.forEach((item, idx)=>{

        var [i, j] = item
        score = minimax(boardCopy, [score, i, j], maximizing=true)

        console.log(i, j, score)
    })
}

function minimax(board, data, maximizing){
    board.update(data[1], data[2], minmax2turn(maximizing))
    
    // base conditon
}



const minmax2turn = (maxOrMin) => {
    if (maxOrMin === true){
        return 'x'
    } else {
        // false (min)
        return 'o'
    }
}

function vec2idx(i, j){
    if (i === 0 && j == 0) { return 0 }
    if (i === 0 && j == 1) { return 1 }
    if (i === 0 && j == 2) { return 2 }
    if (i === 1 && j == 0) { return 3 }
    if (i === 1 && j == 1) { return 4 }
    if (i === 1 && j == 2) { return 5 }
    if (i === 2 && j == 0) { return 6 }
    if (i === 2 && j == 1) { return 7 }
    if (i === 2 && j == 2) { return 8 }
}