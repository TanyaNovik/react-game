import {ISudoku} from "../Components/Cell";
import {makepuzzle, solvepuzzle} from "sudoku";

const getSqNumber = (x:number, y:number): number => {
  return Math.trunc(x/3)*3 + Math.trunc(y/3);
}
export const initialState = (): Array<Array<ISudoku>> => {
  const puzzle = makepuzzle();
  const solvePuzzle = solvepuzzle(puzzle);
  let sudokuObject = [];
  for (let i = 0; i < 9; i++) {
    const row: Array<ISudoku> = [];
    for (let j = 0; j < 9; j++) {
      row.push({
        value: puzzle[i * 9 + j] ? puzzle[i * 9 + j] + 1 : null,
        x: i,
        y: j,
        result: solvePuzzle[i * 9 + j] + 1,
        readonly: puzzle[i * 9 + j] ? true : false,
        hoverClass: false,
        sqNumber: getSqNumber(i,j)
      });
    }
    sudokuObject.push(row);

  }
  return sudokuObject;
};
export const checkDone = (obj:ISudoku[][]): boolean => {
  return obj.every(row => row.every(cell => !!cell.value));
}