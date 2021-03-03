import React, {useEffect, useReducer, useState} from "react";
import {Board} from "./Board";
import {actions, reducer} from "../hooks/boardReducer";
import {checkAnyEntered, checkDone, setSudokuBoard} from "../helpers/gameHelper";
import {BoardContext} from "../context/boardContext";
import {Music} from "./Music";
// import {Timer} from "./Timer";
import {useGame} from "../hooks/gameProvider";
import {setLocalStorageGame, getLocalStorageGame} from "../helpers/localStorageHelper";
import {Modal} from "./Modal";
import {ScoreTable} from "./ScoreTable";
import {Footer} from "./Footer";

export const Game = () => {
  const lastGame = getLocalStorageGame();
  const [sudokuObject, dispatch] = useReducer(reducer, lastGame ? JSON.parse(lastGame.sudoku) : setSudokuBoard());
  const {moves, resetMoves, setMoves, sound, changeSound, increaseVolume, decreaseVolume, focusedCell, incrementMoves,
  showScores, setShowScores} = useGame();
  const [store, setStore] = useState(!!lastGame);
  const [showed, setShowed] = useState(false);

  useEffect(() => {
    console.log('000000')
    if (store) {
      setMoves(lastGame.moves);
      setStore(false);
    }
  }, [])
  console.log('!!!', moves)

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

  return (
    <BoardContext.Provider value={{dispatch}}>
      {console.log('game')}

      <React.Fragment>
        {(checkDone(sudokuObject) && !showed && checkAnyEntered(sudokuObject)) ?
          <Modal sudokuObject={sudokuObject} newGame={newGameHandler}/> :
          <div>
            {showScores ? <ScoreTable/> : null}
            {/*<Timer />*/}
            <p className="score">score: {moves}</p>
            <div className="music-container">
              <button onClick={decreaseVolume} value="-" className="change-volume-btn">-</button>
              <button onClick={changeSound}>sound {sound ? 'on' : 'off'}</button>
              <button onClick={increaseVolume} value="+" className="change-volume-btn">+</button>
            </div>
            <Board sudokuObject={sudokuObject}/>
            <div className="game-actions">
              <button onClick={() => setShowScores(true)}>show best scores</button>
              <button onClick={newGameHandler}>new game</button>
              <button onClick={() => {
                dispatch({type: actions.HELP, payload: focusedCell})
                incrementMoves()
                incrementMoves()
              }}>help</button>
              <button onClick={() => {
                dispatch({type: actions.SHOWALL, payload: null})
                setShowed(true)
              }
              }>show all
              </button>
            </div>
            <Music/>
            <Footer />
          </div>

        }
      </React.Fragment>
    </BoardContext.Provider>

  );
}
