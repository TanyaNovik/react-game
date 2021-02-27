import {ISudoku} from "../Components/Cell";
import produce from "immer";
export const actions = {
  CHANGE: 'change',
  ACTIVE: 'active'
}
export function reducer(state: ISudoku[][], action:any) {
  return produce(state, (produce) => {
    if(action.type === actions.CHANGE) {
      produce[action.payload.cell.x][action.payload.cell.y].value = action.payload.value;
    }
    if(action.type === actions.ACTIVE) {
      produce[action.payload.cell.x][action.payload.cell.y].value = action.payload.value;
    }
  })
}