import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BoardActiveComponent } from './components/board-active/board-active.component';
import { BoardComponent } from './components/board/board.component';
import { AddEditTaskComponent } from './components/modals/add-edit-task/add-edit-task.component';
import { fetchBoards } from './state/board.actions';;
import { Board } from './interface/board';
import { Store } from '@ngrx/store';
import {
  selectAllBoards,
  selectActiveBoards,
} from '../app/state/board.selector';
import { map, Observable, tap } from 'rxjs';
import { BoardService } from './services/board.service';
import { AddEditBoardComponent } from './components/modals/add-edit-board/add-edit-board.component';
import { SubTaskComponent } from './components/modals/sub-task/sub-task.component';
import { DeleteComponent } from './components/modals/delete/delete.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    BoardActiveComponent,
    BoardComponent,
    AddEditTaskComponent,
    AddEditBoardComponent,
    SubTaskComponent,
    DeleteComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private store: Store,
    public BoardService: BoardService
  ) {}

  // query template
  @ViewChild('modal') modal!: ElementRef;

  selectAllBoards$!: Observable<Board[]>;
  activeBoard$!: Observable<any>;
  boardColumns: string[] = [];
  ngOnInit() {
    this.store.dispatch(fetchBoards());
  
    this.selectAllBoards$ = this.store.select(selectAllBoards);
  
    this.activeBoard$ = this.store.select(selectActiveBoards).pipe(
      map((boards) => boards && boards.length > 0 ? boards[0] : null), // Check if boards exist
      tap((board) => {
        if (board) {
          // Only set these values if the board is not null
          this.BoardService.currentBoardId = board.id;
          this.BoardService.boardColumns = board.columns;
          this.BoardService.board = board;
        } else {
          console.error('No active board found');
          // You can set default values here or show a warning if no board is found
        }
      })
    );
  }
  
  ngAfterViewInit() {
    this.modal.nativeElement.addEventListener('click', (event: Event) => {
      if (event.target === this.modal.nativeElement) {
        if (this.BoardService.confirmDelete) return;
        this.BoardService.toggleModal();
        this.BoardService.resetModal();
        this.BoardService.editingTask = false;
      }
    });
  }
  hideBar = false;
  hideSidebar() {
    this.hideBar = !this.hideBar;
  }
}