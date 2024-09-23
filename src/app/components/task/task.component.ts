
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Task } from '../../interface/board';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  constructor(public BoardService:BoardService) {}

  @ViewChild('container') container!: ElementRef;
  @Input('task') task!: Task;
  @Input('columName') columName!: string;
  completedTasks!: number;

  ngOnInit(): void {
    this.completedTasks = this.task.subtasks.filter(
      (subtask) => subtask.isCompleted
    ).length;
  }

  ngAfterViewInit(): void {
    this.container.nativeElement.addEventListener('mousedown', () => {
      this.BoardService.task = this.task;
    });
  }
}