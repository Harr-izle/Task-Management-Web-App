

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ApiService } from '../services/api.service';
import {
  fetchBoards,
  fetchBoardsSuccess,
  fetchBoardsFailure,
} from '../state/board.actions';
import { Board } from '../interface/board';

@Injectable()
export class BoardEffect {
  constructor(
    private actions$: Actions,
    private kanbanService: ApiService 
  ) {}

  
  fetchBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchBoards), 
      mergeMap(() =>
        this.kanbanService.getBoards().pipe(
          map((board: any) => {
            const boards = board.boards;
            return fetchBoardsSuccess({ boards });
          }),
          catchError((error) => of(fetchBoardsFailure({ error }))) 
        )
      )
    )
  );
}