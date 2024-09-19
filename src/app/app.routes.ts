import { AddnewEditTaskFormComponent } from './components/addnew-edit-task-form/addnew-edit-task-form.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'board',
        loadComponent: () =>
            import('./components/board/board.component').then((m) => m.BoardComponent),
            
    },
    {
        path: '',
        redirectTo: 'view-task',
        pathMatch: 'full',
    },

    // {
    //     path: 'add-new-task-form',
    //     loadComponent: () =>
    //         import('./components/addnew-edit-task-form/addnew-edit-task-form.component').then((m) => m.AddnewEditTaskFormComponent),
            
    // },
    {
        path: 'view-task',
        loadComponent: () =>
            import('./components/view-task/view-task.component').then((m) => m.ViewTaskComponent),
    }
];
