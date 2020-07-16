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
    if (board.size() === 9){ return null }
    // else,
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

    console.log('FINAL MOVE: ', bestMove, bestScore)
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
            var maxScore    = -Infinity
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
                if (score > maxScore){
                    maxScore    = score
                    bestMove    = [i,j]
                }

                // log only first recursion
                if (depth==0){console.log('---move: ', [i,j], 'score: ', score, 'best: ', maxScore, bestMove)}
                
                board.update(i,j, '')

                // ----------------------------------------------------------------------------------------
                // ALPHA PRUNING:
                //      alpha & beta at same depth are common to all nodes (just like max==true/flase)
                //      + because of same minimax function activation record
                //      + alpha and beta act like global
                //
                //      - beta  : chance of minimizingPlayer winning `o` 
                //      - alpha : chance of maximizingPlayer winning `x`
                //
                // - break the loop optimally so that minmax func is not called for subsequent possibleMoves
                // if either of these, is true, we can skip next possibleMoves by breaking loop
                //      + if chance of `o` winning (beta) is less than `x` winning (alpha)
                //      + if chance of `x` winning (alpha) is greater than `o` winning (beta)
                // ----------------------------------------------------------------------------------------
                alpha = Math.max(score, alpha) // note: current `score`
                if (beta < alpha){ /*console.log('pruned!');*/ break }
                // can use this too:
                // if ( alpha > beta ) { /*console.log('pruned!');*/ break } 
                // ----------------------------------------------------------------------------------------
            }


            // retun differently for first call (as we need data!)
            if (depth == 0){ 
                return [bestMove, maxScore]
            } else { 
                // populate memo 2of3
                memo[ JSON.stringify(board.matrix)+String(isMaximizingPlayer) ] = maxScore
                return maxScore /*comes from base condition (and searched upon)*/ 
            }
        }
        else if (!isMaximizingPlayer){
            var minScore    = +Infinity
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
                // where o always picks (FIRST)BEST-MOVE (cz. if (score < minScore))
                var score = minimax(board, alpha, beta, !isMaximizingPlayer, depth+1) // check either win / draw
                if (score < minScore){           
                    minScore    = score
                    bestMove    = [i,j]
                }


                board.update(i,j, '')

                // ----------------------------------------------------------------------------------------
                // BETA PRUNING:
                //      alpha & beta at same depth are common to all nodes (just like max==true/flase)
                //      + because of same minimax function activation record
                //
                //      - beta  : chance of minimizingPlayer winning `o` (minimizing)
                //      - alpha : chance of maximizingPlayer winning `x` (maximizing)
                //
                // - break the loop optimally so that minmax func is not called for subsequent possibleMoves
                // if either of these, is true, we can skip next possibleMoves by breaking loop
                //      + if chance of `o` winning (beta) is less than `x` winning (alpha)
                //      + if chance of `x` winning (alpha) is greater than `o` winning (beta)
                // ----------------------------------------------------------------------------------------
                beta = Math.min( beta, score ) // note: current `score`
                if ( beta < alpha ) { /*console.log('pruned!');*/ break } 
                // can use this too:
                // if ( alpha > beta ) { /*console.log('pruned!');*/ break } 
                // ----------------------------------------------------------------------------------
            }

            // populate memo 3of3
            memo[ JSON.stringify(board.matrix)+String(isMaximizingPlayer) ] = minScore
            return minScore // comes from base condition (and searched upon)
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