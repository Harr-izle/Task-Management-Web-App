import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import form services
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from '../../../interface/board';
import { updateTask } from '../../../state/board.actions';
import { BoardService } from '../../../services/board.service';

@Component({
  selector: 'app-sub-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sub-task.component.html',
  styleUrl: './sub-task.component.scss',
})
export class SubTaskComponent {
  constructor(
    public BoardService:BoardService,
    private store: Store,
    private fb: FormBuilder
  ) {}

  taskForm!: FormGroup;
  totalSubtask!: number;
  completedSubtask!: number;

  ngOnInit() {
    this.totalSubtask = this.BoardService.task.subtasks.length;
    this.completedSubtask = this.BoardService.task.subtasks.filter(
      (subtask) => subtask.isCompleted
    ).length;

    this.taskForm = this.fb.group({
      status: [this.BoardService.task, Validators.required], 
      subtasks: this.fb.array([]), 
    });

    
    this.populateSubtasks();
  }

  get subtasks(): FormArray {
    return this.taskForm.get('subtasks') as FormArray;
  }

  populateSubtasks(): void {
    this.BoardService.task.subtasks.forEach((subtask) => {
      this.subtasks.push(
        this.fb.group({
          title: [subtask.title],
          isCompleted: [subtask.isCompleted],
        })
      );
    });
  }

  // update subtask in realtime
  updateSubtask() {
    const updatedTask: Task = {
      ...this.BoardService.task,
      status: this.taskForm.value.status,
      subtasks: this.taskForm.value.subtasks, // Updated subtasks
    };
    // Calculate completed subtasks
    this.completedSubtask = updatedTask.subtasks.filter(
      (subtask) => subtask.isCompleted
    ).length;
    // Dispatch action to update the task
    this.store.dispatch(
      updateTask({
        boardId: this.BoardService.currentBoardId,
        columnName: this.BoardService.columName,
        task: updatedTask,
      }) 
    );
  }

  // update subtask and status
  updateTask(): void {
    const updatedTask: Task = {
      ...this.BoardService.task,
      status: this.taskForm.value.status,
      subtasks: this.taskForm.value.subtasks, // Updated subtasks
    };
    // Dispatch action to update the task
    this.store.dispatch(
      updateTask({
        boardId: this.BoardService.currentBoardId,
        columnName: this.BoardService.columName,
        task: updatedTask,
      })
    );
    // resets form
    this.taskForm.reset();
  }

  // updates subtask and status on destroy
  ngOnDestroy() {
    this.updateTask();
  }
}