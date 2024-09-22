import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBoard } from '../../interfaces/board';
import * as BoardActions from '../../state/board.actions';
import { selectSelectedBoard } from '../../state/board.selectors';

@Component({
  selector: 'app-add-edit-board-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-edit-board-form.component.html',
  styleUrl: './add-edit-board-form.component.scss'
})
export class AddEditBoardFormComponent {
  @Input() isEditMode = false;
  @Output() formSubmitted = new EventEmitter<void>();

  boardForm: FormGroup;
  selectedBoard$: Observable<IBoard | undefined>;
  currentBoardId: string | null = null;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private store: Store) {
    this.selectedBoard$ = this.store.select(selectSelectedBoard);
    this.boardForm = this.fb.group({
      name: ['', Validators.required],
      columns: this.fb.array([])
    });
  }

  ngOnInit() {
    if (this.isEditMode) {
      this.selectedBoard$.subscribe(board => {
        if (board) {
          this.currentBoardId = board.id;
          this.boardForm.patchValue({
            name: board.name
          });
          this.columnsFormArray.clear();
          board.columns.forEach(column => this.addColumn(column.name));
        }
      });
    } else {
      this.boardForm.reset();
      this.columnsFormArray.clear();
      this.addColumn(); // Add one column by default for new boards
    }
  }
  get columnsFormArray() {
    return this.boardForm.get('columns') as FormArray;
  }

  addColumn(name: string = '') {
    this.columnsFormArray.push(this.fb.group({
      name: [name, Validators.required]
    }));
  }

  removeColumn(index: number) {
    this.columnsFormArray.removeAt(index);
  }

 
  onSubmit() {
    if (this.boardForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formValue = this.boardForm.value;
      const board: IBoard = {
        id: this.isEditMode ? this.currentBoardId! : '',
        name: formValue.name,
        columns: formValue.columns.map((column: any) => ({
          name: column.name,
          tasks: []
        }))
      };

      if (this.isEditMode && this.currentBoardId) {
        this.store.dispatch(BoardActions.updateBoard({ 
          id: this.currentBoardId, 
          changes: board 
        }));
      } else {
        this.store.dispatch(BoardActions.addBoard({ board }));
      }

      this.boardForm.reset();
      this.isSubmitting = false;
      this.formSubmitted.emit();
    }
}
}
