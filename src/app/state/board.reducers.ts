import { createReducer, on } from '@ngrx/store';
import * as storeActions from '../state/board.actions';
import { BoardState, Task } from '../interface/board';

export const initialState: BoardState = {
  boards: [],
};

export const BoardReducer = createReducer(
  initialState,
  on(storeActions.fetchBoardsSuccess, (state, { boards }) => ({
    ...state,
    boards: boards,
  })),
  on(storeActions.addBoard, (state, { board }) => {
    const updatedBoards = [...state.boards, { ...board, isActive: false }];
    const boardsWithActiveStatus =
      updatedBoards.length === 1
        ? updatedBoards.map((b, index) => ({
            ...b,
            isActive: index === 0,
          }))
        : updatedBoards;

    return {
      ...state,
      boards: boardsWithActiveStatus,
    };
  }),
  on(storeActions.updateBoard, (state, { board }) => {
    const updatedBoards = state.boards.map((b) =>
      b.id === board.id ? { ...board } : b
    );
    return { ...state, boards: updatedBoards };
  }),

  on(storeActions.setActiveBoard, (state, { boardId }) => ({
    ...state,
    boards: state.boards.map((board) => {
      if (board.id === boardId) {
        return { ...board, isActive: true };
      } else {
        return { ...board, isActive: false };
      }
    }),
  })),
  on(storeActions.deleteBoard, (state, { boardId }) => {
    const updatedBoards = state.boards.filter((board) => board.id !== boardId);
    const boardsWithActiveStatus =
      updatedBoards.length > 0
        ? updatedBoards.map((board, index) => ({
            ...board,
            isActive: index === 0,
          }))
        : [];

    return {
      ...state,
      boards: boardsWithActiveStatus,
    };
  }),

  on(storeActions.addTask, (state, { boardId, columnName, task }) => {
    const updatedBoards = state.boards.map((board) => {
      if (board.id === boardId) {
        const updatedColumns = board.columns.map((column) => {
          if (column.name === columnName) {
            return {
              ...column,
              tasks: [...column.tasks, task], 
            };
          }
          return column;
        });

        return {
          ...board,
          columns: updatedColumns,
        };
      }
      return board;
    });

    return { ...state, boards: updatedBoards };
  }),
  on(storeActions.updateTask, (state, { boardId, columnName, task }) => {
    const updatedBoards = state.boards.map((board) => {
      if (board.id === boardId) {
        const updatedColumns = board.columns.map((column) => {
          if (column.name === columnName && columnName === task.status) {
            const updatedTasks = column.tasks.map((t) =>
              t.title === task.title ? { ...task } : t
            );
            return { ...column, tasks: updatedTasks };
          }
          if (column.name === columnName && columnName !== task.status) {
            return {
              ...column,
              tasks: column.tasks.filter((t) => t.title !== task.title),
            };
          }
          if (column.name === task.status && columnName !== task.status) {
            return {
              ...column,
              tasks: [...column.tasks, { ...task }],
            };
          }
          return column;
        });
        return { ...board, columns: updatedColumns };
      }
      return board;
    });
    return { ...state, boards: updatedBoards };
  }),
  on(storeActions.deleteTask, (state, { boardId, columnName, taskTitle }) => {
    const updatedBoards = state.boards.map((board) => {
      if (board.id === boardId) {
        const updatedColumns = board.columns.map((column) => {
          if (column.name === columnName) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.title !== taskTitle),
            };
          }
          return column;
        });
        return { ...board, columns: updatedColumns };
      }
      return board;
    });
    return { ...state, boards: updatedBoards };
  })
);