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

    var moves = board.allEmptyInRowMajor()
    
    var bestRowMove = null
    var bestColMove = null
    var bestScore   = -Infinity

    moves.forEach(([i, j], idx)=>{
        var matCopy     = JSON.parse(JSON.stringify(board.matrix)) // deep copy
        var boardCopy   = new Board(matCopy)

        //board.update(i, j, 'x')

        var score = minimax(boardCopy, 0, true)
        console.log('score', score)
        if (score > bestScore){
            bestScore    = score
            bestRowMove  = i
            bestColMove  = j
        } 
    })

    console.log(bestRowMove)
    return vec2idx(bestRowMove ,bestColMove)
}


function minimax(board, depth, isMaximizingPlayer){
    console.log(depth, board.matrix)
    // base condn
    if (board.winner() != null ){
        return board.winner() // never null
    }

    if (isMaximizingPlayer === true){
        var moves = board.allEmptyInRowMajor()
        var bestScore = -Infinity
        moves.forEach(([i, j], idx)=>{
            board.update(i, j, minmax2turn(isMaximizingPlayer))
            var score = minimax(board, depth+1, false)
            bestScore = Math.max(score, bestScore)
            return bestScore
        })
    } else {
        // minimizing player
        var moves = board.allEmptyInRowMajor()
        var bestScore = +Infinity
        moves.forEach(([i,j], idx)=>{
            board.update(i, j, minmax2turn(isMaximizingPlayer))
            var score = minimax(board, depth+1, true)
            bestScore = Math.min(score, bestScore)
            return bestScore
        })
    }
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