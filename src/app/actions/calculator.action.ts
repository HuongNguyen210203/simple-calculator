import { createAction, props } from '@ngrx/store';

export const addition = createAction('[Calculator] Addition', props<{ num1: number, num2: number }>());
export const subtraction = createAction('[Calculator] Subtraction', props<{ num1: number, num2: number }>());
export const multiplication = createAction('[Calculator] Multiplication', props<{ num1: number, num2: number }>());
export const division = createAction('[Calculator] Division', props<{ num1: number, num2: number }>());
export const reset = createAction('[Calculator] Reset');
