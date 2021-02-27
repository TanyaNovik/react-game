import React, {useReducer} from 'react';
import {makepuzzle, solvepuzzle} from "sudoku";
import {Cell, ISudoku} from './Cell'
import {BoardContext} from '../context/boardContext'
import {reducer} from "../hooks/boardReducer";
const getSqNumber = (x:number, y:number): number => {
  return Math.trunc(x/3)*3 + Math.trunc(y/3);
}
const initialState = (): Array<Array<ISudoku>> => {
  const puzzle = makepuzzle();
  const solvePuzzle = solvepuzzle(puzzle);
  let sudokuObject = [];
  for (let i = 0; i < 9; i++) {
    const row: Array<ISudoku> = [];
    for (let j = 0; j < 9; j++) {
      row.push({
        value: puzzle[i * 9 + j] ? puzzle[i * 9 + j] + 1 : null,
        x: i,
        y: j,
        result: solvePuzzle[i * 9 + j] + 1,
        readonly: puzzle[i * 9 + j] ? true : false,
        hoverClass: false,
        sqNumber: getSqNumber(i,j)
      });
    }
    sudokuObject.push(row);

  }
  return sudokuObject;
};


export const Board = () => {
  const [sudokuObject, dispatch] = useReducer(reducer, initialState())

    return (
    <BoardContext.Provider value={{dispatch}}>
      <React.Fragment>
        <div className="container">
          {sudokuObject.map((element, i) => {
            return <div key={i} className="row">
              {element.map((cellElement, j) => {
                return <Cell cellObj={cellElement} key={i * 9 + j}/>
              })}
            </div>
          })
          }
        </div>
      </React.Fragment>
    </BoardContext.Provider>
  );
};