/**
 * Handle envirnment and basic layout including
 * User action like player move
 */

const body = document.getElementById('body')
const box = document.getElementsByClassName('box')

if (( window.innerWidth > 800 ) && ( window.innerHeight > 600 )){
    // desktop
} else {
    // mob
    body.style.width = '80%'

    for (let i=0; i<box.length; i++){
        box[i].style.fontSize = '20vw'
    }
}

for (let i=0; i<box.length; i++){
    box[i].addEventListener('click', ()=>{
        onPlayerMove(i)
    })
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