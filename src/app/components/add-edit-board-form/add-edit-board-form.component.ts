import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
  boardForm: FormGroup;
  isEditMode = false;
  private subscription: Subscription;

  constructor(private fb: FormBuilder, private store: Store) {
    this.boardForm = this.fb.group({
      name: ['', Validators.required],
      columns: this.fb.array([])
    });

    this.subscription = this.store.select(selectSelectedBoard).subscribe(board => {
      if (board) {
        this.isEditMode = true;
        this.boardForm.patchValue({
          name: board.name
        });
        board.columns.forEach(column => this.addColumn(column.name));
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get columns() {
    return this.boardForm.get('columns') as FormArray;
  }

  addColumn(name: string = '') {
    this.columns.push(this.fb.group({
      name: [name, Validators.required]
    }));
  }

  removeColumn(index: number) {
    this.columns.removeAt(index);
  }

  onSubmit() {
    if (this.boardForm.valid) {
      const formValue = this.boardForm.value;
      const board: IBoard = {
        id: this.isEditMode ? (this.boardForm.value as IBoard).id : '', // Use existing ID for edit mode
        name: formValue.name,
        columns: formValue.columns.map((column: { name: string }) => ({
          name: column.name,
          tasks: []
        }))
      };

      if (this.isEditMode) {
      console.log('if');
      this.store.dispatch(BoardActions.updateBoard({ id: board.id, changes: board }));
    } else {
      console.log('else');
      this.store.dispatch(BoardActions.addBoard({ board }));
      }
    }
  }
}
