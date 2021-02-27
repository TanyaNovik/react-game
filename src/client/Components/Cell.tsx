import React, {useContext, useState} from 'react';
import {BoardContext} from "../context/boardContext";
import {actions} from "../hooks/boardReducer";

export interface ISudoku {
  value: number;
  x: number;
  y: number;
  result: number;
  readonly: boolean;
  hoverClass: boolean;
  sqNumber: number;
}

interface cellManipulation {
  cellObj: ISudoku,
}

export const Cell = (props: cellManipulation) => {
  const { dispatch } = useContext(BoardContext);

  // const [hoverClass, setHoverClass] = useState(false);
  return (
    <React.Fragment>
      <form>
        <input className={props.cellObj.hoverClass ? 'hover-cell' : ''} type="text"
               style={{width: "2rem"}}
               maxLength={1}
               value={props.cellObj.value ? props.cellObj.value : ''}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                 dispatch({type:actions.CHANGE, payload: {value:event.target.value, cell: props.cellObj}})
               }}
               onFocus={() => setHoverClass(true)}
               onBlur={() => setHoverClass(false)}/>
      </form>
    </React.Fragment>
  );
};