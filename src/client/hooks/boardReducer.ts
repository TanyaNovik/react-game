import {ISudoku} from "../Components/Cell";
import produce from "immer";
import {setSudokuBoard} from '../helpers/gameHelper';

export const actions = {
  CHANGE: 'change',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  NEW: 'new',
  HELP: 'help'
}

export function reducer(state: ISudoku[][], action: any) {
  return produce(state, (produce) => {
    if (action.type === actions.CHANGE) {
      if (action.payload.value.match(/[1-9]/) || action.payload.value === '') {
        produce[action.payload.cell.x][action.payload.cell.y].value = action.payload.value;
      }
    }
    if (action.type === actions.ACTIVE) {
      for (let i = 0; i < 9; i++) {
        produce[action.payload.cell.x][i].hoverClass = 1;
        produce[i][action.payload.cell.y].hoverClass = 1;
      }
      produce.forEach(row => {
        row.forEach(anyCell => {
          if (anyCell.sqNumber === action.payload.cell.sqNumber) {
            anyCell.hoverClass = 1;
          }
        });
      });
      produce[action.payload.cell.x][action.payload.cell.y].hoverClass = 2;
    }
    if (action.type === actions.INACTIVE) {
      produce.forEach(row => {
        row.forEach(anyCell => {
          anyCell.hoverClass = 0;
        });
      });
    }
    if (action.type === actions.NEW) {
      return setSudokuBoard();
    }
    if (action.type === actions.HELP) {
      produce[action.payload.x][action.payload.y].value = produce[action.payload.x][action.payload.y].result;
      produce[action.payload.x][action.payload.y].readonly = true;
    }
  })
}