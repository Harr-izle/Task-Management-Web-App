import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { boardReducer } from './state/board.reducers';
import { BoardEffects } from './state/board.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideStore({ board: boardReducer }),
    provideEffects(BoardEffects),
    provideStoreDevtools({maxAge:25, logOnly: false}),
  ]
};