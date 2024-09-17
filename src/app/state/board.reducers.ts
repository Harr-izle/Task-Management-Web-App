import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IBoard } from '../interfaces/board';
import * as BoardActions from './board.actions';

export interface BoardState extends EntityState<IBoard> {
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<IBoard> = createEntityAdapter<IBoard>();

export const initialState: BoardState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.loadBoards, (state) => ({ ...state, loading: true })),
  on(BoardActions.loadBoardsSuccess, (state, { boards }) =>
    adapter.setAll(boards, { ...state, loading: false })
  ),
  on(BoardActions.loadBoardsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(BoardActions.addBoardSuccess, (state, { board }) =>
    adapter.addOne(board, state)
  ),
  on(BoardActions.updateBoardSuccess, (state, { board }) =>
    adapter.updateOne({ id: board.id, changes: board }, state)
  ),
  on(BoardActions.deleteBoardSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  )
);
