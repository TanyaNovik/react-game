import React, {useReducer} from "react";
// , useRef, useState
import {Board} from "./Board";
import {actions, reducer} from "../hooks/boardReducer";
import {setSudokuBoard} from "../helpers/gameHelper";
import {BoardContext} from "../context/boardContext";
// import {Timer} from "./Timer";
// import {formatTime} from "../helpers/timerHelper";
import {Music} from "./Music";

export const Game = () => {
  const [sudokuObject, dispatch] = useReducer(reducer, setSudokuBoard());

  function newGameHandler() {
    dispatch({type:actions.NEW});
    // setTimer(0);
  }


  return (
    <BoardContext.Provider value={{dispatch}}>
      {console.log('game')}

      <React.Fragment>
        {/*{checkDone(sudokuObject) ?*/}
        {/*  <h1>You have done game</h1> :*/}
        {/*<Timer />*/}
        <Board sudokuObject={sudokuObject}/>
        <button onClick={newGameHandler}>new game</button>
        <Music />
        {/*}*/}
      </React.Fragment>
    </BoardContext.Provider>

  );
}
