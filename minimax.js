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
    if (cntr === 100){
        console.log('100idx', idx)
        return null
    }

    console.log(idx)
    return idx
}