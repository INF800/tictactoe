/**
 * Minimax algorithm that operates on
 * Instance of Board
 */

var clicked = new Set([])

function miniMaxMove(board){
    
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

function returnBestMove(){
    // creeate deep copy of board as we are going to do inplace
    var matCopy     = JSON.parse(JSON.stringify(board.matrix)) // deep copy
    var boardCopy   = new Board(matCopy)

    bestScore = -Infinity
    var [] = mmx(boardCopy, maximizing=true)

}

function mmx(_board, maximizing=true, myscore=-Infinity){
    
    var [i, j] = _board.nextMoveInRowMajor() // get next free locn
    
    // if maximizing, 'x's turn, if minimizing, 'o's turn
    var turn = null
    if (maximizing){ turn = 'x' } else { turn = 'o' }

    // update (in place)
    _board.update(i, j, turn) 
    
    // check if -1(o wins), 0(tie), +1(x wins), null(game in progress)
    var win = _board.winner()

    // base condition(s)
    // -----------------
    if ((win == 1 && maximizing==true) || (win == 1 && maximizing==false)) {
        // if, in x's turn (maximising) x won (or)
        // if in o's turn(minimizing) o lost
        return 10
    }
    if ((win == -1 && maximizing==true) || (win == -1 && maximizing==false)) {
        // if, in x's turn (maximising) x lost (or)
        // if in o's turn(minimizing) o won
        return -10
    }
    if ((win == 0 && maximizing==true) || (win == 0 && maximizing==false)) {
        return 0 // same for tie
    }

    // esle if null(game in progress)
    var score = mmx(_board, (!maximizing)) // false<->true recursively min<->maz
    if (score > myscore){ return [score, i, j] }
    return { [myscore, i, j] }
}