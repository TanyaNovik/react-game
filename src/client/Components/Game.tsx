import React, {useEffect, useReducer, useState} from "react";
import {Board} from "./Board";
import {actions, reducer} from "../hooks/boardReducer";
import {setSudokuBoard} from "../helpers/gameHelper";
import {BoardContext} from "../context/boardContext";
import {Music} from "./Music";
// import {Timer} from "./Timer";
import {useGame} from "../hooks/gameProvider";
import {setLocalStorageGame, getLocalStorageGame} from "../helpers/localStorageHelper";

export const Game = () => {
  const lastGame = getLocalStorageGame();
  const [sudokuObject, dispatch] = useReducer(reducer, lastGame ? JSON.parse(lastGame.sudoku) : setSudokuBoard());
  const {moves,resetMoves, setMoves, sound, changeSound, increaseVolume, decreaseVolume, focusedCell, incrementMoves} = useGame();
  const [store, setStore] = useState(!!lastGame);
  // if(store){
  //   setMoves(lastGame.moves);
  //   setStore(false);
  // }
  useEffect(() => {
    console.log('000000')
    if(store){
      setMoves(lastGame.moves);
      setStore(false);
    }
  }, [])
  console.log('!!!',moves)
    // setMoves(lastGame.moves);

  // if (lastGame) {
  //   setMoves(lastGame.moves);
  // }
  // getLocalStorageGame();
  // handleStart();
  useEffect(() => {
    setLocalStorageGame(sudokuObject, moves);
  }, [moves])
  async function newGameHandler() {
     dispatch({type: actions.NEW});
     resetMoves();
  }

  // async function writeLS() {
  //    await setLocalStorageGame(sudokuObject, moves);
  // }

  // if (!lastGame) {
  //   writeLS();
  // }
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
        <div className="game-actions">
        <button onClick={newGameHandler}>new game</button>
        <button onClick={() => {
          dispatch({type: actions.HELP, payload:focusedCell})
          incrementMoves()
          incrementMoves()

        }}>help</button>
          <button onClick={() => dispatch({type: actions.SHOWALL, payload:null})
          }>show all</button>
        </div>
        <Music/>
        {/*}*/}
      </React.Fragment>
    </BoardContext.Provider>
  );
}
