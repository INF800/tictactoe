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