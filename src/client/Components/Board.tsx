import React from 'react';
import {Cell, ISudoku} from './Cell'
// import {BoardContext} from '../context/boardContext'
// import {reducer} from "../hooks/boardReducer";
// import {initialState} from "../helpers/gameHelper";

interface sudokuMas {
  sudokuObject: ISudoku[][],
}
export const Board:React.FC<sudokuMas> = (props:sudokuMas) => {

    return (
    // <BoardContext.Provider value={{dispatch}}>
      <React.Fragment>
        {console.log('board')}

        <div className="container">
          {props.sudokuObject.map((element, i) => {
            return <div key={i} className="row">
              {element.map((cellElement, j) => {
                return <Cell cellObj={cellElement} key={i * 9 + j}/>
              })}
            </div>
          })
          }
        </div>
      </React.Fragment>
    // </BoardContext.Provider>
  );
};