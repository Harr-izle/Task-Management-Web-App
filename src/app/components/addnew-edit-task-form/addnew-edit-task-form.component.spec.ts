import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewEditTaskFormComponent } from './addnew-edit-task-form.component';

describe('AddnewEditTaskFormComponent', () => {
  let component: AddnewEditTaskFormComponent;
  let fixture: ComponentFixture<AddnewEditTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddnewEditTaskFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddnewEditTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
