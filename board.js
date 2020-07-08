/**
 * Class for tic tac toe board
 */

class Board {
    constructor() {
        this.matrix = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }

    update(i, j, val){
        // pos   - [i][j]
        // val   - 'x' / 'o'
        this.matrix[i][j] = val
    }

    winner(){
        // check rows / cols
        for(let iter=0; iter<3; iter++){
            // rows
            if(this.matrix[iter][0] === this.matrix[iter][1] && this.matrix[iter][0] === this.matrix[iter][2] && this.matrix[iter][0] !== ''){
                return this.matrix[iter][0]
            }
            // cols
            if(this.matrix[0][iter] === this.matrix[1][iter] && this.matrix[0][iter] === this.matrix[2][iter] && this.matrix[0][iter] !== ''){
                return this.matrix[0][iter]
            }
        }
        // check diags
        // principal
        if(this.matrix[0][0] === this.matrix[1][1] && this.matrix[0][0] === this.matrix[2][2] && this.matrix[0][0] !== ''){
            return this.matrix[0][0]
        }
        // non principal
        if(this.matrix[0][2] === this.matrix[1][1] && this.matrix[0][2] === this.matrix[2][0] && this.matrix[0][2] !== ''){
            return this.matrix[0][2]
        }
    
        return -1
    }

  }