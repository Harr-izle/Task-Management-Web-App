import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'board',
        loadComponent: () =>
            import('./components/board/board.component').then((m) => m.BoardComponent),
    },
    {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full',
    },
];
