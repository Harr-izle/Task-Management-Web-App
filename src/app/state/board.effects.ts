import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import * as BoardActions from './board.actions';

@Injectable()

export class BoardEffects {
  loadBoards$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActions.loadBoards),
    switchMap(() => this.apiService.getBoards()
      .pipe(
        map(data => BoardActions.loadBoardsSuccess({ boards: data.boards })),
        catchError(error => {
          console.error('Error loading boards:', error);
          return of(BoardActions.loadBoardsFailure({ error: error.message }));
        })
      ))
  ));

  addBoard$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActions.addBoard),
    mergeMap(({ board }) => this.apiService.addBoard(board)
      .pipe(
        map(newBoard => BoardActions.addBoardSuccess({ board: newBoard })),
        catchError(error => {
          console.error('Error adding board:', error);
          return of(BoardActions.addBoardFailure({ error: error.message }));
        })
      ))
  ));

  updateBoard$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActions.updateBoard),
    mergeMap(({ id, changes }) => this.apiService.updateBoard({ id, ...changes })
      .pipe(
        map(updatedBoard => BoardActions.updateBoardSuccess({ board: updatedBoard })),
        catchError(error => {
          console.error('Error updating board:', error);
          return of(BoardActions.updateBoardFailure({ error: error.message }));
        })
      ))
  ));

  deleteBoard$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActions.deleteBoard),
    mergeMap(({ id }) => this.apiService.deleteBoard(id)
      .pipe(
        map(() => BoardActions.deleteBoardSuccess({ id })),
        catchError(error => {
          console.error('Error deleting board:', error);
          return of(BoardActions.deleteBoardFailure({ error: error.message }));
        })
      ))
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}
}