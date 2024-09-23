import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState, Board, Column } from '../interface/board';



export const selectBoardState = createFeatureSelector<BoardState>('board');


export const selectAllBoards = createSelector(
  selectBoardState,
  (state: BoardState) => state.boards
);


export const selectActiveBoards = createSelector(
  selectAllBoards,
  (boards: Board[]) => boards.filter(board => board.isActive)
);

export const selectColumnsByBoard = createSelector(
  selectAllBoards,
  (boards: Board[], props: { boardId: string }) =>
    boards.find((board) => board.name === props.boardId)?.columns
);

