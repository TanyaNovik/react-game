import {ISudoku} from "../Components/Cell";

export const setLocalStorageGame = async (sudoku: ISudoku[][], moves: number, time:number) => {
  await localStorage.setItem('currentGame', JSON.stringify({sudoku: JSON.stringify(sudoku), moves, time}))
}
export const getLocalStorageGame = () => {
  if (localStorage.getItem('currentGame')) {
    const currentGame = JSON.parse(localStorage.getItem('currentGame'));
    const sudokuRestore:ISudoku[][] = JSON.parse(currentGame.sudoku);
    sudokuRestore.map(row => row.map(cell => cell.hoverClass = 0));
    return {sudoku: JSON.stringify(sudokuRestore), moves:currentGame.moves, time:currentGame.time};
  }
  return null;
}