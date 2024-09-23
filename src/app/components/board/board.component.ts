import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { Column } from '../../interface/board';
import { deleteTask, updateTask } from '../../state/board.actions';
import { Store } from '@ngrx/store';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TaskComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  @Input('column') column!: Column;
  @Input() boardId!: string;
  constructor(private store: Store, public BoardService: BoardService) {}
  onDragStart(
    event: DragEvent,
    taskTitle: string,
    sourceColumnName: string
  ): void {
    event.dataTransfer?.setData(
      'text/plain',
      JSON.stringify({ taskTitle, sourceColumnName })
    );
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
  onDrop(event: DragEvent): void {
    event.preventDefault();

    const data = event.dataTransfer?.getData('text/plain');
    if (data) {
      const { taskTitle, sourceColumnName } = JSON.parse(data);

      if (sourceColumnName === this.column.name) return;

      this.store.dispatch(
        updateTask({
          boardId: this.BoardService.currentBoardId,
          columnName: sourceColumnName,
          task: {
            ...this.BoardService.task,
            status: this.column.name,
          },
        })
      );

      this.store.dispatch(
        deleteTask({
          boardId: this.BoardService.currentBoardId,
          columnName: sourceColumnName,
          taskTitle: taskTitle,
        })
      );
    }
  }
}
