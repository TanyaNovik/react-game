import React, {useReducer, useRef, useState} from "react";
import {Board} from "./Board";
import {reducer} from "../hooks/boardReducer";
import {initialState} from "../helpers/gameHelper";
import {BoardContext} from "../context/boardContext";
import {formatTime} from "../helpers/timerHelper";

export const Game = () => {
  const [sudokuObject, dispatch] = useReducer(reducer, initialState())
  const [timer, setTimer] = useState(0);
  const countRef = useRef(null);
  countRef.current = setInterval(() => {
    setTimer((timer) => timer + 1)
  }, 1000);
  // const [game, setGame] = useState(checkDone(sudokuObject));
  function newGameHandler() {

  }

  return (
    <BoardContext.Provider value={{dispatch}}>
      <React.Fragment>
        {/*{checkDone(sudokuObject) ?*/}
        {/*  <h1>You have done game</h1> :*/}
        <p>{formatTime(timer)}</p>
        <Board sudokuObject={sudokuObject}/>
        <button onClick={newGameHandler}>new game</button>
        {/*}*/}
      </React.Fragment>
    </BoardContext.Provider>

  );
}
