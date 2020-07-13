
class solver {

    constructor(board) {
        this.board = board;

        if (this.isValidSudoku(this.board)) {                       //Check first if the sudoku is valid
            if (this.solve(this.board, this.board.length)) {        //Start the solving process.
                return this.board;                                  //If "solve" returns true, then return the solved board
            } else {
                return false;                                       //Else return false
            }
        }else{
            return false;                                           //If it's not a valid sudoku, return false
        }
    }

    //Original code by 29AjayKumar. Found on https://www.geeksforgeeks.org/sudoku-backtracking-7/
    solve(board, n) {

        let row = -1;
        let col = -1;
        let isEmpty = true;

        //Checks if there's any empty spot left
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (this.board[i][j] === 0) {
                    row = i;
                    col = j;

                    isEmpty = false;
                    break;
                }
            }
            if (!isEmpty) {
                break;
            }
        }

        // no empty space left 
        if (isEmpty) {
            return true;
        }

        // else for each-row backtrack 
        for (let num = 1; num <= n; num++) {
            if (this.isValid(board, row, col, num)) {
                this.board[row][col] = num;
                if (this.solve(board, n)) {
                    return true;
                }
                else {
                    // replace it
                    this.board[row][col] = 0;
                }
            }
        }

        return false;
    }

    isValid(board, col, row, num) {
        //Check rows
        for (let i = 0; i < board.length; i++) {
            if (i !== col) { //Dont check own number
                if (board[i][row] === num) return false;
            }
        }

        //Check Y Axis
        for (let i = 0; i < board.length; i++) {
            if (i !== row) { //Dont check own number
                if (board[col][i] === num) return false;
            }
        }

        //Check box. Also by 29AjayKumar
        let sqrt = Number(Math.sqrt(board.length));
        let boxRowStart = col - col % sqrt;
        let boxColStart = row - row % sqrt;

        for (let i = boxRowStart; i < boxRowStart + sqrt; i++) {
            for (let j = boxColStart; j < boxColStart + sqrt; j++) {
                if (i !== col && j !== row) {
                    if (board[i][j] === num) {
                        return false;
                    }
                }
            }
        }
        
        return true; //Else it must be valid
    }

    isValidSudoku(board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] !== 0 && !this.isValid(board, i, j, board[i][j])) return false;
            }
        }

        return true;
    }

}



export default solver;

