export default class Node {
    constructor(row, col) {
        this.row = row
        this.col = col
        this.start = false
        this.finish = false
        this.wall = false
        this.timers = []
        this.visited = false
        this.distance = Infinity
        this.previousNode = null
    }

    toggleStart() {
        this.start = !this.start
    }

    toggleFinish() {
        this.finish = !this.finish
    }

    toggleWall() {
        this.wall = !this.wall
    }
    
    addTimer(type, time) {
        this.timers.push([type, time])
    }

    noTimers() {
        return (this.timers.length == 0)
    }

    setVisited() {
        this.visited = true
    }

    isStart() {
        return this.start
    }

    isFinish() {
        return this.finish
    }

    isWall() {
        return this.wall
    }

    isVisable() {
        return !this.wall
    }

}