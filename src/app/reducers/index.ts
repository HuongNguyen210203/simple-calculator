import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {calculatorReducer} from "./calculator.reducer"; // <== cần import counterReducer từ file counter.reducer.ts

export interface State {}

export const reducers: ActionReducerMap<State> = {
  calculator: calculatorReducer, // <==== Thêm dòng này
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
