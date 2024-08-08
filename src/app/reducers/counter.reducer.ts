import { createReducer, on } from "@ngrx/store";
import { increment, decrement, reset } from "../actions/counter.action";

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, { type }) => {
    console.log(type);
    return state + 1;
  }),
  on(decrement, (state, { type }) => {
    console.log(type);
    return state - 1;
  }),
  on(reset, (state, { type }) => {
    console.log(type);
    return 0;
  })
)
