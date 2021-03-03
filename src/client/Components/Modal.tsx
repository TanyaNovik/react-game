import React, {useState} from "react";
import axios from "axios";
import {useGame} from "../hooks/gameProvider";
import {ISudoku} from "./Cell";
import {checkWin} from "../helpers/gameHelper";
// import {actions} from "../hooks/boardReducer";
interface sudokuMas {
  sudokuObject: ISudoku[][],
  newGame(): void
}
export const Modal = (props:sudokuMas) => {
  const [name, setName] = useState('');
  const {moves} = useGame();

  return (
    <React.Fragment>
      <div className="modal">
        {/*<div className="modal-content">*/}
          {checkWin(props.sudokuObject) ?
            <div className="modal-content">
              <h1>You win</h1>
              <p>Enter your name:</p>
              <input type="text" value={name}
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}></input>
              <button onClick={async () => {
                const a = await axios.post('http://localhost:3000/api/score', {
                  name,
                  time: 30,
                  moves
                })
                console.log('!!!!', a)
                localStorage.removeItem('currentGame')
                props.newGame()

              }
              }>ok
              </button></div> :
            <div className="modal-content">
              <h3>I'm sorry, you didn't win</h3>
              <h2>try again</h2>
              <button onClick={async () => {
                localStorage.removeItem('currentGame')
                props.newGame()
              }
              }>ok
              </button>
            </div>
          }

        </div>
      {/*</div>*/}
    </React.Fragment>
  )

}