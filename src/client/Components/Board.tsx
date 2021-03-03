import React from 'react';
import {Cell, ISudoku} from './Cell'

interface sudokuMas {
  sudokuObject: ISudoku[][],
}
const BoardMemo:React.FC<sudokuMas> = (props:sudokuMas) => {

    return (
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
  );
};
export const Board = React.memo(BoardMemo);