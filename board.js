/**
 * Class for tic tac toe board
 */

id = new Map()
id['x'] = 1
id['o'] = -1

class Board {
    constructor(matrix=[['', '', ''],['', '', ''],['', '', '']]) {
        this.matrix = matrix
    }

    update(i, j, val){
        // pos   - [i][j]
        // val   - 'x' / 'o'
        this.matrix[i][j] = val
    }

    winner(){
        // 1. return a winner (1: minimax -1:player)
        // -----------------------------------------
        // check rows & cols
        for(let iter=0; iter<3; iter++){
            if(this.matrix[iter][0] === this.matrix[iter][1] && this.matrix[iter][0] === this.matrix[iter][2] && this.matrix[iter][0] !== ''){
                return id[this.matrix[iter][0]]
            }
            if(this.matrix[0][iter] === this.matrix[1][iter] && this.matrix[0][iter] === this.matrix[2][iter] && this.matrix[0][iter] !== ''){
                return id[this.matrix[0][iter]]
            }
        }
        // check diags -- principal & non principal
        if(this.matrix[0][0] === this.matrix[1][1] && this.matrix[0][0] === this.matrix[2][2] && this.matrix[0][0] !== ''){
            return id[this.matrix[0][0]]
        }
        if(this.matrix[0][2] === this.matrix[1][1] && this.matrix[0][2] === this.matrix[2][0] && this.matrix[0][2] !== ''){
            return id[this.matrix[0][2]]
        }

        // 2. return a draw (0)
        // --------------------
        if (this.size()===9){
            return 0
        }

        // if nothing satisfied
        return null // game in progress
    }

    size(){
        var len = 0
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if (this.matrix[i][j] != ''){
                    len += 1
                }
            }
        }
        return len
    }

    possibleMovesInRowMajor(){
        var list = []
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if (this.matrix[i][j] == '') {list.push([i, j])}
            }
        }
        return list
    }
}