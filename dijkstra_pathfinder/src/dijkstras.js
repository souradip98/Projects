export function dijkstras(grid,start,finish){
  const visited=[];
  start.distance=0;
  const unVisited=getAllNodes(grid);
  var n=unVisited.length;
  while(n--){
    const closestNode=findNode(grid);
    if(typeof(closestNode) != "undefined"){
      if(closestNode.isWall){
        closestNode.isVisited=true;
        continue;
      }
      if(closestNode.distance ===Infinity){
        return visited;
      }
      closestNode.isVisited=true;
      grid[closestNode.row][closestNode.col].isVisited=true;
      visited.push(closestNode);
      if(closestNode===finish){
        visited.push(closestNode);
        return visited;
      }
      updateNeighbours(grid,closestNode);
    }
  }
}
function getAllNodes(grid){
  const temp=[];
  for(const row of grid){
    for(const node of row){
      temp.push(node);
    }
  }
  return temp;
}
function findNode(grid){
  var max=Infinity;
  var vertex;
  for(const row of grid){
    for(const node of row){
      if(node.distance<=max && !node.isVisited){
        max=node.distance;
        vertex=node;
      }
    }
  }
  return vertex;
}
function updateNeighbours(grid,closestNode){
  var neighbours=[];
  const i=closestNode.row;
  const j=closestNode.col;
  if(i>0){
    neighbours.push(grid[i-1][j])
  }
  if(i<grid.length -1){
    neighbours.push(grid[i+1][j]);
  }
  if(j>0){
    neighbours.push(grid[i][j-1]);
  }
  if(j<grid[0].length){
    neighbours.push(grid[i][j+1]);
  }
  for(const neighbor of neighbours){
    if(typeof neighbor !="undefined"){
      if(neighbor.isVisited === false){
        neighbor.distance=Math.min(neighbor.distance, closestNode.distance+1);
        neighbor.previousNode=closestNode;
        grid[neighbor.row][neighbor.col].distance=neighbor.distance;
        grid[neighbor.row][neighbor.col].previousNode=closestNode;
      }
    }
  }
}
export function getPath(finishNode){
  const path=[];
  var temp=finishNode;
  while(temp!==null){
    path.push(temp);
    temp=temp.previousNode;
  }
  return path;
}

// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
// export function dijkstras(grid, startNode, finishNode) {
//   const visitedNodesInOrder = [];
//   startNode.distance = 0;
//   const unvisitedNodes = getAllNodes(grid);
//   while (!!unvisitedNodes.length) {
//     sortNodesByDistance(unvisitedNodes);
//     const closestNode = unvisitedNodes.shift();
//     // If we encounter a wall, we skip it.
//     if (closestNode.isWall) continue;
//     // If the closest node is at a distance of infinity,
//     // we must be trapped and should therefore stop.
//     if (closestNode.distance === Infinity) return visitedNodesInOrder;
//     closestNode.isVisited = true;
//     visitedNodesInOrder.push(closestNode);
//     if (closestNode === finishNode) return visitedNodesInOrder;
//     updateUnvisitedNeighbors(closestNode, grid);
//   }
// }

// function sortNodesByDistance(unvisitedNodes) {
//   unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
// }

// function updateUnvisitedNeighbors(node, grid) {
//   const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
//   for (const neighbor of unvisitedNeighbors) {
//     neighbor.distance = node.distance + 1;
//     neighbor.previousNode = node;
//   }
// }

// function getUnvisitedNeighbors(node, grid) {
//   const neighbors = [];
//   const {col, row} = node;
//   if (row > 0) neighbors.push(grid[row - 1][col]);
//   if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
//   if (col > 0) neighbors.push(grid[row][col - 1]);
//   if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
//   return neighbors.filter(neighbor => !neighbor.isVisited);
// }

// function getAllNodes(grid) {
//   const nodes = [];
//   for (const row of grid) {
//     for (const node of row) {
//       nodes.push(node);
//     }
//   }
//   return nodes;
// }

// // Backtracks from the finishNode to find the shortest path.
// // Only works when called *after* the dijkstra method above.
// export function getPath(finishNode) {
//   const nodesInShortestPathOrder = [];
//   let currentNode = finishNode;
//   while (currentNode !== null) {
//     nodesInShortestPathOrder.unshift(currentNode);
//     currentNode = currentNode.previousNode;
//   }
//   return nodesInShortestPathOrder;
// }
