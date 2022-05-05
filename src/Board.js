import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  //store board in state
  const [board, setBoard] = useState(createBoard());
  // make table board
  const tableBoard= board.map((row,rowIdx) => { 
    return <tr key={rowIdx}>{row.map((val,colIdx) => <Cell 
      isLit={val===true} 
      flipCellsAround={flipCellsAround} 
      coord={`${rowIdx}-${colIdx}`}
      key={`${rowIdx}-${colIdx}`}/>)}</tr>
})

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    initialBoard = Array.from({ length: nrows }, () => Array.from({ length: ncols }, () => Math.random()<chanceLightStartsOn));
    return initialBoard;
  }

  function hasWon() {
    for (let row of board){
      row.includes(false)
      return false
    }
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
      // it also toggles the light above it, to the left of it, to the right of it, and below it
      const flipAround=(y,x,boardCopy)=>{
        if(y-1>=0){
          boardCopy[y-1][x] = !boardCopy[y-1][x]
        }
        if(y+1<ncols){
          boardCopy[y+1][x] = !boardCopy[y+1][x]
        }
        if(x-1>=0 ){
          boardCopy[y][x-1]=!boardCopy[y][x-1]
        }
        if(x+1<nrows){
          boardCopy[y][x+1]=!boardCopy[y][x+1]
        }
      }

      // Make a (deep) copy of the oldBoard
      let boardCopy = [...oldBoard]; 
      //in the copy, flip this cell and the cells around it
      flipCell(y,x,boardCopy)
      flipAround(y,x,boardCopy)
      // return the copy
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
if(hasWon()){
  <h1>You won!</h1>
}
return <>
<h1>Game Board</h1>
<table className="Board">
   <tbody>{tableBoard}</tbody>
</table>
</>
}

export default Board;
