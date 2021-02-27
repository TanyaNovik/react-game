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
  const [activeColor, setActiveColor] = useState(null);
  function focusHandler() {
    dispatch({type:actions.ACTIVE, payload: {cell: props.cellObj}});
    setActiveColor('skyblue');
  }
  function blurHandler() {
    setActiveColor(null);
    dispatch({type:actions.INACTIVE, payload: {cell: props.cellObj}});
  }
  return (
    <React.Fragment>
      <form>
        <input className={props.cellObj.hoverClass ? 'hover-cell' : 'common-cell'} type="text"
               style={{backgroundColor: activeColor, color: props.cellObj.readonly ? 'darkred' : 'indianred'}}
               maxLength={1}
               readOnly={props.cellObj.readonly}
               value={props.cellObj.value ? props.cellObj.value : ''}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                 dispatch({type:actions.CHANGE, payload: {value:event.target.value, cell: props.cellObj}})
               }}
               onFocus={() => focusHandler()}
               onBlur={() => blurHandler()}/>
      </form>
    </React.Fragment>
  );
};