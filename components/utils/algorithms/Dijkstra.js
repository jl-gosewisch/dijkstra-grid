export function dijkstra(grid, startNode) {
	startNode.distance = 0
	const visitedNodes = []
	const unvisitedNodes = getNodes(grid)
	const delay = 5
	let step = 1
	while (unvisitedNodes.length) {
		unvisitedNodes.sort((a, b) => a.distance - b.distance)
		const closestNode = unvisitedNodes.shift()
		if (closestNode.isFinish()) return [visitedNodes, step * delay]
		if (closestNode.distance === Infinity) return [visitedNodes, step * delay]
		if (!closestNode.isWall()) {
			closestNode.addTimer("visited", delay * step)
			closestNode.setVisited()
			visitedNodes.push(closestNode)
			const neighbors = getNeighbors(closestNode, grid)
			for (const neighbor of neighbors) {
				neighbor.distance = closestNode.distance + 1
				neighbor.previousNode = closestNode
			}
			++step
		}
	}
}

function getNodes(grid) {
	const nodes = []
	for (const row of grid) {
		for (const node of row) {
			nodes.push(node)
		}
	}
	return nodes
}

function getNeighbors(node, grid) {
	const neighbors = []
	const { row, col } = node
	if (row !== 0) neighbors.push(grid[row - 1][col])
	if (row !== grid.length - 1) neighbors.push(grid[row + 1][col])
	if (col !== 0) neighbors.push(grid[row][col - 1])
	if (col !== grid[0].length - 1) neighbors.push(grid[row][col + 1])
	return neighbors.filter((neighbor) => !neighbor.visited)
}