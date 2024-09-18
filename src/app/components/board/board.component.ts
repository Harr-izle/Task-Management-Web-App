import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBoard, IColumn, ITask } from '../../interfaces/board';
// import { selectSelectedBoard } from '../../state/board.selectors';
import * as BoardActions from '../../state/board.actions';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  // selectedBoard$: Observable<IBoard | null | undefined>;

  constructor(private store: Store) {
    // this.selectedBoard$ = this.store.select(selectSelectedBoard);
  }

  ngOnInit() {
    this.store.dispatch(BoardActions.loadBoards());
  }

  addNewColumn() {
    // Dispatch action to add a new column
    // this.store.dispatch(BoardActions.addColumn());
  }

  getCompletedSubtasks(task: ITask): number {
    return task.subtasks.filter(subtask => subtask.isCompleted).length;
  }
}
