import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThemeComponent } from "../theme/theme.component";
import { IBoard } from '../../interfaces/board';
import { selectAllBoards, selectBoardLoading } from '../../state/board.selectors';
import * as BoardActions from '../../state/board.actions';
import { AddEditBoardFormComponent } from '../add-edit-board-form/add-edit-board-form.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ThemeComponent, AddEditBoardFormComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent{
  isSidebarOpen: boolean = true;
  boards$: Observable<IBoard[]>;
  loading$: Observable<boolean>;
  selectedBoardId: string | null = null;
  showNewBoardForm = false;

  constructor(private store: Store) {
    this.boards$ = this.store.select(selectAllBoards);
    this.loading$ = this.store.select(selectBoardLoading);
  }

  ngOnInit() {
    this.store.dispatch(BoardActions.loadBoards());
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  selectBoard(board: IBoard) {
    this.store.dispatch(BoardActions.selectBoard({ boardId: board.id }));
  }

  createNewBoard() {
    this.showNewBoardForm = true;
  }

  onFormSubmitted() {
    this.showNewBoardForm = false;
  }
}