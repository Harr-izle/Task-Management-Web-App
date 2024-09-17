import { createAction, props } from '@ngrx/store';
import { IBoard } from '../interfaces/board';

export const loadBoards = createAction('[Board] Load Boards');
export const loadBoardsSuccess = createAction(
  '[Board] Load Boards Success',
  props<{ boards: IBoard[] }>()
);
export const loadBoardsFailure = createAction(
  '[Board] Load Boards Failure',
  props<{ error: any }>()
);

export const addBoard = createAction(
  '[Board] Add Board',
  props<{ board: IBoard }>()
);
export const addBoardSuccess = createAction(
  '[Board] Add Board Success',
  props<{ board: IBoard }>()
);
export const addBoardFailure = createAction(
  '[Board] Add Board Failure',
  props<{ error: any }>()
);

export const updateBoard = createAction(
  '[Board] Update Board',
  props<{ board: IBoard }>()
);
export const updateBoardSuccess = createAction(
  '[Board] Update Board Success',
  props<{ board: IBoard }>()
);
export const updateBoardFailure = createAction(
  '[Board] Update Board Failure',
  props<{ error: any }>()
);

export const deleteBoard = createAction(
  '[Board] Delete Board',
  props<{ id: string }>()
);
export const deleteBoardSuccess = createAction(
  '[Board] Delete Board Success',
  props<{ id: string }>()
);
export const deleteBoardFailure = createAction(
  '[Board] Delete Board Failure',
  props<{ error: any }>()
);
