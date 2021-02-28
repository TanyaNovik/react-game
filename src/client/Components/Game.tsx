import React, {useReducer} from "react";
import {Board} from "./Board";
import {actions, reducer} from "../hooks/boardReducer";
import {setSudokuBoard} from "../helpers/gameHelper";
import {BoardContext} from "../context/boardContext";
import {Music} from "./Music";
// import {Timer} from "./Timer";
import {useGame} from "../hooks/gameProvider";

export const Game = () => {
  const [sudokuObject, dispatch] = useReducer(reducer, setSudokuBoard());
  const {moves, resetMoves, sound, changeSound, increaseVolume, decreaseVolume} =useGame();
  // handleStart();
  function newGameHandler() {
    dispatch({type: actions.NEW});
    resetMoves();
  }
  return (
      <BoardContext.Provider value={{dispatch}}>
        {console.log('game')}

        <React.Fragment>
          {/*{checkDone(sudokuObject) ?*/}
          {/*  <h1>You have done game</h1> :*/}
          {/*< />*/}
          {/*<Timer />*/}
          <p className="score">score: {moves}</p>
          <div className="music-container">
            <button onClick={decreaseVolume} value="-" className="change-volume-btn">-</button>
            <button onClick={changeSound}>sound {sound ? 'on' : 'off'}</button>
            <button onClick={increaseVolume} value="+" className="change-volume-btn">+</button>
          </div>
          <Board sudokuObject={sudokuObject}/>
          <button onClick={newGameHandler}>new game</button>
          <Music/>
          {/*}*/}
        </React.Fragment>
      </BoardContext.Provider>
  );
}
