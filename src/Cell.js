import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ flipCellsAround, isLit,coord }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  const flipCellsAroundMe=()=>{
    flipCellsAround(coord)
  }

  return <td className={classes} onClick={flipCellsAroundMe} />;
}

export default Cell;
