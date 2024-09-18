import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import * as BoardActions from './board.actions';
import {v4 as uuid} from 'uuid';

@Injectable()
export class BoardEffects {
  loadBoards$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActions.loadBoards),
    switchMap(() => this.apiService.getBoards()
      .pipe(
        tap(data => console.log(data),
        ),
        map(data => data.boards.map(board => {return {...board, id:uuid()}})),
        map(boards => BoardActions.loadBoardsSuccess({ boards })),
        catchError(error => of(BoardActions.loadBoardsFailure({ error })))
      ))
  ));

  addBoard$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActions.addBoard),
    mergeMap(({ board }) => this.apiService.addBoard(board)
      .pipe(
        
        map(newBoard => BoardActions.addBoardSuccess({ board: newBoard })),
        catchError(error => of(BoardActions.addBoardFailure({ error })))
      ))
  ));

  updateBoard$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActions.updateBoard),
    mergeMap(({ board }) => this.apiService.updateBoard(board)
      .pipe(
        map(updatedBoard => BoardActions.updateBoardSuccess({ board: updatedBoard })),
        catchError(error => of(BoardActions.updateBoardFailure({ error })))
      ))
  ));

  deleteBoard$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActions.deleteBoard),
    mergeMap(({ id }) => this.apiService.deleteBoard(id)
      .pipe(
        map(() => BoardActions.deleteBoardSuccess({ id })),
        catchError(error => of(BoardActions.deleteBoardFailure({ error })))
      ))
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}
}