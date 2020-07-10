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

function returnBestMove(board){
    // creeate deep copy of board as we are going to do inplace
    var matCopy     = JSON.parse(JSON.stringify(board.matrix)) // deep copy
    var boardCopy   = new Board(matCopy)

    var bestScore = -Infinity
    var [bestScore, i, j] = mmx(boardCopy, score=bestScore, maximizing=true)

    console.log(i,j, 'idx:', vec2idx(i,j))
    return vec2idx(i,j)
}

function mmx(_board, score ,maximizing=true){
    
    var [i, j] = _board.nextMoveInRowMajor() // get next free locn
    
    // if maximizing, 'x's turn, if minimizing, 'o's turn
    var turn = null
    if (maximizing){ turn = 'x' } else { turn = 'o' }
    console.log('mmx ponder', i, j, turn)

    // update (in place)
    _board.update(i, j, turn) 
    
    // check if -1(o wins), 0(tie), +1(x wins), null(game in progress)
    var win = _board.winner()

    // base condition(s)
    // -----------------
    if ((win == 1 && maximizing==true) || (win == 1 && maximizing==false)) {
        // if, in x's turn (maximising) x won (or)
        // if in o's turn(minimizing) o lost
        return [10, i, j]
    }
    if ((win == -1 && maximizing==true) || (win == -1 && maximizing==false)) {
        // if, in x's turn (maximising) x lost (or)
        // if in o's turn(minimizing) o won
        return [-10, i, j]
    }
    if ((win == 0 && maximizing==true) || (win == 0 && maximizing==false)) {
        return [0, i, j] // same for tie
    }


    // esle if null(game in progress)
    var retScore = mmx(_board, score=score, (!maximizing)) // false<->true recursively min<->maz
    
    if (retScore > score) { return [retScore, i, j] }
    else {return [score, i, j]}
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