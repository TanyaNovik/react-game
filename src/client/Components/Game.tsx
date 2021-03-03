import React, {useEffect, useReducer, useState} from "react";
import {Board} from "./Board";
import {actions, reducer} from "../hooks/boardReducer";
import {checkAnyEntered, checkDone, setSudokuBoard} from "../helpers/gameHelper";
import {BoardContext} from "../context/boardContext";
import {Music} from "./Music";
import {Timer} from "./Timer";
import {useGame} from "../hooks/gameProvider";
import {setLocalStorageGame, getLocalStorageGame} from "../helpers/localStorageHelper";
import {Modal} from "./Modal";
import {ScoreTable} from "./ScoreTable";
import {Footer} from "./Footer";
import {useHotkeys} from "react-hotkeys-hook";


export const Game = () => {
  const lastGame = getLocalStorageGame();
  const [sudokuObject, dispatch] = useReducer(reducer, lastGame ? JSON.parse(lastGame.sudoku) : setSudokuBoard());
  const {
    timer, setTimer, handleStart, moves, resetMoves, setMoves, sound, changeSound, increaseVolume, decreaseVolume, focusedCell, incrementMoves,
    showScores, setShowScores
  } = useGame();
  const [store, setStore] = useState(!!lastGame);
  const [showed, setShowed] = useState(false);
  useEffect(() => {
    handleStart();

    if (store) {
      setMoves(lastGame.moves);
      setStore(false);
      setTimer(lastGame.time)
    }
  }, [])

  useEffect(() => {
    setLocalStorageGame(sudokuObject, moves, timer);
  }, [timer])

  async function newGameHandler() {
    dispatch({type: actions.NEW});
    resetMoves();
    setTimer(0);
  }
  function helpHandler() {
    dispatch({type: actions.HELP, payload: focusedCell});
    incrementMoves();
    incrementMoves();
  }
  function showAllHandler() {
    dispatch({type: actions.SHOWALL, payload: null});
    setShowed(true);
  }

  useHotkeys('shift+q', () => {
    setShowScores(true);
  });
  useHotkeys('shift+n', () => {
    newGameHandler();
  });
  useHotkeys('shift+w', showAllHandler);
  useHotkeys('shift+d', changeSound);


  return (
    <BoardContext.Provider value={{dispatch}}>
      <React.Fragment>
        {(checkDone(sudokuObject) && !showed && checkAnyEntered(sudokuObject)) ?
          <Modal sudokuObject={sudokuObject} newGame={newGameHandler}/> :
          <div>
            {showScores ? <ScoreTable/> : null}
            <div className="score">
              <Timer/>
              <span>score: {moves}</span>
            </div>
            <div className="music-container">
              <button onClick={decreaseVolume} value="-" className="change-volume-btn">-</button>
              <button onClick={changeSound}>sound {sound ? 'on' : 'off'}</button>
              <button onClick={increaseVolume} value="+" className="change-volume-btn">+</button>
            </div>
            <Board sudokuObject={sudokuObject}/>
            <div className="game-actions">
              <button onClick={() => setShowScores(true)}>show best scores</button>
              <button onClick={newGameHandler}>new game</button>
              <button onClick={helpHandler}>help</button>
              <button onClick={showAllHandler}>show all</button>
            </div>
            <Music/>
            <Footer/>
          </div>
        }
      </React.Fragment>
    </BoardContext.Provider>

  );
}
