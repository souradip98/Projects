import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstras,getPath} from '../dijkstras';
import './Path_visualization.css';

const START_NODE_ROW  =  5;
const START_NODE_COL  = 15;
const FINISH_NODE_ROW =  14;
const FINISH_NODE_COL = 30;
export default class PathfindingVisualizer extends Component {
  constructor(){
    super();
    this.state = {
      grid: [],
      mousePressed:false
    };
  }
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }
  handleMouseDown(row,col){
    const {grid}=this.state;
    const newGrid=getGridWithWalls(grid,row,col);
    this.setState({grid:newGrid,mousePressed:true});
    console.log(grid)
  }
  handleMouseEnter(row,col){
    if(this.state.mousePressed===false){
      return;
    }
    const {grid}=this.state;
    const newGrid=getGridWithWalls(grid,row,col);
    this.setState({grid:newGrid});
  }
  handleMouseUp(){
    this.setState({mousePressed:false});
  }
  animateDijkstras(visited,nodesInPath){
    for(let i =0;i<visited.length;i++){
      setTimeout(()=>{
        const temp=visited[i];
        var text='node-visited';
        if(i===0){
          text='node-start';
        }
        if(visited[i].isFinish){
          text='node-finish'
        }
        document.getElementById(`node-${temp.row}-${temp.col}`).className=text;
      },25*i)
    }
    setTimeout(()=>{
      this.animateShortestPath(nodesInPath);
    },25*visited.length);
    
  }
  animateShortestPath(nodesInPath){
    const temp=this.state.grid;
    for(let i=0;i<nodesInPath.length;i++){
      const node=nodesInPath[i];
      setTimeout(()=>{
        temp[node.row][node.col].traverse=true;
        this.setState({grid:temp});
      },80*i)
    }
  }
  visualizeDijkstra() {
    const {grid} = this.state;
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visited = dijkstras(grid, startNode, finishNode);
      const nodesInPath=getPath( finishNode);
      this.animateDijkstras(visited,nodesInPath);
      console.log(visited)
      console.log(nodesInPath);
    
  }
  render(){
    const grid=this.state.grid;
    return(
      <div className='top'>
      <button className="btn btn-large" onClick={()=>this.visualizeDijkstra()}>Visualize Dijkstra</button>
      <div className="grid">
      {grid.map((row,rowIdx)=>{
        return(
          <div key={rowIdx}>
          {row.map((node,nodeIdx)=>{
            const{row,col,isFinish,isStart,isWall,isVisited,traverse}=node;
            return(
              <Node
              key={nodeIdx}
              row={row}
              col={col}
              isFinish={isFinish}
              isStart={isStart}
              isWall={isWall}
              isVisited={isVisited}
              traverse={traverse}
              onMouseDown={(row,col)=>this.handleMouseDown(row,col)}
              onMouseUp={(row,col)=>this.handleMouseUp(row,col)}
              onMouseEnter={(row,col)=>this.handleMouseEnter(row,col)}
              />
            );
          })}
          </div>
        );
      })}
      </div>
      </div>
    );
  }
}
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};
const createNode = (col, row) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    traverse:false
  };
};
const getGridWithWalls=(grid,row,col)=>{
  const temp=grid.slice();
  temp[row][col].isWall= !temp[row][col].isWall;
  return temp;
}