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

  }