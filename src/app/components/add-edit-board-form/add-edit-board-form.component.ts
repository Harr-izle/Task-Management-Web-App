import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-edit-board-form',
  standalone: true,
  imports: [],
  templateUrl: './add-edit-board-form.component.html',
  styleUrl: './add-edit-board-form.component.scss'
})
export class AddEditBoardFormComponent {
  isEdit:boolean =false;

  constructor(private store:Store){}


  openForm(){
    
  }



}
