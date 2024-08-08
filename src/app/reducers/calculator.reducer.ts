import { createReducer, on } from '@ngrx/store';
import { addition, subtraction, multiplication, division, reset } from '../actions/calculator.action';

export const initialState: number = 0;

export const calculatorReducer = createReducer(
  initialState,
  on(addition, (state, { num1, num2 }) => num1 + num2),
  on(subtraction, (state, { num1, num2 }) => num1 - num2),
  on(multiplication, (state, { num1, num2 }) => num1 * num2),
  on(division, (state, { num1, num2 }) => num2 !== 0 ? num1 / num2 : state),
  on(reset, () => initialState)
);
