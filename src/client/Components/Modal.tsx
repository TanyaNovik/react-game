import React, {useState} from "react";
import axios from "axios";
import {useGame} from "../hooks/gameProvider";
import {ISudoku} from "./Cell";
import {checkWin} from "../helpers/gameHelper";
interface sudokuMas {
  sudokuObject: ISudoku[][],
  newGame(): void
}
export const Modal = (props:sudokuMas) => {
  const [name, setName] = useState('');
  const {timer, moves} = useGame();

  return (
    <React.Fragment>
      <div className="modal">
          {checkWin(props.sudokuObject) ?
            <div className="modal-content">
              <h1>You win</h1>
              <p>Enter your name:</p>
              <input type="text" value={name}
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}></input>
              <button onClick={async () => {
                const a = await axios.post('http://localhost:3000/api/score', {
                  name,
                  time: timer,
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
    </React.Fragment>
  )

}