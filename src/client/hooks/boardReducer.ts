import {ISudoku} from "../Components/Cell";
import produce from "immer";

export const actions = {
  CHANGE: 'change',
  ACTIVE: 'active',
  INACTIVE: 'inactive'
}

export function reducer(state: ISudoku[][], action: any) {
  return produce(state, (produce) => {
    if (action.type === actions.CHANGE) {
      if(action.payload.value.match(/[1-9]/) || action.payload.value === '') {
        produce[action.payload.cell.x][action.payload.cell.y].value = action.payload.value;
      }
    }
    if (action.type === actions.ACTIVE) {
      for (let i = 0; i < 9; i++) {
        produce[action.payload.cell.x][i].hoverClass = true;
        produce[i][action.payload.cell.y].hoverClass = true;
      }
      produce.forEach(row => {
        row.forEach(anyCell => {
          if (anyCell.sqNumber === action.payload.cell.sqNumber) {
            anyCell.hoverClass = true;
          }
        });
      });
    }
    if (action.type === actions.INACTIVE) {
      produce.forEach(row => {
        row.forEach(anyCell => {
          anyCell.hoverClass = false;
        });
      });
    }
  })
}