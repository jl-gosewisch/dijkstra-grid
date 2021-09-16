import React, { Component } from 'react'
import Node from './utils/Node'
import NodeComponent from './NodeComponent'
import ControllButton from './Button'
import { dijkstra } from './utils/algorithms/Dijkstra'

export default class GridComponent extends Component {

    constructor(props) {
        super(props)
        this.running = false
        this.reset = 1
        this.state = {
            grid: [],
            mouseDown: false,
            mouseDownRow: null,
            mouseDownCol: null,
            mouseDownOnStart: false,
            mouseDownOnFinish: false,
        }
    }

    componentDidMount() {
        const grid = this.createGrid(this.props.rows, this.props.cols)
        this.setState({grid})
    }

    createGrid(rows, cols) {
        let grid = new Array(rows)
        for(let r = 0; r < rows; ++r) {
            grid[r] = new Array(cols)
            for (let c = 0; c < cols; ++c) {
                grid[r][c] = new Node(r, c)
                if(c == 0 && r == 0) {
                    grid[r][c].toggleStart()
                }
                if(c == (cols-1) && r == (rows-1)) {
                    grid[r][c].toggleFinish()
                }
            }
        }
        return grid
    }

    resetGrid() {
        if (this.running) return
        const newGrid = this.createGrid(this.props.rows, this.props.cols)
        this.reset = (this.reset == 1) ? -1 : 1
        this.setState({grid: newGrid})
    }

    clearWalls() {
        if (this.running) return
        const grid = this.state.grid.slice()
        for (const row of grid) {
            for (const node of row) {
                if (node.isWall()) {
                    node.toggleWall()
                }
            }
        }
        this.setState({grid: grid})
    }

    findStartAndFinish(grid) {
        let start
        let finish
        for (const row of grid) {
            for (const node of row) {
                if (node.isStart()) {
                    start = node
                }
                else if (node.isFinish()) {
                    finish = node
                }
                else {
                    continue
                }
            }
        }
        return [start, finish]
    }

    visualizeDikstra() {
        this.running = true
        const { grid } = this.state
        let [start, finish] = this.findStartAndFinish(grid)
        let [visitedNodes, delay] = dijkstra(grid, start)
        let [pathNodes, finalDelay] = this.makePath(finish, delay)
        this.animateAlgorithm(visitedNodes, pathNodes)
        const trueToFalse = setTimeout(() => {this.running = false}, finalDelay)
    }
    
    makePath(node, timeDelay) {
        let currentNode = node;
		let path = [];
        let delay = timeDelay
        let step = 1
		while (currentNode !== null) {
            delay += 20
            currentNode.addTimer("path", delay)
			path.unshift(currentNode);
			currentNode = currentNode.previousNode;
		}
		return [path, delay];
    }

    animateAlgorithm(visitedNodes, pathNodes) {
        const { grid } = this.state
        let animatedNewGrid = grid.slice()
        for (const node of visitedNodes) {
            let row = node.row
            let col = node.col
            animatedNewGrid[row][col] = node
        }
        for (const node of pathNodes) {
            let row = node.row
            let col = node.col
            animatedNewGrid[row][col] = node
        }
        this.setState({grid: animatedNewGrid})
    }

    toggleNodeState(grid, state, row, col) {
        const newGrid = grid.slice()
        switch (state) {
            case "Start":
                newGrid[row][col].toggleStart()
                break
            case "Finish":
                newGrid[row][col].toggleFinish()
                break
            case "Wall":
                newGrid[row][col].toggleWall()
                break
        }
        return newGrid

    }

    handleMouseDown(row, col) {
        if (!this.running) {
            let { grid } = this.state
            this.setState({mouseOnRow: row, mouseOnCol: col, mouseDown: true})
            if (grid[row][col].isStart()) {
                this.setState({ mouseIsOnStart: true })
            }
            else if (grid[row][col].isFinish()) {
                this.setState({ mouseIsOnFinish: true} )
            }
            else {
                let newGrid = this.toggleNodeState(grid, "Wall", row, col)
                this.setState({ grid: newGrid })
            }
        }  
    }
    
    handleMouseEnter(row,col) {
        if (!this.running) {
            if(!this.state.mouseDown) return
            const { grid, mouseIsOnStart, mouseIsOnFinish, mouseOnRow, mouseOnCol } = this.state
            let enteredNode = grid[row][col]
            if (mouseIsOnStart) {
                if (enteredNode.isWall()) {
                    return
                }
                let newGrid = this.toggleNodeState(grid, "Start", mouseOnRow, mouseOnCol)
                newGrid = this.toggleNodeState(newGrid, "Start", row, col)
            }
            else if (mouseIsOnFinish) {
                if (enteredNode.isWall()) {
                    return
                }
                let newGrid = this.toggleNodeState(grid, "Finish", row, col)
                newGrid = this.toggleNodeState(newGrid, "Finish", mouseOnRow, mouseOnCol)
            }
            else {
                if (enteredNode.isStart() || enteredNode.isFinish()) {
                    return
                }
                let newGrid = this.toggleNodeState(grid, "Wall", row, col)
                this.setState({ grid: newGrid })
            }
            this.setState({mouseOnRow: row, mouseOnCol: col})
        }
    }
    
    handleMouseUp() {
        if (!this.running) {
        this.setState({mouseDown: false, mouseIsOnFinish: false, mouseIsOnStart:false})
        }
    }

    render() {
        const { grid } = this.state
        const algoCall = this.visualizeDikstra.bind(this)
        const resetCall = this.resetGrid.bind(this)
        const removeWallCall = this.clearWalls.bind(this)
        return (
            <>
                <div className="flex flex-col items-center font-mono mx-auto max-w-screen-md mt-8 mb-4">
                    <h1 className="text-3xl sm:text-4xl text-center">Dijkstra your way!</h1>
                    <p className="text-sm sm:text-md text-center m-4">Der Algorithmus von Dijkstra sucht einen Weg vom Start <span className="w-4 h-4 bg-green-600 inline-block"></span> zum Ziel <span className="w-4 h-4 bg-red-600 inline-block"></span>. Mit deinem Cursor kannst du Start & Ziel verschieben und Mauern <span className="w-4 h-4 bg-gray-600 inline-block"></span> erzeugen bzw. auch wieder entfernen. Sollte etwas schiefgehen, einfach den Zurücksetzen-Button benutzen.</p>
                    <div className="flex flex-row">
                        <ControllButton handler={algoCall} text="Weg finden" />
                        <ControllButton handler={resetCall} text="Zurücksetzen" />
                        <ControllButton handler={removeWallCall} text="Wände entfernen" />
                    </div>
                </div>
                <div className="flex flex-col mx-auto mb-8 mt-4">
                    {grid.map((row, rKey) => {
                                    return (
                                        <div key={rKey} className="flex flex-rows">
                                            {row.map((node, nKey) => {
                                                let typeofNode
                                                if (node.isStart()) {
                                                    typeofNode = "start"
                                                }
                                                else if (node.isFinish()) {
                                                    typeofNode = "finish"
                                                }
                                                else if (node.isWall()) {
                                                    typeofNode = "wall"
                                                }
                                                else if (!node.timers.length == 0) {
                                                    typeofNode = "timed"
                                                }
                                                return (
                                                    <NodeComponent
                                                        key={this.reset * (nKey + 1)}
                                                        row={node.row}
                                                        col={node.col}
                                                        type={typeofNode}
                                                        timers={node.timers}
                                                        oMD={(row,col) => this.handleMouseDown(row,col)}
                                                        oME={(row,col) => this.handleMouseEnter(row,col)}
                                                        oMU={() => this.handleMouseUp()}
                                                    />
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                </div>
            </>
        )
    }
}
