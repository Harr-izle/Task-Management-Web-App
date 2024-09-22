import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBoard, IColumn, ITask } from '../../interfaces/board';
import { selectBoardError, selectBoardLoading, selectBoards, selectSelectedBoard} from '../../state/board.selectors';
import * as BoardActions from '../../state/board.actions';
import { AddEditBoardFormComponent } from '../add-edit-board-form/add-edit-board-form.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, AddEditBoardFormComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  boards$: Observable<IBoard[]>;
  selectedBoard$: Observable<IBoard | undefined>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  showAddForm = false;
  showEditForm = false;

  constructor(private store: Store) {
    this.boards$ = this.store.select(selectBoards);
    this.selectedBoard$ = this.store.select(selectSelectedBoard);
    this.loading$ = this.store.select(selectBoardLoading);
    this.error$ = this.store.select(selectBoardError);
  }

  ngOnInit() {
    this.store.dispatch(BoardActions.loadBoards());
  }

  getCompletedSubtasks(task: ITask): number {
    return task.subtasks.filter(subtask => subtask.isCompleted).length;
  }

  openAddBoardForm() {
    this.showAddForm = true;
    this.showEditForm = false;
  }

  openEditBoardForm() {
    this.showEditForm = true;
    this.showAddForm = false;
  }

  onFormSubmitted() {
    this.showAddForm = false;
    this.showEditForm = false;
  }
}
