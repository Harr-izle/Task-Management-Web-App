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
  selectedBoard$: Observable<IBoard | undefined>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  showAddEditForm = false;

  constructor(private store: Store) {
    this.selectedBoard$ = this.store.select(selectSelectedBoard);
    this.loading$ = this.store.select(selectBoardLoading);
    this.error$ = this.store.select(selectBoardError);
  }

  ngOnInit() {
    this.store.dispatch(BoardActions.loadBoards());
  }

  addNewColumn() {
    this.showAddEditForm = true;
  }

  getCompletedSubtasks(task: ITask): number {
    return task.subtasks.filter(subtask => subtask.isCompleted).length;
  }

}