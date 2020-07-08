/**
 * Driver code
 */

board = new Board()

async function onPlayerMove(i){
    // console.log('clicked', i)
    if (clicked.has(i)){
        console.log('already clicked!')
    } else {
        // 1-1 - UPDATE ENV (Player move)
        box[i].style.boxShadow = 'inset 2px 2px 4px #CBCBCB, inset -2px -2px 4px #FFFFFF'
        box[i].innerText = player() // 'o'
        clicked.add(i)

        // 1-2 - UPDATE BOARD (Player move)
        updateBoardAfterMove(i, player)
        //console.log(board.matrix)

        // wait for some time
        await new Promise(r => setTimeout(r, 300));

        // 2 MINIMAX MOVE 
        idx = miniMaxMove(board)

        // idx is null if whole board is full 
        // exec only if atleast on of places in board is empty 
        if (idx != null){
            // 2-1 - UPDATE ENV (minimax move)
            box[idx].style.boxShadow = 'inset 2px 2px 4px #CBCBCB, inset -2px -2px 4px #FFFFFF'
            box[idx].style.color = 'rgba(0,0,0,0.6)'
            box[idx].innerText = miniMax() // 'x'
            clicked.add(idx) // extra

            // 2-2 - UPDATE BOARD (minimax move)
            updateBoardAfterMove(idx, miniMax)
            console.log(board.matrix)   
        }
    }
}


function updateBoardAfterMove(i, who){
    switch(i) {
        case 0: board.update(0, 0, who()); break;
        case 1: board.update(0, 1, who()); break;
        case 2: board.update(0, 2, who()); break;
        case 3: board.update(1, 0, who()); break;
        case 4: board.update(1, 1, who()); break;
        case 5: board.update(1, 2, who()); break;
        case 6: board.update(2, 0, who()); break;
        case 7: board.update(2, 1, who()); break;
        case 8: board.update(2, 2, who()); break;
        default: console.log('error!'); break;
      }
}


function player(){
    return 'o'
}

function miniMax(){
    return 'x'
}