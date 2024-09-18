import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThemeComponent } from "../theme/theme.component";
import { IBoard } from '../../interfaces/board';
import { selectAllBoards } from '../../state/board.selectors';
import * as BoardActions from '../../state/board.actions';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ThemeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  isSidebarOpen: boolean = true;
  boards$: Observable<IBoard[]>;

  constructor(private store: Store) {
    this.boards$ = this.store.select(selectAllBoards);
  }

  ngOnInit() {
    this.store.dispatch(BoardActions.loadBoards());
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  selectBoard(board: IBoard) {
    // this.store.dispatch(BoardActions.selectBoard({ boardId: board.id }));
  }

  createNewBoard() {
    // Dispatch action to create a new board
    // this.store.dispatch(BoardActions.createBoard());
  }
}
