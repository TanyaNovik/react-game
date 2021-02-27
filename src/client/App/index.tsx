import React from 'react';
import { Board } from '../Components/Board';
import '../style/style.scss'
export const App = () => {
  return (
    <React.Fragment>
      <h1>HELLO WORLD</h1>
      <h3 className="game-name">SUDOKU</h3>
      <Board />
    </React.Fragment>
  );
};