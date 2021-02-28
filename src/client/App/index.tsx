import React from 'react';
import { Game } from '../Components/Game';
import '../style/style.scss'
import {GameProvider} from "../hooks/gameProvider";
export const App = () => {
  return (
    <GameProvider>
    <React.Fragment>

      <h3 className="game-name">SUDOKU</h3>
      <Game />
    </React.Fragment>
    </GameProvider>
  );
};