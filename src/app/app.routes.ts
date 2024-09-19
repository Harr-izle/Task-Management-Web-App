import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'board',
        loadComponent: () =>
            import('./components/board/board.component').then((m) => m.BoardComponent),
            
    },
    {
        path: '',
        redirectTo: 'create-edit-form',
        pathMatch: 'full',
    },

    {
        path: 'create-edit-form',
        loadComponent: () =>
            import('./components/create-edit-form/create-edit-form.component').then((m) => m.CreateEditFormComponent),
    },
];
