import { createAction, props } from '@ngrx/store';
import { Board, Task } from '../interface/board';


export const fetchBoards = createAction('[Kanban] Fetch Boards');

export const fetchBoardsSuccess = createAction(
  '[Board] Fetch Boards Success',
  props<{ boards: Board[] }>()
);

// If fetching boards fails
export const fetchBoardsFailure = createAction(
  '[Board] Fetch Boards Failure',
  props<{ error: any }>()
);


export const addBoard = createAction(
  '[Board] Add Board',
  props<{ board: Board }>()
);

export const updateBoard = createAction(
  '[Board] Update Board',
  props<{ board: Board }>()
);


export const setActiveBoard = createAction(
  '[Board] Set Active Board',
  props<{ boardId: string }>()
);


export const deleteBoard = createAction(
  '[Board] Delete Board',
  props<{ boardId: string }>()
);

export const addTask = createAction(
  '[Board] Add Task',
  props<{
    boardId: string;
    columnName: string;
    task: Task;
  }>()
);


export const updateTask = createAction(
  '[Board] Update Task or subTask',
  props<{ boardId: string; columnName: string; task: Task }>()
);


export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ boardId: string; columnName: string; taskTitle: string }>()
);

export const moveTask = createAction(
  '[Task] Move Task',
  props<{ taskTitle: string; sourceColumnName: string; targetColumnName: string }>()
);