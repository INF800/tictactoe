/**
 * Minimax algorithm that operates on
 * Instance of Board
 */

var clicked = new Set([])
const memo = new Map()

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
    var matCopy     = JSON.parse(JSON.stringify(board.matrix)) // deep copy
    var boardCopy   = new Board(matCopy)

    var [bestMove, bestScore] = minimax(boardCopy, -Infinity, +Infinity, true, 0)

    console.log(bestMove, bestScore)
    return vec2idx( bestMove[0], bestMove[1])
}

function minimax(board, alpha ,beta ,isMaximizingPlayer, depth){

    // ----------------------------------------------------------------------------------
    // MEMOISATION:
    // ----------------------------------------------------------------------------------
    if ((JSON.stringify(board.matrix)+String(isMaximizingPlayer) in memo) && (depth!=0)){ // depth=0 returning difft 
        // return from memo
        return memo[JSON.stringify(board.matrix)+String(isMaximizingPlayer)]
    }
    // else, populate memo!
    // ----------------------------------------------------------------------------------

    // base condition 
    // independant of maximizing/mininimizing bool as,
    // it is used to represent only final sate!
    stat = board.winner()
    if (stat != null){
        // populate memo 1of3
        memo[ JSON.stringify(board.matrix)+String(isMaximizingPlayer) ] = stat        
        return stat // -1 / +1 / 0 irrespective of minimizing/maximizing player
    }

    else if (stat == null){
        // game in progress
        if (isMaximizingPlayer){
            var bestScore   = -Infinity
            var bestMove    = [null, null]

            var possibleMoves = board.possibleMovesInRowMajor()
            for(let iter=0; iter<possibleMoves.length; iter++){

                var i = possibleMoves[iter][0]
                var j = possibleMoves[iter][1]
                board.update(i,j, bool2turn(isMaximizingPlayer))
                
                // for maximizing player - 'x'
                // if x wins, score = +1 (but can be 0 / -1 as well indicating draw/o-win respectively)
                // so, lookout for max i.e +1 (if +1 not avl. in search space -> 0 )
                var score = minimax(board, alpha, beta, !isMaximizingPlayer, depth+1) // check either win / draw
                if (score > bestScore){
                    bestScore   = score
                    // alpha       = score // record alpha
                    bestMove    = [i,j]
                }

                // log only first recursion
                if (depth==0){console.log('move: ', [i,j], 'score: ', score, 'best: ', bestScore, bestMove)}
                
                board.update(i,j, '')

                // ----------------------------------------------------------------------------------
                // ALPHA PRUNING:
                // ----------------------------------------------------------------------------------
                // if (score < alpha){ /*console.log('pruned!');*/ break } 
                // ----------------------------------------------------------------------------------
            }


            // retun differently for first call (as we need data!)
            if (depth == 0){ 
                return [bestMove, bestScore]
            } else { 
                // populate memo 2of3
                memo[ JSON.stringify(board.matrix)+String(isMaximizingPlayer) ] = bestScore
                return bestScore /*comes from base condition (and searched upon)*/ 
            }
        }
        else if (!isMaximizingPlayer){
            var bestScore   = +Infinity
            var bestMove    = [null, null]

            var possibleMoves2 = board.possibleMovesInRowMajor()
            for(let iter=0; iter<possibleMoves2.length; iter++){
                
                var i = possibleMoves2[iter][0]
                var j = possibleMoves2[iter][1]

                board.update(i,j, bool2turn(isMaximizingPlayer))
                // for minimizing player - 'o'
                // if o wins, score = -1 (but can be 0 / +1 as well indicating draw/x-win respectively)
                // so, lookout for min i.e -1 (if -1 not avl. in search space -> 0 )
                // ------------------------------------------------------------------------------------
                // Looking for min cz, we are expanding our search space for WORST-CASE-SCENARIO
                // where o allways picks FIRST-BEST-MOVE (cz. if (score < bestScore))
                var score = minimax(board, alpha, beta, !isMaximizingPlayer, depth+1) // check either win / draw
                if (score < bestScore){
                    bestScore   = score
                    // beta        = score // record beta
                    bestMove    = [i,j]
                }
                
                board.update(i,j, '')

                // ----------------------------------------------------------------------------------
                // BETA PRUNING: we are trying to find min possible
                //                  - beta records min (just like bestScore)
                //                  - break the loop optimally so that minmax func is not called for
                //                      subsequent possibleMoves
                //                  - optimal? nope
                // ----------------------------------------------------------------------------------
                // if (score > beta){ /*console.log('pruned!');*/ break} 
                // ----------------------------------------------------------------------------------
            }

            // populate memo 3of3
            memo[ JSON.stringify(board.matrix)+String(isMaximizingPlayer) ] = bestScore
            return bestScore // comes from base condition (and searched upon)
        }
    }
}


const bool2turn = (maxOrMin) => {
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