import { BoardService } from './../../../services/board.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';

import { Column, Task } from '../../../interface/board';
import { Store } from '@ngrx/store';
import { addTask, updateTask } from '../../../state/board.actions';

@Component({
  selector: 'app-add-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.scss',
})
export class AddEditTaskComponent {
  taskForm!: FormGroup;
  @Input('boardId') boardId!: string;
  @Input('columnNames') columnNames!: Column[];
  completedSubtasks!: number;

  columnName!: string;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public BoardService:BoardService
  ) {}



  ngOnInit(): void {
    if (this.BoardService.editingTask) {
      this.taskForm = this.fb.group({
        title: [this.BoardService.task?.title, Validators.required],
        description: [this.BoardService.task?.description],
        status: [this.BoardService.task?.status, Validators.required], 
        subtasks: this.fb.array([]), 
      });
      this.populateSubtasks();
    } else {
     
      this.taskForm = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        status: ['todo', Validators.required],  
        subtasks: this.fb.array([]), 
      });
      
      this.addSubtask();
    }
  }

  
  get subtasks(): FormArray {
    return this.taskForm.get('subtasks') as FormArray;
  }


  addSubtask(): void {
    const subtaskGroup = this.fb.group({
      title: ['', Validators.required],
      isCompleted: [false],
    });
    this.subtasks.push(subtaskGroup);
  }
  
  removeSubtask(index: number): void {
    this.subtasks.removeAt(index);
  }

  populateSubtasks(): void {
    if (this.BoardService.editingTask) {
      this.BoardService.task.subtasks.forEach((subtask) => {
        const subtaskGroup = this.fb.group({
          title: [subtask.title, Validators.required],
          isCompleted: [subtask.isCompleted],
        });
        this.subtasks.push(subtaskGroup);
      });
    }
  }

  // Handle adding or updating the task
  addEditTask(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      const originalColumn = this.BoardService.columName;
      this.columnName = this.taskForm.get('status')?.value;
      if (this.BoardService.editingTask) {
       
        this.store.dispatch(
          updateTask({
            boardId: this.boardId,
            columnName: originalColumn,
            task: task,
          })
        );
      } else {
      
        this.store.dispatch(
          addTask({
            boardId: this.boardId,
            columnName: this.columnName,
            task: task,
          })
        );
      }

      this.BoardService.editingTask = false;

  
      this.taskForm.reset();
      this.BoardService.toggleModal();
    }
  }
}