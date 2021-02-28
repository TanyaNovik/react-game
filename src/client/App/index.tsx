import React from 'react';
import { Game } from '../Components/Game';
import '../style/style.scss'
export const App = () => {
  return (
    <React.Fragment>
      <h3 className="game-name">SUDOKU</h3>
      <Game />
    </React.Fragment>
  );
};