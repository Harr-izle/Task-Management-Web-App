import { BoardService } from './../../services/board.service';
import { Component, Input } from '@angular/core';
import { Board, Column, Task } from '../../interface/board';

@Component({
  selector: 'app-board-active',
  standalone: true,
  imports: [],
  templateUrl: './board-active.component.html',
  styleUrl: './board-active.component.scss'
})
export class BoardActiveComponent {
  constructor(private BoardService:BoardService) {}

  @Input('boardname') boardname!: string;
  @Input('board') board!: Board
  

  // set active board
  setActiveBoard(boardname: string, boardTasks: Column[]) {
    this.BoardService.setActiveBoard(boardname,boardTasks);
  }
}
