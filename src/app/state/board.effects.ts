import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as BoardActions from './board.actions';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BoardEffects {
  loadBoards$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActions.loadBoards),
    switchMap(() => {
      const boards = JSON.parse(localStorage.getItem('boards') || '[]');
      console.log(boards);
      
      return of(BoardActions.loadBoardsSuccess({ boards: boards.boards }));
    }),
    catchError(error => of(BoardActions.loadBoardsFailure({ error })))
  ));

  addBoard$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActions.addBoard),
    mergeMap(({ board }) => {
      console.log(board);
      
      const newBoard = { ...board, id: uuid() };
      // const boards = JSON.parse(localStorage.getItem('boards') || '[]');
      // boards.push(newBoard);
      // localStorage.setItem('boards', JSON.stringify(boards));
      return of(BoardActions.addBoardSuccess({ board: newBoard }));
    }),
    catchError(error => {
  console.log(error);
  

     return of(BoardActions.addBoardFailure({ error }))
    })
  ));

  // updateBoard$ = createEffect(() => this.actions$.pipe(
  //   ofType(BoardActions.updateBoard),
  //   mergeMap(({ id, changes}) => {
  //     const boards = JSON.parse(localStorage.getItem('boards') || '[]');
  //     const updatedBoards = boards.map((b: any) => b.id === id ? board : b);
  //     localStorage.setItem('boards', JSON.stringify(updatedBoards));
  //     return of(BoardActions.updateBoardSuccess({ board }));
  //   }),
  //   catchError(error => of(BoardActions.updateBoardFailure({ error })))
  // ));

  deleteBoard$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActions.deleteBoard),
    mergeMap(({ id }) => {
      const boards = JSON.parse(localStorage.getItem('boards') || '[]');
      const updatedBoards = boards.filter((b: any) => b.id !== id);
      localStorage.setItem('boards', JSON.stringify(updatedBoards));
      return of(BoardActions.deleteBoardSuccess({ id }));
    }),
    catchError(error => of(BoardActions.deleteBoardFailure({ error })))
  ));

  constructor(
    private actions$: Actions
  ) {}
}