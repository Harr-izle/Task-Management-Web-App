import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { BoardReducer } from './state/board.reducers';
import { BoardEffect } from './state/board.effect';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideStore({ board: BoardReducer }),
    provideState({
      name: 'board',
      reducer:BoardReducer
    }),
    provideEffects(BoardEffect),
    provideStoreDevtools({maxAge:25, logOnly: false}),
  ]
};