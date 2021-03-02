import React, {useContext, useState} from 'react';
import {BoardContext} from "../context/boardContext";
import {actions} from "../hooks/boardReducer";
import {useGame} from "../hooks/gameProvider";
// import {setLocalStorageGame} from "../helpers/localStorageHelper";

const BUTTONSOUND = 'http://www.pachd.com/a/button/button24.wav';
const selectedCellHoverColor = 'skyblue';

export interface ISudoku {
  value: number;
  x: number;
  y: number;
  result: number;
  readonly: boolean;
  hoverClass: number;
  sqNumber: number;
}

interface cellManipulation {
  cellObj: ISudoku,
  // writeLS(): void
}

const CellMemo = (props: cellManipulation) => {
  const {dispatch} = useContext(BoardContext);
  const [activeColor, setActiveColor] = useState(null);
  const [musicFocus] = useState(new Audio(BUTTONSOUND));
  const {incrementMoves, sound, volume, setFocusedCell} = useGame();

  function focusHandler() {
    dispatch({type: actions.ACTIVE, payload: {cell: props.cellObj}});
    setActiveColor(selectedCellHoverColor);
    setFocusedCell({x: props.cellObj.x, y: props.cellObj.y})
  }

  function blurHandler() {
    setActiveColor(null);
    dispatch({type: actions.INACTIVE, payload: {cell: props.cellObj}});
  }

  function soundPlay() {
    musicFocus.volume = volume;
    musicFocus.play();
  }

  return (
    <React.Fragment>
      {console.log('cell')}

      <form>
        <input className={!!props.cellObj.hoverClass ? 'hover-cell' : 'common-cell'} type="text"
               style={{backgroundColor: activeColor, color: props.cellObj.readonly ? 'darkred' : 'indianred'}}
               maxLength={1}
               readOnly={props.cellObj.readonly}
               value={props.cellObj.value ? props.cellObj.value : ''}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                 dispatch({type: actions.CHANGE, payload: {value: event.target.value, cell: props.cellObj}})
                 incrementMoves()
               }}
               onFocus={() => {
                 focusHandler()
                 sound ? soundPlay() : null
               }}
               onBlur={() => blurHandler()}/>
      </form>
    </React.Fragment>
  );
};

export const Cell = React.memo(CellMemo);