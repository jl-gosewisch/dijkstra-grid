import Node from "./Node"

class Grid {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.start = [0, 0]
        this.finish = [rows-1, cols-1]
        this.grid = []
        for (let r = 0; r < rows; r++) {
            this.grid[r] = []
            for (let c = 0; c < cols; c++) {
                this.grid[r][c] = new Node(r, c)
                if(r == this.start[0] && c == this.start[1]){
                    this.grid[r][c].toggleStart()
                }
                if(r == this.finish[0] && c == this.finish[1]){
                    this.grid[r][c].toggleFinish()
                }
            }
        }
    }
    getGrid() {
        return this.grid
    }
    updateGrid(cols) {
        if (cols > this.cols) {
            let newColsToBeAdded = cols - this.cols
            for(let r = 0; r < this.rows; r++) {
                for(let c = 1; c <= newColsToBeAdded; c++) {
                    this.grid[r][this.cols + c] = new Node(r, this.cols + c)   
                }
            }
            this.cols = cols
        }
        else if ( cols < this.cols) {
            let newMaxColIndex = this.cols - cols - 1
            let startState = [false, []]
            let finishState = [false, []]
            for(let r = 0; r < this.rows; r++) {
                for(let c = newMaxColIndex; c < this.cols; c++) {
                    if(this.grid[r][c].isStart()) {
                        startState[0] = true
                        startState[1][0] = r
                        startState[1][1] = c
                    }
                    if(this.grid[r][c].isFinish()) {
                        finishState[0] = true
                        finishState[1][0] = r
                        finishState[1][1] = c
                    }
                }
                this.grid[r].splice(newMaxColIndex, (this.cols-cols))
            }
            if(startState[0]) {
                this.grid[startState[1][0]][startState[1][1]].toggleStart()
            }
            if(finishState[0]) {
                this.grid[finishState[1][0]][finishState[1][1]].toggleFinish()
            }
        }
        else {
            return
        }
    }
}