
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BoardService } from '../../../services/board.service';
import { Store } from '@ngrx/store';
import { addBoard, updateBoard } from '../../../state/board.actions';

@Component({
  selector: 'app-add-edit-board',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-board.component.html',
  styleUrl: './add-edit-board.component.scss',
})
export class AddEditBoardComponent {
  constructor(
    private store: Store,
    public BoardService:BoardService,
    private fb: FormBuilder
  ) {}

  boardForm!: FormGroup;
  completedSubtask = 0;

  ngOnInit(): void {
    if (this.BoardService.editBoard) {
      this.boardForm = this.fb.group({
        name: [this.BoardService.board?.name || '', Validators.required],
        isActive: [
          this.BoardService.board?.isActive || false,
          Validators.required,
        ],
        columns: this.fb.array(
          this.BoardService.board?.columns.map((column) =>
            this.fb.group({
              name: [column.name, Validators.required],
              tasks: [column.tasks || []], 
            })
          ) || []
        ),
      });
    } else {
      this.boardForm = this.fb.group({
        name: ['', Validators.required],
        isActive: [false, Validators.required],
        columns: this.fb.array([]),
      });
    }
    !this.BoardService.editBoard && this.addDefaultColumns();
  }
  get columns(): FormArray {
    return this.boardForm.get('columns') as FormArray;
  }

  addColumn(): void {
    const columnGroup = this.fb.group({
      name: ['', Validators.required],
      tasks: this.fb.array([]), 
    });
    this.columns.push(columnGroup);
  }
  addDefaultColumns(): void {
    const defaultColumns = ['Todo', 'Doing'];

    defaultColumns.forEach((columnName) => {
      const columnGroup = this.fb.group({
        name: [columnName, Validators.required],
        tasks: this.fb.array([]),
      });
      this.columns.push(columnGroup);
    });
  }
  removeColumn(index: number): void {
    this.columns.removeAt(index);
  }
  onSubmit(): void {
    if (this.boardForm.valid) {
      const newBoard = {
        ...this.boardForm.value,
        id: this.BoardService.editBoard
          ? this.BoardService.board.id
          : this.BoardService.generateRandomId(), 
        columns: this.boardForm.value.columns.map((column: any) => ({
          ...column,
          tasks: column.tasks || [], 
        })),
      };

      if (this.BoardService.editBoard) {
        this.store.dispatch(updateBoard({ board: newBoard }));
      } else {
        this.store.dispatch(addBoard({ board: newBoard }));
      }
    }
    this.boardForm.reset();
    this.BoardService.toggleModal();
  }
}