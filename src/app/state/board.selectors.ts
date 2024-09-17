import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState, adapter } from './board.reducers';

export const selectBoardState = createFeatureSelector<BoardState>('board');

export const {
  selectIds: selectBoardIds,
  selectEntities: selectBoardEntities,
  selectAll: selectAllBoards,
  selectTotal: selectTotalBoards,
} = adapter.getSelectors(selectBoardState);

export const selectBoardLoading = createSelector(
  selectBoardState,
  (state: BoardState) => state.loading
);

export const selectBoardError = createSelector(
  selectBoardState,
  (state: BoardState) => state.error
);
