import { BoardService } from './../../../services/board.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';
import { deleteBoard, deleteTask } from '../../../state/board.actions';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
})
export class DeleteComponent {
  constructor(public BoardService:BoardService, private store: Store) {}


  delete(): void {
    
    if (this.BoardService.deletingBoard) {
      this.deleteBoard(this.BoardService.currentBoardId);
    }

    else {
      this.deleteTask(
        this.BoardService.currentBoardId,
        this.BoardService.columName,
        this.BoardService.task.title
      );
    }
    this.BoardService.resetModal();
  }

  
  deleteBoard(boardId: string): void {
    this.store.dispatch(deleteBoard({ boardId }));
    this.BoardService.toggleModal();
  }

  deleteTask(boardId: string, columnName: string, taskTitle: string): void {
    this.store.dispatch(deleteTask({ boardId, columnName, taskTitle }));
    this.BoardService.toggleModal();
  }
}