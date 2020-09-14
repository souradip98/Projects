import React from "react"
import './Node.css'

 function Node(props){
   var val="node";
    if(props.isStart){
      console.log("start")
      val="node-start";
    }else if(props.isFinish) {
      val="node-finish";
    }else{
      console.log("blehhh")
      val="node";
    }
    if(props.isVisited){
      val="node-visited";
    }
    //console.log(val);
    if(props.traverse){
      val="node-traverse";
    }
    if(props.isVisited && props.isFinish){
      val="node-finish";
    }
    if(props.isVisited && props.isStart){
      val="node-start";
    }
    if(props.isWall){
      val="node-wall";
    }
    const{
      col,row,isFinish,isStart,isWall,onMouseDown,onMouseEnter,onMouseUp
    }=props;
    return(
      <div id={`node-${row}-${col}`}
        className={val}
        onMouseDown={()=>onMouseDown(row,col)}
        onMouseEnter={()=>onMouseEnter(row,col)}
        onMouseUp={()=>onMouseUp(row,col)}
      ></div>
    )
}

export default Node
