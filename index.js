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
        // 2-3 - CHECK STATUS WIN/LOSE
        await checkStatus()
        

        // wait for some time 
        await new Promise(r => setTimeout(r, 300));

        // 2 MINIMAX MOVE 
        idx = miniMaxMove(board)

        // idx is null if whole board is full. (minimax cannot make move as all are filled)
        // exec next move only if atleast on of places in board is empty. 
        if (idx != null){
            // 2-1 - UPDATE ENV (minimax move)
            box[idx].style.boxShadow = 'inset 2px 2px 4px #CBCBCB, inset -2px -2px 4px #FFFFFF'
            box[idx].innerText = miniMax() // 'x'
            clicked.add(idx)

            // 2-2 - UPDATE BOARD (minimax move)
            updateBoardAfterMove(idx, miniMax)
            console.log(board.matrix)   

            // 2-3 - CHECK STATUS WIN/LOSE
            await checkStatus()
            
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

var Name = new Map()
Name[1] = 'MiniMax'
Name[-1] = 'Player'

async function checkStatus(){
    // boad.winner() -->
    // null : game in progress
    // -1   : player win
    // 1    : miniMax win
    // 0    : draw 
    var winner = board.winner() 
    
    if (winner === -1 || winner==1){
        console.log('winner is: ', winner)
        // wait for some time before clearing env and board
        status.innerText = Name[winner] + ' won the game!'
        await new Promise(r => setTimeout(r, 2000));
    } else if (winner==0) {
        status.innerText = 'Game Draw!'
        await new Promise(r => setTimeout(r, 2000));
    } 
    if (winner != null){
        // reset env and board and other things when game
        // not in progress i.e ends
        resetEnvAndBoard()
    } 
}

function resetEnvAndBoard(){
    // reset board
    board = new Board()

    // reset env
    for (let i=0; i<box.length; i++){
        box[i].style.boxShadow = '4.5px 4.5px 9px #CBCBCB, -4.5px -4.5px 9px #FFFFFF'
        box[i].innerText = ''
    }

    // reset clicked & status
    clicked = new Set([])
    status.innerText = ''
}

